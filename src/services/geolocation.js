/**
 * Determine the user position.
 * 
 * @function findCoordinates.
 * @return {*}: return a promise with the position data.
 */
export function findCoordinates() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 20000, maximumAge: 1000 });
    });
};