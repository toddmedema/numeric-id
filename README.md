# numeric-id
Node module that generates compact, meaningful, ordered numeric ID's (stored as strings to prevent JS precision errors). Capable of 4,096 unique ID's per ms per process.

```
var NumericId = require('numeric-id');

var bigUniqueId = NumericId.generate();
```

Concept courtesy of http://engineering.intenthq.com/2015/03/icicle-distributed-id-generation-with-redis-lua/ 

Implementation notes:

* Although the IDs generated are numbers, they are cast to strings to avoid JavaScript numerical precision issues. To prevent these issues in your code, you should treat these IDs as strings until you store them into a database or other environment capable of handling 64 bit numbers without truncation.
* JavaScript's numeric precision with numbers this large often results in the last digit being rounded. As such, I've chosen to deviate from the linked format (time-shard-sequence), instead doing (time-sequence-shard), so that incremental sequence values are not rounded together if you need to handle these IDs as numbers. This does mean that the random shard values are more likely to get rounded together if you cast to a number.
* This implementation does not require a Redis instance, which reduces the uniqueness of ID's across processes. It is not recommended to use this implementation in production workloads with more than a few processes.
