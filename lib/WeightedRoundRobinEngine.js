var RoundRobinEngine = require('./RoundRobinEngine')
var inherits = require('util').inherits
var debug = require('./debug')('WeightedRoundRobinEngine')

module.exports = WeightedRoundRobinEngine

function WeightedRoundRobinEngine(pool, sampleSize) {
	RoundRobinEngine.call(this, pool)

	this._sampleSize = sampleSize || 1000
}

inherits(WeightedRoundRobinEngine, RoundRobinEngine)

WeightedRoundRobinEngine.prototype.pick = function() {
	var pick = this._pool[this._currentIndex++]
	if (this._currentIndex > this._maxPick) this._currentIndex = 0
	return pick
}

function preparePool (weightedPool, sampleSize) {
	var stars = 0

	for (var e in weightedPool) {
		
	}

	var pool = []
}