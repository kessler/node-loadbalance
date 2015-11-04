var debug = require('debug')

module.exports = function (ns) {
	return debug('loadbalance:' + ns)
}