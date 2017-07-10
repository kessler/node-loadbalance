var inherits = require('util').inherits
var debug = require('./debug')('RandomEngine')
var RandomEngine = require('./RandomEngine')
var prepareWeights = require('./prepareWeights')

module.exports = WeightedRandomEngine

function WeightedRandomEngine (pool, seed) {
	if (!(this instanceof WeightedRandomEngine)) return new WeightedRandomEngine(pool, seed)

	RandomEngine.call(this, prepareWeights(pool), seed)
}

inherits(WeightedRandomEngine, RandomEngine)
