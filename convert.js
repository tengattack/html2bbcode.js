#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var HTML2BBCode = require('./lib/html2bbcode').HTML2BBCode;

function printUsage() {
  console.log('Usage:\n'
    + '  html2bbcode [opts] [html_file]');
}

if (process.argv.length <= 2) {
  console.error('ERR: Please provide a html file.');
  printUsage();
  process.exit(1);
}

var filepath;
var opts = {};
for (var i = 2; i < process.argv.length; i++) {
  var p = process.argv[i];
  if (p) {
    if (/^--.+?$/.test(p)) {
      opts[p.substr(2)] = true;
    } else {
      filepath = path.resolve(p);
    }
  }
}

var converter = new HTML2BBCode(opts);

fs.readFile(filepath, { encoding: 'utf8' }, function (err, data) {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  var bbcode = converter.feed(data);
  console.log(bbcode.toString());
});
