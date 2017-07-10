var RoundRobinEngine = require('./RoundRobinEngine')
var inherits = require('util').inherits
var debug = require('./debug')('WeightedRoundRobinEngine')
var inspect = require('util').inspect
var prepareWeights = require('./prepareWeights')

module.exports = WeightedRoundRobinEngine

function WeightedRoundRobinEngine(pool) {
	if (!(this instanceof WeightedRoundRobinEngine)) return new WeightedRoundRobinEngine(pool)

	RoundRobinEngine.call(this, prepareWeights(pool))
}

inherits(WeightedRoundRobinEngine, RoundRobinEngine)