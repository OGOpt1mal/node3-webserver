const request = require("request");

//http://api.weatherstack.com/current?access_key=e83359a5dbf2f410571ca63a8764e4aa&query=37.8267,-122.4233
const forecast = (latitude, longitude, callback) => {
const url = `https://api.darksky.net/forecast/8d68a7c21cc48742a3265c4ef77f96b9/${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Could not connect to darksky api", undefined);
    } else if (body.error) {
      callback("Please try another location", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% of rain.`
      );
    }
  });
};

module.exports = {
  forecast
};
