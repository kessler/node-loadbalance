'use strict'

var expect = require('chai').expect
var RandomEngine = require('../lib/RandomEngine')

describe('RandomEngine', function () {
	this.timeout(10000)
	
	var pool = ['a', 'b', 'c', 'd']
	const TEST_SIZE = 100000

	it('picks a random element from a pool', function () {
		var engine = new RandomEngine(pool)

		var results = {}

		for (let i = 0; i < pool.length; i++) {
			results[pool[i]] = 0
		}

		for (let i = 0; i < TEST_SIZE; i++) {
			var pick = engine.pick()
			expect(pool).to.include(pick)
			results[pick]++
		}

		for (let r in results) {
			var p = results[r] / TEST_SIZE
			expect(p).to.be.above(0.24)
			expect(p).to.be.below(0.26)
		}
	})

	it('accepts a seed number to be used for repeating random pick series', function () {
		var e1a = new RandomEngine(pool, 1)
		var e1b = new RandomEngine(pool, 1)

		var e2 = new RandomEngine(pool, 2)

		for (let i = 0; i < TEST_SIZE; i++) {
			let e1aPick = e1a.pick()
			let e1bPick = e1b.pick()
			let e2Pick = e2.pick()

			expect(e1aPick).to.equal(e1bPick)
		}

	})

})