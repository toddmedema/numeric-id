var Bignum = require('bignum');

var shardID = Math.round(Math.random()*1023);
var IDsequence = 0;

exports.generate = function() {
  var sequence = Bignum(IDsequence++);
  if (IDsequence >= 4096) { IDsequence = 0; }
  
  // shard ID
  var shard = Bignum(shardID);

  // 41 bit mask for time
  var mask = Bignum(0x1ffffffffff);
  // 69 years of precision, using server time, starting midnight Jan 1, 2015
  var time = Bignum(Date.now() - 1420070400000).and(mask);
  
  var id = Bignum(0).add(shard); // 10 bits
  id = id.add(sequence.shiftLeft(10)); // 12 bits
  id = id.add(time.shiftLeft(22)); // 41 bits

  return id.toString();
}