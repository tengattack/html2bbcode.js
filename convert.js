
var fs = require('fs');
var path = require('path');

var HTML2BBCode = require('./html2bbcode').HTML2BBCode;

if (process.argv.length <= 2) {
  console.error('ERR: Please provide a html file.');
  process.exit(1);
}

var converter = new HTML2BBCode();

fs.readFile(path.resolve(process.argv[2]), { encoding: 'utf8' }, function (err, data) {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  var bbcode = converter.feed(data);
  console.log(bbcode.toString());
});
