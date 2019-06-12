const AbstractEngine = require('./AbstractEngine')
const debug = require('./debug')('RoundRobinEngine')

class RoundRobinEngine extends AbstractEngine {
	constructor(pool) {
		super(pool)
		debug('ctor')
		this._poolSize = pool.length
		this._currentIndex = 0
	}

	_pick(pool) {
		let pick = pool[this._currentIndex++]
		this._currentIndex = this._currentIndex % this._poolSize
		return pick
	}
}

module.exports = RoundRobinEngine