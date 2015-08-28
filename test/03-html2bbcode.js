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
});
