module.exports = AbstractEngine

function AbstractEngine(pool) {
	if (!(this instanceof AbstractEngine)) return new AbstractEngine(pool)
	
	this._pool = pool
}

/**
 * pick a single member from the pool using the load balancing implementation
 *
 * 
 */
AbstractEngine.prototype.pick = function() {
	throw new Error('abstract engine')
}
