var should = require("should");

var h2b = require('./../lib/html2bbcode'),
  HTMLTag = h2b.HTMLTag;

var namespace = "HTMLTag/";

describe(namespace + "base", function () {
  it("quote(\"\'str\\'\\\"\"\'\") should be '\"str\\'\\\"\\\"\"'", function () {
    var tag = new HTMLTag();
    tag.quote("\'str\'\\\"\"\'").should.eql("\"str\'\\\"\\\"\"");
  });
  it("findquoteend('\"A\";B') should be 2", function () {
    var tag = new HTMLTag();
    tag.findquoteend('\"A\";B').should.eql(2);
  });
  it("findscriptend(' var a = 1; </script>') should be 12", function () {
    var tag = new HTMLTag();
    tag.findscriptend(' var a = 1; </script>').should.eql(12);
  });
});

describe(namespace + "fault-tolerant", function () {
  it("quote(\"\'str\\'\\\"\"\"\") should be '\"str\\'\\\"\\\"\"'", function () {
    var tag = new HTMLTag();
    tag.quote("\'str\'\\\"\"\"").should.eql("\"str\'\\\"\\\"\"");
  });
  it("findquoteend('\"A;B') should be -1", function () {
    var tag = new HTMLTag();
    tag.findquoteend('\"A;B').should.eql(-1);
  });
  it("findscriptend('\\\'</script>') should be -1", function () {
    var tag = new HTMLTag();
    tag.findscriptend('\'</script>').should.eql(-1);
  });
});
