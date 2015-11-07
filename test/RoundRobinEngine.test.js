'use strict'

var expect = require('chai').expect
var RoundRobinEngine = require('../lib/RoundRobinEngine')

describe('RoundRobinEngine', function () {
	this.timeout(20000)
	
	var pool = ['a', 'b', 'c', 'd']
	
	var TEST_SIZE = 100000

	it('picks a member from the pool using round robin', function () {
		var engine = new RoundRobinEngine(pool)

		for (var i = 0; i < TEST_SIZE; i++) {
			var pick = engine.pick()
			
			var mod = i % pool.length

			expect(pool).to.include(pick)
			expect(pick).to.equal(pool[mod])
		}
	})

	it('constructor is also a factory method', function () {
		var engine = RoundRobinEngine(pool)

		expect(engine).to.be.an.instanceOf(RoundRobinEngine)
	})
})