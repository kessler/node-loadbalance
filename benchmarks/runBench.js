const fs = require('fs')
const { promisify } = require('util')
const cp = require('child_process')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const exec = promisify(cp.exec)
const path = require('path')
const benchmarkFile = path.join(__dirname, 'benchmark.js')

async function main() {
	const { stdout, stderr } = await exec(`node ${benchmarkFile}`)
	const benchResult = JSON.parse(stdout)
	const code = await readFile(benchmarkFile, 'utf8')

	const content = JSON.stringify({
		benchResult,
		code
	})

	const resultFile = path.join(__dirname, 'results', `${Date.now()}.benchmark.json`)
	await writeFile(resultFile, content)

	console.log(`results were written to ${resultFile}`)
}

main()