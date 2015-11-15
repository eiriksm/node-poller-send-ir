'use strict';
var serialport = require('serialport');
var request = require('request');
var SerialPort = serialport.SerialPort;
var sp = new SerialPort('/dev/tty.usbmodem1411', {
  baudrate: 9600,
  buffersize: 1
});

function sendIr() {
  console.log('Sending IR');
  sp.write(new Buffer([0x01]));
}

function poll(config) {
  console.log('Sending request');
  request(config.url, function(err, res, body) {
    if (err) {
      throw err;
    }
    if (res.statusCode === 204) {
      console.log('No content, retrying');
    }
    else if (res.statusCode === 200 ) {
      console.log('Content!', body);
      if (body.indexOf(config.magicWord) > -1) {
        sendIr();
      }
    }
    else {
      console.log('Unexpected status code:', res.statusCode);
    }
    poll(config);
  });
}

module.exports = poll;
