'use strict'

var expect = require('chai').expect
var RoundRobinEngine = require('../lib/RoundRobinEngine')

describe('RoundRobinEngine', function () {
	this.timeout(10000)
	
	var pool = ['a', 'b', 'c', 'd']
	const TEST_SIZE = 100000

	it('picks a member from the pool using round robin', function () {
		var engine = new RoundRobinEngine(pool)

		for (let i = 0; i < TEST_SIZE; i++) {
			var pick = engine.pick()
			
			var mod = i % pool.length

			expect(pool).to.include(pick)
			expect(pick).to.equal(pool[mod])
		}
	})
})