export const weatherTimezone = 'Asia/Ho_Chi_Minh';
export function localDate(now = new Date()) {
    const parts = new Intl.DateTimeFormat('en-CA', {timeZone: weatherTimezone, year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(now);
    const value = type => parts.find(part => part.type === type).value;
    return `${value('year')}-${value('month')}-${value('day')}`;
}
export function forecastStatus(date, now = new Date()) {
    const delta = (Date.parse(date+'T00:00:00Z') - Date.parse(localDate(now)+'T00:00:00Z')) / 86400000;
    return delta < 0 ? 'past' : delta <= 15 ? 'available' : 'future';
}
export function weatherTarget(location, now = new Date()) {
    const isTripForecast = forecastStatus(location.date, now) === 'available';
    return {location: {...location, date: isTripForecast ? location.date : localDate(now)}, isTripForecast};
}
export function weatherDescription(code) {
    if (code === 0) return 'Clear';
    if ([1, 2, 3].includes(code)) return 'Cloudy';
    if ([45, 48].includes(code)) return 'Fog';
    if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
    if ([95, 96, 99].includes(code)) return 'Thunderstorms';
    return 'Conditions unavailable';
}
export async function fetchForecast(location, {fetcher = fetch, now = new Date()} = {}) {
    if (forecastStatus(location.date, now) !== 'available') return null;
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.search = new URLSearchParams({latitude: location.coordinates[0], longitude: location.coordinates[1], timezone: weatherTimezone, forecast_days: 16, current: 'temperature_2m,weather_code,wind_speed_10m', daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code'});
    const response = await fetcher(url, {signal: AbortSignal.timeout(12000)});
    if (!response.ok) throw new Error('Weather request failed');
    const {daily, current} = await response.json();
    const index = daily?.time?.indexOf(location.date) ?? -1;
    if (index < 0) throw new Error('Forecast date missing');
    const values = ['temperature_2m_min', 'temperature_2m_max', 'precipitation_probability_max', 'weather_code'].map(key => daily[key]?.[index]);
    if (!values.every(Number.isFinite)) throw new Error('Forecast values incomplete');
    const currentConditions = current && Number.isFinite(current.temperature_2m) && Number.isFinite(current.weather_code) ? {temperature: current.temperature_2m, description: weatherDescription(current.weather_code), wind: Number.isFinite(current.wind_speed_10m) ? current.wind_speed_10m : null, time: current.time} : null;
    return {low: values[0], high: values[1], rain: values[2], description: weatherDescription(values[3]), current: currentConditions, updated: new Date().toISOString()};
}
