# html2bbcode.js
Convert HTML to BBCode

## Usage:

```
var HTML2BBCode = require('./html2bbcode').HTML2BBCode;
var converter = new HTML2BBCode(opts);
var bbcode = converter.feed(data);
console.log(bbcode.toString());
```

## Options

```
// enable image scale
new HTML2BBCode({ imagescale: true });

// enable transform pixel size to size 1-7
new HTML2BBCode({ transsize: true });
```
