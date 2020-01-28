const request = require('request')

const forecast = (latitude, longitude, units, callback) => {
    const url = `https://api.darksky.net/forecast/642b43cdcbc0d4990b6857c0effc5b45/${latitude},${longitude}?units=${units}`

    request({url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable tot connect to weather services!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degress`)
        }
    })
}

module.exports = forecast