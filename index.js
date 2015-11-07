module.exports.AbstractEngine = require('./lib/AbstractEngine.js')
module.exports.random = module.exports.RandomEngine = require('./lib/RandomEngine.js')
var RoundRobinEngine = module.exports.RoundRobinEngine = require('./lib/RoundRobinEngine.js')
var WeightedRoundRobinEngine = module.exports.WeightedRoundRobinEngine = require('./lib/WeightedRoundRobinEngine.js')
 
module.exports.roundRobin = function(pool) {
	if (pool.length === 0) {
		throw new Error('pool length must be greater than zero')
	}

	var entry = pool[0]

	if (entry.weight) {
		return new WeightedRoundRobinEngine(pool)
	} else {
		return new RoundRobinEngine(pool)
	}
}
