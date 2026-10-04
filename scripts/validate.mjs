import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
export const root=fileURLToPath(new URL('../',import.meta.url));
export async function validate() {
    const data=JSON.parse(await readFile(path.join(root,'data/trip.json'),'utf8'));
    assert.equal(data.loop.length,4);assert.equal(data.trip.loopNights,3);assert.equal(data.itinerary.length,8);
    assert.equal(data.loop.reduce((sum,day)=>sum+day.km,0),data.trip.routeKm);
    assert.equal(data.trip.operator,'Valor');assert.equal(data.package.price,null);
    const ids=new Set(data.checkpoints.map(point=>point.id));assert.equal(ids.size,data.checkpoints.length);
    const days=new Set(data.itinerary.map(day=>day.date));assert.equal(days.size,8);
    for(const [index,day] of data.loop.entries()) {
        assert.equal(day.day,index+1);assert.equal(day.date,`2026-11-${String(index+8).padStart(2,'0')}`);
        for(const id of day.checkpointIds)assert(ids.has(id));
    }
    for(const photo of Object.values(data.photos)) { assert(photo.image.startsWith('assets/'));await access(path.join(root,photo.image));assert(photo.alt&&photo.credit);assert(new URL(photo.source).protocol==='https:'); }
    for(const point of data.checkpoints) { assert(data.photos[point.photoId]);assert(point.minutes>0);assert(point.mapsQuery);assert(point.coordinates.length===2&&point.coordinates.every(Number.isFinite)); }
    for(const item of data.budget) {assert(item.amount===null||(Number.isFinite(item.amount)&&item.amount>=0));assert(item.quantity>0);}
    assert.equal(new Set(data.checklist.map(item=>item.id)).size,data.checklist.length);
    console.log(`Validated 4 loop days, 8 travel days, ${ids.size} checkpoints and ${Object.keys(data.photos).length} photographs.`);
    return data;
}
if(process.argv[1]===fileURLToPath(import.meta.url))await validate();
