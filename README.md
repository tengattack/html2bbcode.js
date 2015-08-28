# html2bbcode.js

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Downloads][downloads-image]][npm-url]

Convert HTML to BBCode

## Licenses

MIT

## Usage:

```javascript
var HTML2BBCode = require('./html2bbcode').HTML2BBCode;

var converter = new HTML2BBCode(opts);
var bbcode = converter.feed(data);
console.log(bbcode.toString());
```

```bash
$ npm install -g html2bbcode
$ html2bbcode --imagescale test.html
```

## Options

```javascript
new HTML2BBCode({
  // enable image scale, default: false
  imagescale: true,
  // enable transform pixel size to size 1-7, default: false
  transsize: true,
  // disable list <ul> <ol> <li> support, default: false
  nolist: true,
  // disable text-align center support, default: false
  noalign: true,
  // disable HTML headings support, transform to size, default: false
  noheadings: true
});
```

[downloads-image]: http://img.shields.io/npm/dm/html2bbcode.svg

[npm-url]: https://npmjs.org/package/html2bbcode
[npm-image]: http://img.shields.io/npm/v/html2bbcode.svg

[travis-url]: https://travis-ci.org/tengattack/html2bbcode.js
[travis-image]: http://img.shields.io/travis/tengattack/html2bbcode.js.svg

[coveralls-url]: https://coveralls.io/r/tengattack/html2bbcode.js
[coveralls-image]: http://img.shields.io/coveralls/tengattack/html2bbcode.js/master.svg
