import {test} from 'node:test';
import assert from 'node:assert/strict';
import {localDate, forecastStatus, fetchForecast, weatherDescription} from './weather.mjs';
const now = new Date('2026-10-05T00:00:00Z');
test('Vietnam local date and exact forecast horizon', () => {
    assert.equal(localDate(new Date('2026-10-04T18:00:00Z')), '2026-10-05');
    assert.equal(forecastStatus('2026-10-20', now), 'available');
    assert.equal(forecastStatus('2026-10-21', now), 'future');
    assert.equal(forecastStatus('2026-10-04', now), 'past');
});
test('out-of-range dates do not call API', async () => {
    const value = await fetchForecast({date:'2026-11-08'}, {now, fetcher:()=>{throw new Error('Must not fetch');}});
    assert.equal(value, null);
});
test('extract exact daily values, not the first day', async () => {
    const fetcher = async url => {
        assert.equal(url.searchParams.get('timezone'), 'Asia/Ho_Chi_Minh');
        return {ok:true, json:async()=>({daily:{time:['2026-10-05','2026-10-06'],temperature_2m_min:[10,15],temperature_2m_max:[20,25],precipitation_probability_max:[0,80],weather_code:[0,63]}})};
    };
    const value = await fetchForecast({date:'2026-10-06', coordinates:[23,105]}, {now,fetcher});
    assert.equal(value.low,15);assert.equal(value.high,25);assert.equal(value.rain,80);assert.equal(value.description,'Rain');
});
test('reject incomplete data and network failures', async () => {
    await assert.rejects(fetchForecast({date:'2026-10-05', coordinates:[23,105]}, {now,fetcher:async()=>({ok:false})}));
    await assert.rejects(fetchForecast({date:'2026-10-05', coordinates:[23,105]}, {now,fetcher:async()=>({ok:true,json:async()=>({daily:{time:['2026-10-05']}})})}));
    assert.equal(weatherDescription(95),'Thunderstorms');
});
