// My Modules.
import * as KEYS from '../config/keys';

/**
 * Get the today's weather data.
 * * successful get the today's weather data.
 * ! error the api failed.
 * 
 * @function getForecastWeather.
 * @param {*} lat: represent the latitude.
 * @param {*} long: represent the longitude.
 * @return {*}: return today's weather data.
 */
export async function getTodayWeather(lat, long) {
    try {
        let apiUrl = `${KEYS.ENDPOINT_TODAY_WEATHER}lat=${lat}&lon=${long}&APPID=${KEYS.APPID}&units=${KEYS.UNITS}`;
        let todayWeatherData = await fetch(apiUrl);
        todayWeatherData = await todayWeatherData.json();
        return todayWeatherData;
    } catch(err) {
        throw err;
    }
};

/**
 * Get the forecast weather.
 * * successful get the forecast weather.
 * ! error the api failed.
 * 
 * @function getForecastWeather.
 * @param {*} lat: represent the latitude.
 * @param {*} long: represent the longitude.
 * @return {*}: return the forecast weather.
 */
export async function getForecastWeather(lat, long) {
    try {
        let apiUrl = `${KEYS.ENDPOINT_FORECAST}lat=${lat}&lon=${long}&APPID=${KEYS.APPID}&units=${KEYS.UNITS}`;
        let forecastWeatherData = await fetch(apiUrl);
        forecastWeatherData = await forecastWeatherData.json();
        return forecastWeatherData;
    } catch(err) {
        throw err;
    }
};