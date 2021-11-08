const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);
//cache middleware
redisClient.on("error", function(error) {
  console.error(error);
});
module.exports.setCache = (key, value) => {
   redisClient.set(key, JSON.stringify(value));
}

module.exports.getCache = (req, res, next) => {
	let key = req.route.path;
    // console.log('ok');
    // redisClient.setCache(key, (err, data) => {
    //   if (err) throw err;
    //   if (data !== null) res.status(200).send(JSON.parse(data));
    //   else next();
 	// });
     next()
}