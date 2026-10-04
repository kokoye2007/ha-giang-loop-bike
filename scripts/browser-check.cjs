const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../public');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(data);});});
(async()=>{
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
    const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',args:['--no-sandbox']});
    try {
        const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
        page.on('pageerror',error=>errors.push(error.message));
        const url='http://127.0.0.1:'+server.address().port;
        await page.goto(url);await page.waitForSelector('.checkpoint-card');
        assert.equal(await page.locator('.week-day').count(),8);
        for(let i=1;i<=4;i++){await page.click('[data-day="'+i+'"]');assert.match(await page.locator('.day-copy .eyebrow').innerText(),new RegExp('DAY '+i));assert.ok(page.url().includes('day='+i));}
        for(let i=1;i<=4;i++){await page.click('[data-filter="'+i+'"]');assert.ok(await page.locator('.checkpoint-card').count()>0);}
        await page.click('[data-filter="0"]');assert.equal(await page.locator('.checkpoint-card').count(),11);
        await page.locator('[data-check]').first().check();await page.reload();await page.waitForSelector('[data-check]');assert.equal(await page.locator('[data-check]').first().isChecked(),true);
        await page.goto(url+'/?day=3');await page.waitForSelector('.day-copy');assert.match(await page.locator('.day-copy h3').innerText(),/Above the canyon/);
        await page.locator('[data-map]').first().click();await page.waitForSelector('.leaflet-popup');
        await page.goto(url);await page.waitForSelector('.checkpoint-card');
        fs.mkdirSync(path.resolve(__dirname,'../previews'),{recursive:true});
        await page.screenshot({path:path.resolve(__dirname,'../previews/desktop.png')});
        await page.locator('.day-layout').screenshot({path:path.resolve(__dirname,'../previews/roadbook.png')});
        for(const width of [390,768]){
            await page.setViewportSize({width,height:844});
            assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Overflow at '+width);
            for(const img of await page.locator('.hero img, .day-photo img, .checkpoint-card img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(async node=>{try {await node.decode();}catch(error){throw new Error('Photo failed: '+node.src+' — '+error.message);}});}
        }
        await page.setViewportSize({width:390,height:844});await page.locator('.checkpoint-card').first().screenshot({path:path.resolve(__dirname,'../previews/mobile-card.png')});
        await page.locator('.hero').screenshot({path:path.resolve(__dirname,'../previews/mobile.png')});
        assert.deepEqual(errors,[]);
        console.log('PASS: root index, 8 travel days, 4 loop days, 11 checkpoints, photos, map, budget, saved checklist, deep link and responsive layout.');
    } finally {await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
