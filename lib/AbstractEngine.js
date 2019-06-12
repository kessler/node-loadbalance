const debug = require('./debug')('AbstractEngine')
const { isNullOrUndefined } = require('util')

class AbstractEngine {
	constructor (pool) {
		this._pool = pool
		debug('ctor')
	}

	get pool() {
		return this._pool
	}

	/**
	 * pick a single member from the pool using the load balancing implementation
	 *
	 */
	pick() {
		return this._pick(this._pool)
	}

	_pick(pool) {
		throw new Error('must implement')
	}
}

module.exports = AbstractEngine