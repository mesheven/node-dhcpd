var sprintf = require('./../support/sprintf');
var dhcp = {
  message_types: require('./message_types'),
  options: require('./options')
}
var toString = function(buf) {
  var s = '';
  for (var j = 0; j < buf.length; j++) {
    s += String.fromCharCode(buf[j]);
  }
  return s;
}
var toHex = function(buf) {
  var s = '';
  for (var j = 0; j < buf.length; j++) {
    s += sprintf("%02x", b[j]);
  }
  return s;
}
var toHexAddress = function(buf) {
  var s = [];
  for (var j = 0; j < buf.length; j++) {
    s.push(sprintf("%02d", buf[j]));
  }
  return s.join(':');
}
var toIp = function(buf) {
  return sprintf("%d.%d.%d.%d", buf[0], buf[1], buf[2], buf[3]);
}

module.exports = {
  fallback: function(buf) {
    return buf.toString('utf8');
  },
  1: toIp,
  3: function(buf) {
    var numRecords = buf.length/4, pos = 0, records = [];
    for (var i=0; i<numRecords; i++) {
      records.push(sprintf('%d.%d.%d.%d', buf[pos++], buf[pos++], buf[pos++], buf[pos++]))
    }
    return records;
  },
  12: toString,
  50: toIp,
  51: function(buf) { // ip address lease time
    return sprintf('%d', (buf[0] << 24) + (buf[1] << 16) + (buf[2] <<8 ) + buf[3]);
  },
  53: function(buf) {
    return sprintf("%d", buf[0]);
  },
  55: function(buf) {
    var ret = {};
    for (var j = 0; j < buf.length; j++) {
      var key = buf[j], val = dhcp.options[buf[j]];
      ret[key] = val;
    }
    return ret;
  },
  57: function(buf) {
    return sprintf('%d', (buf[0] << 8) + buf[1]);
  },
  61: toHexAddress,
  81: function(buf) {// client fqdn
    var ret = '';
    ret += sprintf('%d', buf[0]) + '-';
    ret += sprintf('%d', buf[1]) + '-';
    ret += sprintf('%d', buf[2]) + ' ';
    ret += toString(buf.slice(3));
    return ret;
  }
}