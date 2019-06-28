const request = require("request");

const darkSky = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/8267eb32cc47666ad5530baa106c02cc/" +
    latitude +
    "," +
    longitude +
    "?units=si&lang=pt";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("desconexo, cpx", undefined);
    } else if (body.error) {
      callback("nao localizado", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          "Temperatura de " +
          body.currently.temperature +
          "°C com " +
          body.currently.precipProbability * 100 +
          "% de chances de chuva"
        //  {
        //   como: body.daily.data[0].summary,
        //   temperatura: body.currently.temperature,
        //   chance: body.currently.precipProbability
        // }
      );
    }
  });
};

module.exports = darkSky;
