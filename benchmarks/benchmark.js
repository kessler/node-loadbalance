/**
 *    this is the actual benchmark test, in it we'll test each engine's pick doing N iterations
 *    should we run the same engine X times N iterations and save the average?
 */
const { RandomEngine, RoundRobinEngine, WeightedRandomEngine, WeightedRoundRobinEngine } = require('../index')

const RANDOM_SEED = 999999
const ITERATIONS = 1000000

const simplePool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const weightedPool = [
	{ weight: 1, object: 1 },
	{ weight: 2, object: 2 },
	{ weight: 3, object: 3 },
	{ weight: 4, object: 4 },
	{ weight: 5, object: 5 },
	{ weight: 6, object: 6 },
	{ weight: 7, object: 7 },
	{ weight: 8, object: 8 },
	{ weight: 9, object: 9 },
	{ weight: 10, object: 10 }
]

const engineInstances = {
	RandomEngine: new RandomEngine(simplePool, RANDOM_SEED),
	RoundRobinEngine: new RoundRobinEngine(simplePool),
	WeightedRandomEngine: new WeightedRandomEngine(weightedPool, RANDOM_SEED),
	WeightedRoundRobinEngine: new WeightedRoundRobinEngine(weightedPool)
}

const benchResults = {}

// loop through engines
for (let [name, engine] of Object.entries(engineInstances)) {
	let start = Date.now()
	
	// pick N times
	for (let i = 0; i < ITERATIONS; i++) {
		engine.pick()
	}

	let end = Date.now()
	benchResults[name] = end - start
}

console.log(JSON.stringify(benchResults))
