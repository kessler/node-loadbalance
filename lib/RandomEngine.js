var AbstractEngine = require('./AbstractEngine')
var inherits = require('util').inherits
var Random = require('random-js')
var debug = require('./debug')('RandomEngine')

module.exports = RandomEngine

/**
 *	@param {Array} pool - objects to pick from
 *	@param {int}	seed - an optional seed that will be used to recreate a random sequence of selections
 */
function RandomEngine(pool, seed) {
	if (!(this instanceof RandomEngine)) return new RandomEngine(pool, seed)
	
	AbstractEngine.call(this, pool)

	this._maxPick = pool.length - 1

	if (typeof (seed) === 'number') {
		debug('using Mersenne Twister engine with seed %d', seed)
		this._r = new Random( Random.engines.mt19937().seed(seed))
	} else {
		debug('using native math engine')
		this._r = new Random( Random.engines.nativeMath)
	}
}

inherits(RandomEngine, AbstractEngine)

RandomEngine.prototype.pick = function() {
	var index = this._lastPick = this._r.integer(0, this._maxPick)
	return this._pool[index]
}