var RoundRobinEngine = require('./RoundRobinEngine')
var inherits = require('util').inherits
var debug = require('./debug')('WeightedRoundRobinEngine')
var inspect = require('util').inspect
var math = require('mathjs')

module.exports = WeightedRoundRobinEngine

function WeightedRoundRobinEngine(pool) {
	if (!(this instanceof WeightedRoundRobinEngine)) return new WeightedRoundRobinEngine(pool)

	RoundRobinEngine.call(this, this._prepareWeights(pool))
}

inherits(WeightedRoundRobinEngine, RoundRobinEngine)

WeightedRoundRobinEngine.prototype._prepareWeights = function(pool) {

	if (pool.length === 0) throw new Error('cannot prepare a zero length pool')

	var preparedPool = []

	pool.sort(function(a, b) {
		return b.weight - a.weight
	})

	pool.forEach(function (entry, index) {
		var object

		// check this in a way that allows the use of zeros and "false" as object
		if (entry.object !== undefined && entry.object !== null) {
			object = entry.object
		} else if (entry.value !== undefined && entry.value !== null) {
			object = entry.value
		}

		if (object === undefined || object === null) {
			throw new Error('Please specify an object or a value (alias for object) property for entry in index ' + index)
		}

		if (entry.weight <= 0) {
			throw new Error('Weight in index ' + index + ' must be greater than zero')
		}

		if (entry.weight % 1 !== 0) {
			throw new Error('Weight in index ' + index + ' must be an integer')
		}


		for (var i = 0; i < entry.weight; i++) {
			preparedPool.push(object)
		}
	})

	return preparedPool
}