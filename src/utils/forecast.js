const request = require('request');
require('dotenv').config()

const forecast = (latitude, longitude, callback) => {
    const url = process.env.DARKSKY_API_URL + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '?units=si&lang=de';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to conncect to location services!', undefined);
        } else if (body.error) {
            callback('Unable to find Coordinates. Try another search.', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary +
                ' It is currently ' +
                body.currently.temperature +
                ' degrees out. The High is ' +
                body.daily.data[0].temperatureHigh +
                ' and the Low is ' +
                body.daily.data[0].temperatureLow +
                ' There is a ' +
                body.currently.precipProbability +
                '% chance of rain.');
        }
    })
}

module.exports = forecast;