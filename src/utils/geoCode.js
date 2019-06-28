const request = require("request");

const geoCode = (endereco, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(endereco) +
    ".json?access_token=pk.eyJ1Ijoicm9taWxkaW5obyIsImEiOiJjang2ZXE2NGcwYnloNGFtcnBoaWtpeGxjIn0.u4HaAp2LhpsVpA66Q5VnPw&limit=1";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("desconexo, cpx", undefined);
    } else if (response.body.features.length === 0) {
      callback("nao localizado", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        local: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geoCode;
