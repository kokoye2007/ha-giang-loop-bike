const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../public');
const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(data);});});
(async()=>{
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
    const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
    try {
        const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
        page.on('pageerror',error=>errors.push(error.message));
        const {localDate,weatherTarget}=await import('./weather.mjs');
        const today=localDate();
        const canonical=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/trip.json'),'utf8'));
        const dates=[...new Set([today,...canonical.weather.days.map(day=>day.date)])];
        let apiCalls=0;
        await page.route('https://api.open-meteo.com/**',route=>{apiCalls++;return route.fulfill({json:{current:{temperature_2m:23,weather_code:2,wind_speed_10m:8,time:today+'T10:00'},daily:{time:dates,temperature_2m_min:dates.map(()=>16),temperature_2m_max:dates.map(()=>25),precipitation_probability_max:dates.map(()=>70),weather_code:dates.map(()=>63)}}});});
        const url='http://127.0.0.1:'+server.address().port;
        await page.goto(url);await page.waitForSelector('.checkpoint-card');
        await page.waitForSelector('[data-moto-canvas][data-ready="true"]',{timeout:15000});
        const motoStart=Number(await page.locator('[data-moto-canvas]').getAttribute('data-model-scale'));
        const motoStartRotation=Number(await page.locator('[data-moto-canvas]').getAttribute('data-model-rotation'));
        await page.evaluate(()=>{const section=document.querySelector('[data-moto-scroll]');scrollTo(0,section.offsetTop+(section.offsetHeight-innerHeight)/2);});
        await page.waitForFunction(()=>Number(document.querySelector('[data-moto-canvas]').dataset.scrollProgress)>.35);
        const motoMiddle=Number(await page.locator('[data-moto-canvas]').getAttribute('data-model-scale'));
        assert.ok(motoMiddle/motoStart>1.7,'Motorcycle should make a strong push-in at the scroll midpoint');
        await page.evaluate(()=>{const section=document.querySelector('[data-moto-scroll]');scrollTo(0,section.offsetTop+section.offsetHeight-innerHeight);});
        await page.waitForFunction(()=>Number(document.querySelector('[data-moto-canvas]').dataset.scrollProgress)>.95);
        const motoEndRotation=Number(await page.locator('[data-moto-canvas]').getAttribute('data-model-rotation'));
        assert.ok(Math.abs(motoEndRotation-motoStartRotation)<1.8,'Motorcycle inspection arc must remain below a half turn');
        await page.evaluate(()=>scrollTo(0,0));
        await page.waitForFunction(()=>Number(document.querySelector('[data-moto-canvas]').dataset.scrollProgress)<.05);
        assert.ok(Number(await page.locator('[data-moto-canvas]').getAttribute('data-model-scale'))<motoMiddle,'Reverse scroll should zoom the motorcycle back out');
        assert.equal(await page.title(),'Ha Giang Loop Bike — Group Tour Roadbook');
        assert.match(await page.locator('.navigation .brand').innerText(),/HA GIANG/);
        assert.equal(await page.locator('.week-day').count(),8);
        assert.equal(await page.locator('[data-weather-day]').count(),8);
        await page.waitForFunction(()=>document.querySelectorAll('.weather-result strong').length===8);
        assert.doesNotMatch(await page.locator('[data-daily-weather]').innerText(),/Forecast not available yet/);
        assert.equal(apiCalls,new Set(canonical.weather.days.map(day=>{const target=weatherTarget(day);return target.location.coordinates.join(',')+'|'+target.location.date;})).size,'Repeated areas share requests');
        for(const theme of ['sunrise','night','forest']){
            await page.locator('[data-theme-choice="'+theme+'"]').click();
            assert.equal(await page.evaluate(()=>document.documentElement.dataset.theme),theme);
            await page.reload();await page.waitForSelector('.checkpoint-card');
            assert.equal(await page.locator('[data-theme-choice="'+theme+'"]').getAttribute('aria-pressed'),'true');
            assert.equal(await page.locator('[data-theme-choice][aria-pressed="true"]').count(),1);
        }
        await page.locator('[data-ride="easy"]').fill('3');await page.locator('[data-ride="self"]').fill('2');
        assert.match(await page.locator('[data-budget-summary]').innerText(),/5 PEOPLE/);
        assert.match(await page.locator('[data-budget-summary]').innerText(),/1,350/);
        await page.locator('[data-bus]').uncheck();assert.match(await page.locator('[data-budget-summary]').innerText(),/1,170/);
        for(let i=1;i<=4;i++){await page.click('[data-day="'+i+'"]');assert.match(await page.locator('.day-copy .eyebrow').innerText(),new RegExp('DAY '+i));assert.ok(page.url().includes('day='+i));}
        for(let i=1;i<=4;i++){await page.click('[data-filter="'+i+'"]');assert.ok(await page.locator('.checkpoint-card').count()>0);}
        await page.click('[data-filter="0"]');assert.equal(await page.locator('.checkpoint-card').count(),11);
        await page.locator('[data-check]').first().check();await page.reload();await page.waitForSelector('[data-check]');assert.equal(await page.locator('[data-check]').first().isChecked(),true);
        await page.goto(url+'/?day=3');await page.waitForSelector('.day-copy');assert.match(await page.locator('.day-copy h3').innerText(),/Above the canyon/);
        assert.equal(await page.locator('.leaflet-control-zoom').count(),0);
        assert.equal(await page.locator('[data-map-zoom]').count(),2);
        assert.ok(await page.locator('#route-map canvas').count()>0,'Vector basemap canvas must exist');
        await page.locator('[data-map-zoom="1"]').click();await page.locator('[data-map-reset]').click();
        await page.locator('[data-map]').first().click();await page.waitForSelector('.leaflet-popup');
        await page.goto(url);await page.waitForSelector('.checkpoint-card');
        fs.mkdirSync(path.resolve(__dirname,'../previews'),{recursive:true});
        await page.screenshot({path:path.resolve(__dirname,'../previews/desktop.png')});
        await page.locator('[data-moto-scroll]').scrollIntoViewIfNeeded();await page.waitForTimeout(250);
        await page.locator('.moto-sticky').screenshot({path:path.resolve(__dirname,'../previews/motorcycle-3d.png')});
        await page.locator('.day-layout').screenshot({path:path.resolve(__dirname,'../previews/roadbook.png')});
        await page.locator('#route-map').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);
        await page.locator('#route-map').screenshot({path:path.resolve(__dirname,'../previews/map.png')});
        await page.locator('#daily-weather').screenshot({path:path.resolve(__dirname,'../previews/weather.png')});
        await page.locator('.crew-card').first().screenshot({path:path.resolve(__dirname,'../previews/crew-card-desktop.png')});
        await page.locator('[data-theme-choice="night"]').click();
        await page.locator('#budget').screenshot({path:path.resolve(__dirname,'../previews/night-budget.png')});
        await page.locator('[data-theme-choice="forest"]').click();
        for(const width of [320,390,768]){
            await page.setViewportSize({width,height:844});
            assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Overflow at '+width);
            const avatar=await page.locator('.crew-avatar').first().boundingBox();
            assert.ok(avatar.width<=96&&avatar.height<=96,'Crew avatar must remain compact');
            assert.ok(await page.evaluate(()=>document.querySelector('.appearance').getBoundingClientRect().top>=document.querySelector('.hero').getBoundingClientRect().bottom),'Theme switch must sit below hero');
            assert.ok(await page.evaluate(()=>document.querySelector('.appearance').getBoundingClientRect().top>=document.querySelector('.navigation').getBoundingClientRect().bottom),'Theme switch must not overlap header');
            const themeButton=await page.locator('[data-theme-choice]').first().boundingBox();
            assert.ok(themeButton.height<=32,'Theme controls should stay small');
            for(const img of await page.locator('.hero img, .day-photo img, .checkpoint-card img, .gallery-grid img, .crew-grid img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(async node=>{try {await node.decode();}catch(error){throw new Error('Photo failed: '+node.src+' — '+error.message);}});}
        }
        await page.setViewportSize({width:390,height:844});await page.locator('.checkpoint-card').first().screenshot({path:path.resolve(__dirname,'../previews/mobile-card.png')});
        await page.locator('.hero').screenshot({path:path.resolve(__dirname,'../previews/mobile.png')});
        await page.locator('.appearance').screenshot({path:path.resolve(__dirname,'../previews/theme-toolbar-mobile.png')});
        await page.locator('.crew-card').first().screenshot({path:path.resolve(__dirname,'../previews/crew-card-mobile.png')});
        assert.deepEqual(errors,[]);
        const fixture=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/trip.json'),'utf8'));
        fixture.members=[{name:'Hidden test member',publishConsent:false},{name:'Approved test member',publishConsent:true,quote:'<b>A harmless joke</b>'}];
        fixture.weather.days[0].date=today;
        await page.route('https://api.open-meteo.com/**',route=>route.fulfill({json:{daily:{time:[today],temperature_2m_min:[16],temperature_2m_max:[25],precipitation_probability_max:[70],weather_code:[63]}}}));
        await page.route('**/data/trip.json',route=>route.fulfill({json:fixture}));
        await page.reload();await page.waitForSelector('.crew-grid h3');
        assert.match(await page.locator('.crew-grid').innerText(),/Approved test member/);
        assert.doesNotMatch(await page.locator('.crew-grid').innerText(),/Hidden test member/);
        assert.equal(await page.locator('.crew-grid blockquote b').count(),0,'Member quote must be escaped');
        await page.waitForFunction(()=>document.querySelector('[data-weather-day="0"]').innerText.includes('70%'));
        assert.match(await page.locator('[data-weather-day="0"]').innerText(),/16–25 °C/);
        assert.match(await page.locator('[data-weather-day="0"] .weather-mode').innerText(),/Trip-date forecast/);
        await page.route('https://api.open-meteo.com/**',route=>route.abort());
        await page.click('[data-weather-refresh]');
        await page.waitForFunction(()=>document.querySelector('[data-weather-day="0"]').innerText.includes('could not load'));
        console.log('PASS: root index, scroll-driven 3D motorcycle, 8 travel days, 4 loop days, 11 checkpoints, photos, map, budget, saved checklist, deep link and responsive layout.');
    } finally {await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
