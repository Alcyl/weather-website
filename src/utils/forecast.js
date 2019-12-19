const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/82711225ea1d1c9e80f73c65057f9fd8/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '?units=si&lang=de';

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to conncect to location services!', undefined);        
        } else if (body.error) {
            callback('Unable to find Coordinates. Try another search.', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast;