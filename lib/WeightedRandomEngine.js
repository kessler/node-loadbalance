var inherits = require('util').inherits
var debug = require('./debug')('WeightedRandomEngine')
var RandomEngine = require('./RandomEngine')
var prepareWeights = require('./prepareWeights')

module.exports = WeightedRandomEngine

/**
 *	@param {Array} pool - objects to pick from
 *	@param {int}	seed - an optional seed that will be used to recreate a random sequence of selections
 */
function WeightedRandomEngine (pool, seed) {
	if (!(this instanceof WeightedRandomEngine)) return new WeightedRandomEngine(pool, seed)

	RandomEngine.call(this, prepareWeights(pool), seed)
}

inherits(WeightedRandomEngine, RandomEngine)
