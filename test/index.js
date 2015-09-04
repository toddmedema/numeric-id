var Code = require('code');   // assertion library
var Lab = require('lab');
var Sinon = require('sinon');

var lab = exports.lab = Lab.script();
var expect = Code.expect;

var Id = require('../index.js');


lab.experiment('generating IDs', function () {


  lab.test('returns a string ID that can be converted to a number', function (done) {

    var id = Id.generate();

    expect(id).to.be.a.string();
    expect(+id).to.be.a.number();
    done();
  });


  lab.test('returns two unique IDs', function (done) {

    var id1 = Id.generate();
    var id2 = Id.generate();

    expect(id1).to.not.equal(id2);
    done();
  });


  lab.test('returns 4,096 unique IDs per ms', function (done) {

    var ids = [];

    var clock = Sinon.useFakeTimers(Date.now());

    for (var i = 0; i < 4096; i++) {
      ids.push(Id.generate());
    }

    clock.restore();

    var uniqueIds = ids.filter(function(elem, pos) {
      return ids.indexOf(elem) == pos;
    });

    expect(uniqueIds.length).to.equal(ids.length);
    done();
  });


  lab.test('4,097th ID per ms repeats', function (done) {

    var ids = [];

    var clock = Sinon.useFakeTimers(Date.now());
    for (var i = 0; i < 4097; i++) {
      ids.push(Id.generate());
    }
    clock.restore();

    var uniqueIds = ids.filter(function(elem, pos) {
      return ids.indexOf(elem) == pos;
    });

    expect(uniqueIds.length).to.equal(ids.length-1);
    done();
  });


  lab.test('can generate 4,096 IDs per ms for several ms in a row', function (done) {

    var ids = [];

    var clock = Sinon.useFakeTimers(Date.now());

    for (var t = 0; i < 4; t++) {
      for (var i = 0; i < 4096; i++) {
        ids.push(Id.generate());
      }
      clock.tick(1);
    }

    clock.restore();

    var uniqueIds = ids.filter(function(elem, pos) {
      return ids.indexOf(elem) == pos;
    });

    expect(uniqueIds.length).to.equal(ids.length);
    done();
  });
});