// My Modules.
import countriesISOCodes from './countries-iso-codes';
import weatherDescriptions from './weather-descriptions';
import * as helpers from './helpers';

/**
 * Parse the today's weather data.
 * 
 * @function parseTodayWeatherData.
 * @param {*} data: represent the today's weather data.
 * @return {*}: return the today's weather data parsed.
 */
export function parseTodayWeatherData(data) {
    let city = 'null city', country = 'null country';
    let mainDescription = 'null main', detailedDescription = 'null description', icon = "not_found";
    let temperature = 'null temperature', humidity = 'null humidity', windSpeed = 'null wind speed';
    //? check if the data are null or undefined.
    if(!helpers.nullOrUndefined(data)) {
        //* successful parse the today's weather data.
        city = helpers.nullOrUndefined(data.name) ? 'null city' : data.name;
        country = getCountryName(data.sys.country);
        let fullDescription = getWeatherFullDescription(data.weather[0].main, data.weather[0].description);
        mainDescription = fullDescription.main;
        detailedDescription = fullDescription.description;
        icon = fullDescription.icon;
        temperature = helpers.nullOrUndefined(data.main.temp) ? 'null temperature' : `${Math.round(data.main.temp)} °C`;
        humidity = helpers.nullOrUndefined(data.main.humidity) ? 'null humidity' : `Humedad ${data.main.humidity} %`;
        windSpeed = helpers.nullOrUndefined(data.wind.speed) ? 'null wind speed' : `Viento ${Math.round(data.wind.speed * 3.6)} Km/H`;
    }
    return ({
        city,
        country,
        day: helpers.getOnlyDay(new Date(), 'LL'),
        hour: helpers.getOnlyHour(new Date(), "HH:mm:ss"),
        mainDescription,
        temperature,
        detailedDescription,
        humidity,
        windSpeed,
        icon
    });
};

/**
 * Parse the tomorrow's forecast data.
 * 
 * @function parseTomorrowForecastWeatherData.
 * @param {*} data: represent the forecast data.
 * @return {*}: return tomorrow's forecast data.
 */
export function parseTomorrowForecastWeatherData(data) {
    let city = 'null city', country = 'null country', tomorrow = helpers.getNextDay(1);
    let tomorrowForecast = [];
    //? check if the data are null or undefined.
    if(!helpers.nullOrUndefined(data)) {
        //* successful parse the tomorrow's forecast data.
        city = helpers.nullOrUndefined(data.city.name) ? 'null city' : data.city.name;
        country = getCountryName(data.city.country);
        let i = 0, j = 0, isAfterTomorrow = false;
        let day = '', afterTomorrow = helpers.getNextDay(2);
        let fullDescription = {}, icon = 'not_found';
        while(i < data.list.length && !isAfterTomorrow) {
            day = helpers.nullOrUndefined(data.list[i].dt_txt) ? 'null date' : data.list[i].dt_txt.split(" ")[0];
            if(day == tomorrow) {
                fullDescription = getWeatherFullDescription(data.list[i].weather[0].main, data.list[i].weather[0].description);
                tomorrowForecast[j] = {
                    hour: data.list[i].dt_txt.split(" ")[1].substring(0, 5),
                    mainDescription: fullDescription.main,
                    temperature: helpers.nullOrUndefined(data.list[i].main.temp) ? 'null temperature' : `${Math.round(data.list[i].main.temp)} °C`,
                    windSpeed: helpers.nullOrUndefined(data.list[i].wind.speed) ? 'null wind speed' : `Viento ${Math.round(data.list[i].wind.speed * 3.6)} Km/H`,
                    icon: fullDescription.icon
                };
                j++;
            }
            if(day == afterTomorrow) {
                isAfterTomorrow = true;
            }
            i++;
        }
    }
    return ({
        city,
        country,
        day: helpers.getOnlyDay(tomorrow, 'LL'),
        tomorrowForecast
    });
};

/**
 * Return the country name.
 * 
 * @function getCountryName.
 * @param {*} code: represent the country iso code.
 * @return {*}: return the country name.
 */
function getCountryName(code) {
    let country = 'null country';
    //? check if the code is null or undefined.
    if(!helpers.nullOrUndefined(code)) {
        //* successful search the country name.
        let i = 0, find = false;
        country = code;
        while(i < countriesISOCodes.length && !find) {
            if(countriesISOCodes[i].Code == code) {
                country = countriesISOCodes[i].Name;
                find = true;
            }
            i++;
        }
    }
    return country;
};

/**
 * Return the weather full description and his icons.
 * 
 * @function getWeatherFullDescription.
 * @param {*} main: represent the main description of the climate.
 * @param {*} description: represent the details of the weather description.
 * @return {*}: return the weather full description and his icons.
 */
function getWeatherFullDescription(main, description) {
    let icon = "not_found";
    //? check if the main and decription are null or undefined.
    if(!helpers.nullOrUndefined(main) && !helpers.nullOrUndefined(description)) {
        //* successful search the full description and icons.
        let i = 0, findMain = false;
        let j = 0; findDetails = false;
        while(i < weatherDescriptions.length && !findMain) {
            if(weatherDescriptions[i].Main == main) {
                main = weatherDescriptions[i].SP;
                findMain = true;
                while(j < weatherDescriptions[i].Descriptions.length && !findDetails) {
                    if(weatherDescriptions[i].Descriptions[j].Details == description) {
                        description = weatherDescriptions[i].Descriptions[j].SP;
                        icon = weatherDescriptions[i].Descriptions[j].Icon;
                        findDetails = true;
                    }
                    j++;
                }
            }
            i++;
        }
    } else {
        //! error main and description are nulls or undefineds.
        main = 'null main';
        description = 'null description';
    }
    return ({
        main,
        description,
        icon
    });
};