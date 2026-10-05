import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {calculateBudget, normaliseCount} from './budget.mjs';
const data=JSON.parse(await readFile(new URL('../data/trip.json',import.meta.url),'utf8'));
test('canonical two-person quantities and separate currencies',()=>{
    const result=calculateBudget(data,{rides:{easy:2},bus:true,roomSharing:2,vehicleSharing:3});
    assert.equal(result.tour,500);assert.equal(result.bus,72);assert.equal(result.known,470);
    assert.equal(result.allowances.find(item=>item.scale==='roomNights').quantity,3);
    assert.equal(result.allowances.find(item=>item.scale==='foodDays').quantity,6);
});
test('five-person quote, accommodation contingency and pairing warning',()=>{
    const scenario={rides:{easy:3,self:2},bus:true,roomSharing:2,vehicleSharing:3};
    assert.equal(calculateBudget(data,scenario).tour+calculateBudget(data,scenario).bus,1350);
    const reduced=calculateBudget(data,{...scenario,hanoiNights:2});
    assert.equal(reduced.allowances.find(item=>item.scale==='roomNights').quantity,6);
    assert.match(calculateBudget(data,{rides:{friend:2,self:1}}).warnings.join(' '),/outnumber/);
});
test('empty groups and invalid counts',()=>{
    const empty=calculateBudget(data,{rides:{},bus:true});
    assert.equal(empty.known,0);assert.equal(empty.bus,0);
    assert.equal(normaliseCount(101),100);assert.equal(normaliseCount(-3),0);assert.equal(normaliseCount(2.9),2);
});
