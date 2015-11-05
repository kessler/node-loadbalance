var AbstractEngine = require('./AbstractEngine')
var inherits = require('util').inherits
var debug = require('./debug')('RoundRobinEngine')

module.exports = RoundRobinEngine

function RoundRobinEngine(pool) {
	AbstractEngine.call(this, pool)

	this._poolSize = pool.length
	this._currentIndex = 0
}

inherits(RoundRobinEngine, AbstractEngine)

RoundRobinEngine.prototype.pick = function() {
	var pick = this._pool[this._currentIndex++]
	this._currentIndex = this._currentIndex % this._poolSize
	return pick
}