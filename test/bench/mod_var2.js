var r = 0
var m = parseInt(process.argv[2])
var c = 0
var max = Math.pow(2, 29)
var cycles = 0
while (true) {
	r = c++ % m
	if (r >= Number.MAX_VALUE) console.log(111111111111111111111)
	//if (c > max) break
}