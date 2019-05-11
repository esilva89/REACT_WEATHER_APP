// External Modules.
import moment from 'moment';

/**
 * Determine if a object is null or undefined.
 * 
 * @function nullOrUndefined.
 * @param {*} object: represent a anywhere object.
 * @return {*}: return true if is null or undefined; false otherwise.
 */
export function nullOrUndefined(object) {
    return object === "" || object == undefined;
};

/**
 * Return the date day.
 * 
 * @function getOnlyDay.
 * @param {*} date: represent a date.
 * @param {*} format: represent the date format.
 * @return {*}: return the date day.
 */
export function getOnlyDay(date, format) {
    return moment(date).format(format);
};

/**
 * Return the date hour.
 * 
 * @function getOnlyHour.
 * @param {*} date: represent a date.
 * @param {*} format: represent the date format.
 * @return {*}: return the date hour.
 */
export function getOnlyHour(date, format) {
    return moment(date).format(format);
};

/**
 * Determine a day by adding today plus a number.
 * 
 * @function getNextDay.
 * @param {*} next: represent the number to add.
 * @return {*}: return the day.
 */
export function getNextDay(next) {
    let day = new Date();
    day = moment(day).add(next, 'day').format('YYYY-MM-DD');
    return day;
};

/**
 * Determines if a certain hour corresponds to a night time.
 * 
 * @function isNight.
 * @param {*} hour: represent a hour.
 * @return {*}: return true if it is night; false otherwise.
 */
export function isNight(hour) {
    let beginNight = moment('18:00:00', 'hh:mm:ss');
    let endNight = moment('23:59:59', 'hh:mm:ss');
    let beginDawn = moment('00:00:00', 'hh:mm:ss');
    let endDawn = moment('06:00:00', 'hh:mm:ss');
    hour = moment(hour, 'hh:mm:ss');
    return (
        hour.isBetween(beginNight, endNight) ||
        hour.isBetween(beginDawn, endDawn) ||
        hour.isSame(moment('18:00:00', 'hh:mm:ss')) ||
        hour.isSame(moment('23:59:59', 'hh:mm:ss')) ||
        hour.isSame(moment('00:00:00', 'hh:mm:ss')) ||
        hour.isSame(moment('06:00:00', 'hh:mm:ss'))
    );
};