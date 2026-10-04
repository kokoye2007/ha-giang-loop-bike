const $ = selector => document.querySelector(selector);
const e = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = value => value === null ? 'TBC' : new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(value);
const usd = value => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value)+' USD';
const date = value => new Intl.DateTimeFormat('en-AU',{day:'numeric',month:'short',weekday:'short',timeZone:'UTC'}).format(new Date(value+'T12:00:00Z'));
const maps = item => 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(item.mapsQuery);
let trip, map, day = 1, filter = 0;
const markers = new Map();
const storageKey = 'vn-bike-valor-checklist-v1';
function saved() { try { const value=JSON.parse(localStorage.getItem(storageKey)||'{}'); return value && typeof value==='object' && !Array.isArray(value) ? value : {}; } catch { return {}; } }
function sourceLink(id,label='Source ↗') { const source=trip.sources.find(s=>s.id===id); return source ? '<a href="'+e(source.url)+'" target="_blank" rel="noopener">'+e(label)+'</a>' : ''; }
function photoCaption(photo) { return '<a href="'+e(photo.source)+'" target="_blank" rel="noopener">'+e(photo.credit)+' ↗</a>'; }
function renderDay() {
    const item=trip.loop.find(d=>d.day===day), photo=trip.photos[item.photoId];
    document.querySelectorAll('[data-day]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.day)===day)));
    $('[data-day-detail]').innerHTML='<article class="day-layout"><figure class="day-photo"><img src="'+e(photo.image)+'" alt="'+e(photo.alt)+'" width="1200" height="800"><figcaption>'+photoCaption(photo)+'</figcaption></figure><div class="day-copy"><p class="eyebrow">DAY '+e(day)+' / '+e(date(item.date))+'</p><h3>'+e(item.title)+'</h3><p class="day-route">'+e(item.route)+'</p><div class="day-facts"><span>'+e(item.km)+' km · operator estimate</span><span>Night: '+e(item.stay)+'</span></div>'+item.blocks.map(block=>'<div class="time-block"><small>'+e(block.time)+'</small><p>'+e(block.activity)+'</p></div>').join('')+'<div class="day-stops"><p>Checkpoints & options</p>'+item.checkpointIds.map(id=>{const point=trip.checkpoints.find(p=>p.id===id);return '<a href="#checkpoint-'+e(id)+'" data-show-checkpoint="'+e(id)+'">'+e(point.name)+' ↗</a>';}).join('')+'</div><p class="fineprint">'+e(item.durationNote)+' '+sourceLink(item.sourceId,'Package route ↗')+'</p></div></article>';
    const url=new URL(location); url.searchParams.set('day',day); history.replaceState({},'',url);
}
function renderCheckpoints() {
    $('[data-checkpoints]').innerHTML=trip.checkpoints.filter(point=>!filter||point.loopDay===filter).map(point=>{
        const photo=trip.photos[point.photoId];
        return '<article class="checkpoint-card" id="checkpoint-'+e(point.id)+'"><figure><img src="'+e(photo.image)+'" alt="'+e(photo.alt)+'" loading="lazy" decoding="async" width="1200" height="800"><figcaption>'+photoCaption(photo)+'<br>Photo: '+e(photo.alt)+'</figcaption></figure><div class="checkpoint-copy"><p class="eyebrow">DAY '+e(point.loopDay)+' / '+e(point.type)+'</p><h3>'+e(point.name)+'</h3><p>'+e(point.description)+'</p><div class="checkpoint-meta"><span>Allow ~'+e(point.minutes)+' min</span><span>'+e(point.status)+'</span></div><p>'+e(point.budgetNote)+'</p><div class="checkpoint-links"><a href="'+e(maps(point))+'" target="_blank" rel="noopener">Google Maps ↗</a><button type="button" class="text-button" data-map="'+e(point.id)+'">Find on map ↗</button></div></div></article>';
    }).join('');
    document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.filter)===filter)));
}
function renderMap() {
    if(!window.L) { $('[data-map-status]').textContent='Map unavailable. Google Maps links are available on every checkpoint.'; return; }
    map=L.map('route-map',{scrollWheelZoom:false});
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map).on('tileerror',()=>{$('[data-map-status]').textContent='Base tiles could not load. Checkpoint links still work.';});
    const origin=[22.8233,104.9836];
    L.marker(origin,{icon:L.divIcon({className:'route-pin',html:'<span>H</span>',iconSize:[28,28],iconAnchor:[14,14]})}).addTo(map).bindPopup('Ha Giang · start / finish');
    trip.checkpoints.forEach((point,index)=>{
        const icon=L.divIcon({className:'route-pin',html:'<span>'+e(index+1)+'</span>',iconSize:[28,28],iconAnchor:[14,14]});
        const marker=L.marker(point.coordinates,{icon,title:point.name}).addTo(map).bindPopup('<b>'+e(point.name)+'</b><br>Day '+e(point.loopDay)+' · approximate location<br><a href="'+e(maps(point))+'" target="_blank" rel="noopener">Google Maps ↗</a>'); markers.set(point.id,marker);
    });
    const line=L.polyline([origin,...trip.checkpoints.filter(p=>p.status!=='optional').map(p=>p.coordinates),origin],{color:'#183d35',weight:3,dashArray:'5 8'}).addTo(map);map.fitBounds(line.getBounds(),{padding:[25,25]});
}
function renderBudget() {
    $('[data-package]').innerHTML=[['Listed inclusions',trip.package.included],['Listed exclusions',trip.package.excluded],['Ask Valor to confirm',trip.package.clarifications]].map(([title,items])=>'<article><h3>'+e(title)+'</h3><ul>'+items.map(item=>'<li>'+e(item)+'</li>').join('')+'</ul></article>').join('');
    const count=id=>Math.max(0,Math.min(100,Math.floor(Number($('[data-ride="'+id+'"]').value)||0)));
    const people=trip.package.pricing.rides.reduce((sum,ride)=>sum+count(ride.id),0);
    const tour=trip.package.pricing.rides.reduce((sum,ride)=>sum+count(ride.id)*ride.amount,0);
    const bus=$('[data-bus]').checked?people*2*trip.package.pricing.extras[0].amount:0;
    const rooms=Math.ceil(people/Math.max(1,Number($('[data-room-sharing]').value)||1));
    const vehicles=Math.ceil(people/Math.max(1,Number($('[data-vehicle-sharing]').value)||1));
    const allowances=trip.budget.filter(item=>!['Valor 4D3N package','Hanoi–Ha Giang return buses'].includes(item.item)).map(item=>({...item,quantity:item.basis==='per room / night'?rooms*3:item.basis==='per vehicle / transfer'?vehicles*2:item.basis==='per person / day'?people*3:item.basis==='booking total'?(people?1:0):people}));
    const known=allowances.reduce((sum,item)=>sum+(item.amount===null?0:item.amount*item.quantity),0);
    const warnings=[people>6?'Ask Valor to confirm capacity or a split/private group for more than six.':'',count('jeep')===1?'Jeep requires at least two people.':'',count('self')||count('friend')?'Self-riding requires valid Vietnam riding eligibility, experience and insurance; Australian licence/IDP alone is not sufficient.':''].filter(Boolean);
    $('[data-budget-summary]').innerHTML='<div><p class="eyebrow">'+people+' PEOPLE / LISTED TOUR'+(bus?' + RETURN BUSES':'')+'</p><strong>'+usd(tour+bus)+'</strong><small>'+money(known)+' AUD local allowances · kept separate</small></div><p>'+(people?'Partial group estimate, not a booking or complete trip cost.':'Add travellers to the ride options to calculate your group.')+' '+warnings.map(e).join(' ')+' '+sourceLink('valor','Verify current prices ↗')+'</p>';
    $('[data-budget]').innerHTML=allowances.map(item=>'<tr><td>'+e(item.item)+'</td><td>'+money(item.amount)+'<small>'+e(item.basis)+'</small></td><td>'+e(item.quantity)+'</td><td>'+money(item.amount===null?null:item.amount*item.quantity)+'</td><td>'+e(item.status)+'</td></tr>').join('');
}
function renderGroup() {
    $('[data-rides]').innerHTML=trip.package.pricing.rides.map(ride=>'<article><p class="eyebrow">4 DAYS / 3 NIGHTS</p><h3>'+e(ride.name)+'</h3><strong>'+usd(ride.amount)+' / person</strong><p>'+e(ride.description)+'</p><label>Travellers <input type="number" min="0" max="100" value="0" data-ride="'+e(ride.id)+'"></label></article>').join('');
    $('[data-price-note]').innerHTML=e(trip.package.pricing.note)+' Checked '+e(trip.package.pricing.checked)+'. '+sourceLink('valor','Booking source ↗');
    $('[data-extras]').innerHTML=trip.package.pricing.extras.map(extra=>'<p>'+e(extra.name)+': <b>'+usd(extra.amount)+'</b> · '+e(extra.basis)+'</p>').join('');
    $('[data-gallery]').innerHTML=trip.gallery.map(id=>{const photo=trip.photos[id];return '<figure><img src="'+e(photo.image)+'" alt="'+e(photo.alt)+'" loading="lazy"><figcaption>'+e(photo.alt)+'<br>'+photoCaption(photo)+'</figcaption></figure>';}).join('');
    $('[data-crew-note]').textContent=trip.crew.note;
    const members=trip.members.filter(member=>member.publishConsent===true);
    $('[data-members]').innerHTML=members.length?members.map(member=>'<article>'+(member.photo?'<img src="'+e(member.photo)+'" alt="'+e(member.name)+'">':'')+'<h3>'+e(member.name)+'</h3><p>'+e(member.ride||'Ride choice pending')+'</p><blockquote>'+e(member.quote||'Quote pending')+'</blockquote></article>').join(''):'<article><h3>Your crew goes here.</h3><p>Send a portrait, display name, ride choice and a joke quote for each person. Only member-approved profiles will be published.</p></article>';
    $('[data-jokes]').innerHTML=trip.crew.sampleQuotes.map(quote=>'<blockquote>“'+e(quote)+'”</blockquote>').join('');
}
function updateProgress() { const state=saved();$('[data-progress]').textContent=trip.checklist.filter(item=>state[item.id]).length+' / '+trip.checklist.length+' ready'; }
function renderChecklist() { const state=saved();$('[data-checklist]').innerHTML=trip.checklist.map(item=>'<label class="check-row"><input type="checkbox" data-check="'+e(item.id)+'" '+(state[item.id]?'checked':'')+'><span><small>'+e(item.category)+'</small>'+e(item.label)+'</span></label>').join('');updateProgress(); }
function render() {
    $('[data-stats]').innerHTML=[['7–14 Nov','Hanoi arrival & return · provisional'],['8–11 Nov','The loop · 4 days / 3 nights'],[trip.trip.routeKm+' km','Valor route estimate'],[trip.trip.mode,'Mix your crew’s ride choices']].map(([value,label])=>'<div><b>'+e(value)+'</b><small>'+e(label)+'</small></div>').join('');
    $('[data-week]').innerHTML=trip.itinerary.map(item=>'<div class="week-day'+(item.phase==='loop'?' is-loop':'')+'"><b>'+e(Number(item.date.slice(-2)))+'</b><span>'+e(item.title)+'</span><small>'+e(item.stay)+'</small></div>').join('');
    $('[data-tabs]').innerHTML=trip.loop.map(item=>'<button type="button" data-day="'+e(item.day)+'" aria-pressed="false">Day '+e(item.day)+' · '+e(Number(item.date.slice(-2)))+' Nov</button>').join('');
    $('[data-filters]').innerHTML=[0,1,2,3,4].map(i=>'<button type="button" data-filter="'+i+'" aria-pressed="false">'+(i?'Day '+i:'All checkpoints')+'</button>').join('');
    $('[data-weather]').innerHTML='<h3>'+e(trip.weather.title)+'</h3><p>'+e(trip.weather.note)+' '+sourceLink(trip.weather.sourceId,'Seasonal notes ↗')+'</p>';
    $('[data-advice]').innerHTML=[['DO',trip.advice.do],['DON’T',trip.advice.dont]].map(([title,items])=>'<article><h3>'+e(title)+'</h3><ul>'+items.map(item=>'<li>'+e(item)+'</li>').join('')+'</ul>'+sourceLink('safety','Official travel and riding advice ↗')+'</article>').join('');
    $('[data-sources]').innerHTML=trip.sources.map(source=>'<details><summary>'+e(source.title)+' · '+e(source.type)+'</summary><p>'+e(source.note)+'</p><a href="'+e(source.url)+'" target="_blank" rel="noopener">Read reference ↗</a></details>').join('');
    renderDay();renderCheckpoints();renderGroup();renderBudget();renderChecklist();renderMap();
}
document.addEventListener('click',event=>{
    const dayButton=event.target.closest('[data-day]');if(dayButton&&trip){day=Number(dayButton.dataset.day);renderDay();}
    const filterButton=event.target.closest('[data-filter]');if(filterButton&&trip){filter=Number(filterButton.dataset.filter);renderCheckpoints();}
    const checkpoint=event.target.closest('[data-show-checkpoint]');if(checkpoint&&trip){filter=0;renderCheckpoints();}
    const mapButton=event.target.closest('[data-map]');if(mapButton&&map){const marker=markers.get(mapButton.dataset.map);if(marker){map.setView(marker.getLatLng(),12,{animate:!matchMedia('(prefers-reduced-motion:reduce)').matches});marker.openPopup();$('#route-map').scrollIntoView({block:'center'});}}
    if(event.target.closest('[data-print]'))window.print();
});
$('#budget').addEventListener('input',event=>{if(event.target.matches('[data-ride], [data-room-sharing], [data-vehicle-sharing], [data-bus]'))renderBudget();});
$('[data-checklist]').addEventListener('change',event=>{const input=event.target.closest('[data-check]');if(!input)return;const state=saved();state[input.dataset.check]=input.checked;try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{}updateProgress();});
fetch('data/trip.json').then(response=>{if(!response.ok)throw new Error('Trip data unavailable');return response.json();}).then(data=>{trip=data;const requested=Number(new URLSearchParams(location.search).get('day'));if([1,2,3,4].includes(requested))day=requested;render();}).catch(()=>{$('[data-day-detail]').innerHTML='<p role="alert">The roadbook could not load. Please refresh or check your connection.</p>';});
