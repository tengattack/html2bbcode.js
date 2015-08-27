# html2bbcode.js
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

## Options

```javascript
new HTML2BBCode({
  // enable image scale
  imagescale: true,
  // enable transform pixel size to size 1-7
  transsize: true,
});
```
