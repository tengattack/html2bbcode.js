var should = require("should");

var h2b = require('./../lib/html2bbcode'),
  HTMLStack = h2b.HTMLStack,
  HTML2BBCode = h2b.HTML2BBCode;

var namespace = "HTML2BBCode/";

describe(namespace + "base", function () {
  it("color('rgb(123, 29, 0)') should be '#7b1d00'", function () {
    var h2b = new HTML2BBCode();
    h2b.color('rgb(123, 29, 0)').should.eql('#7b1d00');
  });
  it("color('red') should be 'red'", function () {
    var h2b = new HTML2BBCode();
    h2b.color('red').should.eql('red');
  });
  it("px('100px') should be '100'", function () {
    var h2b = new HTML2BBCode();
    h2b.size('100px').should.eql('100');
  });
  it("size('12px') should be '12'", function () {
    var h2b = new HTML2BBCode();
    h2b.size('12px').should.eql('12');
  });
  it("size('small') should be '14'", function () {
    var h2b = new HTML2BBCode();
    h2b.size('small').should.eql('14');
  });
  it("transsize, size('6') should be '6'", function () {
    var h2b = new HTML2BBCode({ transsize: true });
    h2b.size('6').should.eql('6');
  });
  it("transsize, size('24px') should be '5'", function () {
    var h2b = new HTML2BBCode({ transsize: true });
    h2b.size('24px').should.eql('5');
  });
  it("transsize, size('medium') should be '3'", function () {
    var h2b = new HTML2BBCode({ transsize: true });
    h2b.size('medium').should.eql('3');
  });
  it("parse() should return HTMLStack", function () {
    var h2b = new HTML2BBCode();
    (h2b.parse().constructor.name).should.eql('HTMLStack');
  });
  it("convert() should return BBCode", function () {
    var h2b = new HTML2BBCode();
    (h2b.convert().constructor.name).should.eql('BBCode');
    (h2b.convert(h2b.parse('<p>str</p>')).constructor.name).should.eql('BBCode');
  });
  it("feed() should return BBCode", function () {
    var h2b = new HTML2BBCode();
    (h2b.feed().constructor.name).should.eql('BBCode');
  });
});

describe(namespace + "feed", function () {
  describe(namespace + "feed/normal", function () {
    it("feed('str') should be 'str'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('str').toString()).should.eql('str');
    });
    it("feed('<p>\\n\\t str</p>\\n') should be 'str\\n'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<p>\n\t str</p>\n').toString()).should.eql('str\n');
    });
    it("feed('<span>str \\n\\t </span>') should be 'str'", function () {
      // remove ending blanks
      var h2b = new HTML2BBCode();
      (h2b.feed('<span>str \n\t </span>').toString()).should.eql('str');
    });
    it("feed('<span style=\"color:rgb(128, 0, 128);\"><br>\n  </span>') should be '[color=#800080]\\n[/color]'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<span style=\"color:rgb(128, 0, 128);\"><br>\n  </span>').toString()).should.eql('[color=#800080]\n[/color]');
    });
    it("feed('<p>A<br>\n\t <a href=\"http://example.com/\">\\nexample.com</a><span>   </span>example<br></p>')\n"
        + "\tshould be 'A\\n[url=http://example.com/]example.com[url] example\\n'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<p>A<br>\n\t <a href=\"http://example.com/\">\n example.com</a><span>   </span>example<br></p>').toString()).should.eql('A\n[url=http://example.com/]example.com[/url] example\n');
    });
    it("feed('<span>J</span><h3></h3><span>K</span>\\n') should be 'J\\nK'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<span>J</span><h3></h3><span>K</span>\n').toString()).should.eql('J\nK');
    });
    it("feed('<tr><td><div>\\n\\t<div>\\n\\t\\t<div>\\n<p>str</p></div></div></div></td></tr>') should be 'str\\n'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<tr><td><div>\n\t<div>\n\t\t<div>\n<p>  str</p></div></div></div></td></tr>').toString()).should.eql('str\n');
    });
  });
  describe(namespace + "feed/font", function () {
    it("feed('<p>str<font size=\"16px\">16px</font><i>TEST</i></p>')\n"
        + "\t  should be 'str[size=16]16px[/size][i]TEST[/i]\\n'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<p>str<font size=\"16px\">16px</font><i>TEST</i></p>').toString())
        .should.eql('str[size=16]16px[/size][i]TEST[/i]\n');
    });
    it("feed('<size size=\"12\">str</size>')\n"
        + "\t  should be '[size=12]str[/size]'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<size size=\"12\">str</size>').toString()).should.eql('[size=12]str[/size]');
    });
    it("feed('<span>str\\n\\t<font size=\"16px\" color=\"#aaa\">a space here -&gt;&nbsp;</font><del><strong>TEST</strong></del></span>')\n"
        + "\t  should be 'str [size=16][color=#aaa]16px[/color][/size][s][b]TEST[/b][/s]'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<span>str\n\t<font face=\"Arial\" color=\"#aaa\">a space here -&gt;&nbsp;</font><del><strong>TEST</strong></del></span>').toString())
        .should.eql('str [color=#aaa][font=Arial]a space here -> [/font][/color][s][b]TEST[/b][/s]');
    });
    it("feed('<span style=\"font-style:italic;font-family:Arial;\">str</span>')\n"
        + "\t  should be '[font=Arial][i]str[/i][/font]'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<span style=\"font-style:italic;font-family:Arial;\">str</span>').toString())
        .should.eql('[i][font=Arial]str[/font][/i]');
    });
    it("feed('<span style=\"font-size:15px;font-weight:bold;color:red\">str</span>')\n"
        + "\t  should be '[b][color=red][size=15]str[/size][/color][/b]'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<span style=\"font-size:15px;font-weight:bold;color:red\">str</span>').toString())
        .should.eql('[b][color=red][size=15]str[/size][/color][/b]');
    });
    it("transsize, feed('<span style=\"font-size:16px;\">str</span>')\n"
      + "\t  should be '[size=3]str[/size]", function () {
      var h2b = new HTML2BBCode({ transsize: true });
      (h2b.feed('<span style=\"font-size:16px;\">str</span>').toString()).should.eql('[size=3]str[/size]');
    });
    it("transsize, feed('<font size=\"6\">str</font>')\n"
      + "\t  should be '[size=6]str[/size]", function () {
      var h2b = new HTML2BBCode({ transsize: true });
      (h2b.feed('<font size=\"6\">str</font>').toString()).should.eql('[size=6]str[/size]');
    });
  });
  describe(namespace + "feed/img", function () {
    it("feed('<img src=\"http://example.com/1.jpg\"/>')\n"
      + "\t  should be '[img]http://example.com/1.jpg[/img]", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<img src=\"http://example.com/1.jpg\"/>').toString()).should.eql('[img]http://example.com/1.jpg[/img]');
    });
    it("feed('<img src=\"\"/>') should be ''", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<img src=\"\"/>').toString()).should.eql('');
    });
    it("feed('<img width=\"120\" style=\"height:80px\" src=\"http://example.com/1.jpg\"/>')\n"
      + "\t  should be '[img]http://example.com/1.jpg[/img]", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<img width=\"120\" style=\"height:80px\" src=\"http://example.com/1.jpg\"/>').toString()).should.eql('[img]http://example.com/1.jpg[/img]');
    });
    it("imagescale, feed('<img width=100 height=50 src=\"http://example.com/1.jpg\"/>')\n"
      + "\t  should be '[img=100x50]http://example.com/1.jpg[/img]", function () {
      var h2b = new HTML2BBCode({ imagescale: true });
      (h2b.feed('<img width=100 height=50 src=\"http://example.com/1.jpg\"/>').toString()).should.eql('[img=100x50]http://example.com/1.jpg[/img]');
    });
    it("imagescale, feed('<img width=\"100px\" src=\"http://example.com/1.jpg\"/>')\n"
      + "\t  should be '[img width=100]http://example.com/1.jpg[/img]", function () {
      var h2b = new HTML2BBCode({ imagescale: true });
      (h2b.feed('<img width=\"100px\" src=\"http://example.com/1.jpg\"/>').toString()).should.eql('[img width=100]http://example.com/1.jpg[/img]');
    });
    it("imagescale, feed('<img height=50 src=\"http://example.com/1.jpg\"/>')\n"
      + "\t  should be '[img height=50]http://example.com/1.jpg[/img]", function () {
      var h2b = new HTML2BBCode({ imagescale: true });
      (h2b.feed('<img height=50 src=\"http://example.com/1.jpg\"/>').toString()).should.eql('[img height=50]http://example.com/1.jpg[/img]');
    });
    it("imagescale, feed('<img width=\"100px\" style=\"width:120px\" src=\"http://example.com/1.jpg\"/>')\n"
      + "\t  should be '[img width=120]http://example.com/1.jpg[/img]", function () {
      var h2b = new HTML2BBCode({ imagescale: true });
      (h2b.feed('<img width=\"100px\" style=\"width:120px\" src=\"http://example.com/1.jpg\"/>').toString()).should.eql('[img width=120]http://example.com/1.jpg[/img]');
    });
    it("imagescale, feed('<img height=50 style=\"height:80px\" src=\"http://example.com/1.jpg\"/>')\n"
      + "\t  should be '[img height=80]http://example.com/1.jpg[/img]", function () {
      var h2b = new HTML2BBCode({ imagescale: true });
      (h2b.feed('<img height=50 style=\"height:80px\" src=\"http://example.com/1.jpg\"/>').toString()).should.eql('[img height=80]http://example.com/1.jpg[/img]');
    });
  });
  describe(namespace + "feed/align", function () {
    it("feed('<center>str</center>')\n"
        + "\tor feed('<span style=\"text-align:center\">str</span>')\n"
        + "\t  should be '[center]str[/center]'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<center>str</center>').toString()).should.eql('[center]str[/center]');
      (h2b.feed('<span style=\"text-align:center\">str</span>').toString()).should.eql('[center]str[/center]');
    });
    it("noalign, feed('<center>str</center>')\n"
        + "\tor feed('<span style=\"text-align:center\">str</span>')\n"
        + "\t  should be 'str'", function () {
      var h2b = new HTML2BBCode({ noalign: true });
      (h2b.feed('<center>str</center>').toString()).should.eql('str');
      (h2b.feed('<span style=\"text-align:center\">str</span>').toString()).should.eql('str');
    });
  });
  describe(namespace + "feed/list", function () {
    it("feed('<ul><li>one</li><li>two</li></ul>afterlist') should be '[ul][li]one[/li]\\n[li]two[/li]\\n[/ul]afterlist'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<ul><li>one</li><li>two</li></ul>afterlist').toString()).should.eql('[ul][li]one[/li]\n[li]two[/li]\n[/ul]afterlist');
    });
    it("feed('<ol><li>one</li></ol>') should be '[ol][li]one[/li]\\n[/ol]'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<ol><li>one</li></ol>').toString()).should.eql('[ol][li]one[/li]\n[/ol]');
    });
    it("nolist, feed('<ul><li>one</li><li>two</li></ul>') should be 'one\\ntwo\\n'", function () {
      var h2b = new HTML2BBCode({ nolist: true });
      (h2b.feed('<ul><li>one</li><li>two</li></ul>').toString()).should.eql('one\ntwo\n');
    });
  });
  describe(namespace + "feed/headings", function () {
    it("feed('<h1>TITLE</h1>') should be '[h1]TITLE[/h1]\\n'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<h1>TITLE</h1>').toString()).should.eql('[h1]TITLE[/h1]\n');
    });
    it("feed('<div>\\n\\t<h1>TITLE</h1>\\n</div>') should be '[h1]TITLE[/h1]\\n'", function () {
      var h2b = new HTML2BBCode();
      (h2b.feed('<div>\n\t<h1>TITLE</h1>\n</div>').toString()).should.eql('[h1]TITLE[/h1]\n');
    });
    it("noheadings, feed('<h1>TITLE</h1>') should be '[size=32]TITLE[/size]\\n'", function () {
      var h2b = new HTML2BBCode({ noheadings: true });
      (h2b.feed('<h1>TITLE</h1>').toString()).should.eql('[size=32]TITLE[/size]\n');
    });
    it("noheadings, transsize, feed('<h1>TITLE</h1>') should be '[size=6]TITLE[/size]\\n'", function () {
      var h2b = new HTML2BBCode({ noheadings: true, transsize: true });
      (h2b.feed('<h1>TITLE</h1>').toString()).should.eql('[size=6]TITLE[/size]\n');
    });
  });
});
