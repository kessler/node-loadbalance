var expect = require('chai').expect
var WeightedRandomEngine = require('../lib/WeightedRandomEngine')

describe('WeightedRandomEngine', function() {
	this.timeout(50000)

	var pool = ['a', 'b', 'c', 'd']

	var TEST_SIZE = 1000

	it('picks ' + TEST_SIZE + ' members from the pool randomly but with bias', function() {
		var poolWithWeights = [{
			object: 'a',
			weight: 2
		}, {
			object: 'b',
			weight: 3
		}, {
			object: 'c',
			weight: 5
		}]

		var engine = new WeightedRandomEngine(poolWithWeights)
		var results = { a: 0, b: 0, c: 0 }

		for (var i = 0; i < TEST_SIZE; i++) {
			var pick = engine.pick()
			expect(pool).to.include(pick)
			results[pick]++
		}
		results.a = (results.a / TEST_SIZE) * 10
		results.b = (results.b / TEST_SIZE) * 10
		results.c = (results.c / TEST_SIZE) * 10
		
		expect(Math.round(results.a)).to.equal(2)
		expect(Math.round(results.b)).to.equal(3)
		expect(Math.round(results.c)).to.equal(5)
	})

	it('entries must contain an "object" property', function() {
		var poolWithWeights = [{
			weight: 1
		}]

		expect(function() {
			var engine = new WeightedRandomEngine(poolWithWeights)
		}).to.throw('Please specify an object or a value (alias for object) property for entry in index 0')
	})

	it('entries "value" property is an alias to object property', function() {
		var poolWithWeights = [{
			weight: 1,
			value: 'a'
		}]

		expect(function() {
			var engine = new WeightedRandomEngine(poolWithWeights)
		}).not.to.throw()
	})

	it('weights must be integers', function() {
		var poolWithWeights = [{
			weight: 0.2,
			object: 'a'
		}]

		expect(function() {
			var engine = new WeightedRandomEngine(poolWithWeights)
		}).to.throw('Weight in index 0 must be an integer')
	})

	it('weights must greater than zero', function() {
		var poolWithWeights = [{
			weight: 0,
			object: 'a'
		}]

		expect(function() {
			var engine = new WeightedRandomEngine(poolWithWeights)
		}).to.throw('Weight in index 0 must be greater than zero')
	})

	it('constructor is also a factory method', function() {
		var poolWithWeights = [{
			weight: 1,
			object: 'a'
		}]

		var engine = WeightedRandomEngine(poolWithWeights)

		expect(engine).to.be.an.instanceOf(WeightedRandomEngine)
	})
})
