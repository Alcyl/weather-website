const request = require('request');
require('dotenv').config()



const geocode = (address, callback) => {
    const url = process.env.MAPBOX_API_URL + encodeURIComponent(address) + '.json?access_token=' + process.env.ACCESS_TOKEN + '&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to conncect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode;