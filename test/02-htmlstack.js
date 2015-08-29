var should = require("should");

var h2b = require('./../lib/html2bbcode'),
  HTMLTag = h2b.HTMLTag,
  HTMLStack = h2b.HTMLStack;

var namespace = "HTMLStack/";

describe(namespace + "base", function () {
  it("parse() should return HTMLStack", function () {
    (new HTMLStack().parse().constructor.name).should.eql('HTMLStack');
    (new HTMLStack().parse('').constructor.name).should.eql('HTMLStack');
    var hs = new HTMLStack();
    hs.parse().should.eql(hs);  //eql self
  });
  it("strip() should return HTMLStack", function () {
    var hs = new HTMLStack();
    (hs.strip().constructor.name).should.eql('HTMLStack');
    var hs = new HTMLStack();
    hs.strip().should.eql(hs);  //eql self
  });
  it("decode() should return HTMLStack", function () {
    (new HTMLStack().decode().constructor.name).should.eql('HTMLStack');
    var hs = new HTMLStack();
    hs.decode().should.eql(hs);  //eql self
  });
  it("dedup() should return HTMLStack", function () {
    var hs = new HTMLStack();
    (hs.dedup().constructor.name).should.eql('HTMLStack');
    var hs = new HTMLStack();
    hs.dedup().should.eql(hs);  //eql self
  });
  it("HTMLStack.unescape('str&nbsp;', true) should be '&nbsp;'", function () {
    HTMLStack.unescape('str&nbsp;', true).should.eql('str&nbsp;');
  });
  it("HTMLStack.unescape('str&amp;&nbsp;&lt;&gt;&quot;&#x27;&#9670;')\n"
    + "\tshould be 'str& <>\"\\'◆'", function () {
    HTMLStack.unescape('str&amp;&nbsp;&lt;&gt;&quot;&#x27;&#x25c6;&#9670;').should.eql('str& <>\"\'◆◆');
  });
  it("HTMLStack.unescape('&#x;&#xS;&#;&#T;') should be '&#x;&#xS;&#;&#T;'", function () {
    HTMLStack.unescape('&#x;&#xS;&#;&#T;').should.eql('&#x;&#xS;&#;&#T;');
  });
});

describe(namespace + "parse", function () {
  it("parse('str').stack should be [ 'str' ]", function () {
    var hs = new HTMLStack();
    hs.parse('str');
    should.exist(hs.stack);
    (hs.stack).should.eql([ 'str' ]);
  });
  it("parse('<p>str</p>').stack should be `<p> -> [ 'str' ]`", function () {
    var hs = new HTMLStack();
    var s = hs.parse('<p>str</p>').stack;

    (s.length).should.eql(1);
    (s[0].constructor.name).should.eql('HTMLTag');

    var tag = s[0];
    (tag.name).should.eql('p');
    should.exist(tag.content);
    (tag.content.constructor.name).should.eql('HTMLStack');
    should.exist(tag.content.stack);
    (tag.content.stack).should.eql([ 'str' ]);
  });
  it("parse('<img src=\"http://example.com/1.jpg\">').stack\n"
      + "\tshould be `<img> ~> { src: \"http://example.com/1.jpg\" }`", function () {
    var hs = new HTMLStack();
    var s = hs.parse('<img src=\"http://example.com/1.jpg\">').stack;

    (s.length).should.eql(1);
    (s[0].constructor.name).should.eql('HTMLTag');

    var tag = s[0];
    (tag.name).should.eql('img');
    should.not.exist(tag.content);
    should.exist(tag.attr);

    tag.attr.should.eql({ "src": "http://example.com/1.jpg" });
  });
  it("parse('&amp;str').decode().stack should be [ '&str' ]", function () {
    var hs = new HTMLStack();
    hs.parse('&amp;str').decode();
    should.exist(hs.stack);
    (hs.stack).should.eql([ '&str' ]);
  });
});

describe(namespace + "strip", function () {
  it("parse('\\n\\tstr').strip().stack should be [ 'str' ]", function () {
    var hs = new HTMLStack();
    hs.parse('\n\tstr').strip();
    (hs.stack).should.eql([ 'str' ]);
  });
  it("parse('<span>\\n\\tstr</span> \\n\\tother').strip().stack\n"
      + "\tshould be [ `<span> -> [ 'str' ]`, ' other' ]", function () {
    var hs = new HTMLStack();
    var s = hs.parse('<span>\n\tstr</span> \n\tother').strip().stack;

    (s.length).should.eql(2);
    (s[0].constructor.name).should.eql('HTMLTag');
    (s[1]).should.eql(' other');

    var tag = s[0];
    (tag.name).should.eql('span');
    (tag.content.stack).should.eql([ 'str' ]);
  });
  it("parse('<p> A<span>\\n\\tstr</span> \\n\\tother</p>').strip().stack\n"
      + "\tshould be `<p> -> [ 'A', `<span> -> [ ' str' ]`, ' other' ]`", function () {
    var hs = new HTMLStack();
    var s = hs.parse('<p> A<span>\n\tstr</span> \n\tother</p>').strip().stack;

    (s.length).should.eql(1);
    (s[0].constructor.name).should.eql('HTMLTag');

    var tag = s[0];
    (tag.name).should.eql('p');
    should.exist(tag.content);

    // <p> content
    var s2 = tag.content.stack;
    (s2.length).should.eql(3);
    (s2[0]).should.eql('A');
    (s2[1].constructor.name).should.eql('HTMLTag');
    (s2[2]).should.eql(' other');

    var tag2 = s2[1];
    (tag2.name).should.eql('span');
    should.exist(tag2.content);
    (tag2.content.stack).should.eql([ ' str' ]);
  });
});

describe(namespace + "dedup", function () {
  it("parse('<div>\\n\\t<div> </div></div>').strip().dedup().stack should be `<div>`", function () {
    var hs = new HTMLStack();
    var s = hs.parse('<div>\n\t<div> </div></div>').strip().dedup().stack;

    (s.length).should.eql(1);
    (s[0].constructor.name).should.eql('HTMLTag');

    var tag = s[0];
    (tag.name).should.eql('div');
    should.not.exist(tag.content);
  });

  it("parse('<div>\\n\\t<span> </span></div>').strip().dedup().stack\n"
      + "\tshould be `<div> -> [ `<span>` ]`", function () {
    var hs = new HTMLStack();
    var s = hs.parse('<div>\n\t<span>&nbsp;</span></div>').strip().stack;

    (s.length).should.eql(1);
    (s[0].constructor.name).should.eql('HTMLTag');

    var tag = s[0];
    (tag.name).should.eql('div');
    should.exist(tag.content);

    var s2 = tag.content.stack;
    (s2.length).should.eql(1);
    (s2[0].constructor.name).should.eql('HTMLTag');
    (s2[0].name).should.eql('span');
  });
});

describe(namespace + "fault-tolerant", function () {
  it("parse('<p>str').stack should be `<p> -> [ 'str' ]`", function () {
    var hs = new HTMLStack();
    var s = hs.parse('<p>str').stack;

    (s.length).should.eql(1);
    (s[0].constructor.name).should.eql('HTMLTag');

    var tag = s[0];
    (tag.name).should.eql('p');
    should.exist(tag.content);
    (tag.content.stack).should.eql([ 'str' ]);
  });

  it("parse('<p>str</span>other').stack\n"
      + "\tshould be [ `<p> -> [ 'str' ]`, 'other' ]", function () {
    var hs = new HTMLStack();
    var s = hs.parse('<p>str</span>other').stack;

    (s.length).should.eql(2);
    (s[0].constructor.name).should.eql('HTMLTag');
    (s[1]).should.eql('other');

    var tag = s[0];
    (tag.name).should.eql('p');
    should.exist(tag.content);
    (tag.content.stack).should.eql([ 'str' ]);
  });
});
