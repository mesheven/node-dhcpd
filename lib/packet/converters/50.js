// Generated by CoffeeScript 1.3.3
/*
option 50: requested ip address
*/

var sprintf, utils;

sprintf = require("../../../support/sprintf");

utils = require("../../utils");

module.exports = {
  encode: utils.writeIp,
  decode: utils.readIp
};