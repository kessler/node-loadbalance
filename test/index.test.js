var expect = require('chai').expect
var index = require('../index')
var WeightedRoundRobinEngine = require('../lib/WeightedRoundRobinEngine')
var RoundRobinEngine = require('../lib/RoundRobinEngine')

describe('exports', function() {
	describe('a factory method that creates a round robin or weighted round robin engine, based on the contents of the pool.', function() {
		it('If the first entry in the pool contain a weight property a weighted round robin engine will be returned', function() {
			var engine = index.roundRobin([{
				object: 'a',
				weight: 1
			}])

			expect(engine).to.be.an.instanceOf(WeightedRoundRobinEngine)
		})

		it('If the first entry in the pool DOES NOT contain a weight property a norma round robin engine will be returned', function() {
			var engine = index.roundRobin([ 'a' ])

			expect(engine).to.be.an.instanceOf(RoundRobinEngine)
		})
	})
})