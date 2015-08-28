var should = require("should");

var BBCode = require('./../lib/html2bbcode').BBCode;

var namespace = "BBCode/";

describe(namespace + "base", function () {
  it("append('str') should be 'str'", function () {
    var bbcode = new BBCode();
    bbcode.append('str');
    bbcode.toString().should.eql("str");
  });
  it("open/close should be enclosed", function () {
    var bbcode = new BBCode();
    bbcode.open('b');
    bbcode.append('str');
    bbcode.close('b');
    bbcode.toString().should.eql("[b]str[/b]");
  });
  it("open/rollback/open/close should be enclosed once", function () {
    var bbcode = new BBCode();
    bbcode.open('b');
    bbcode.rollback();
    bbcode.open('i');
    bbcode.append('str');
    bbcode.close('i');
    bbcode.toString().should.eql("[i]str[/i]");
  });
});
