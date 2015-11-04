var m = parseInt(process.argv[2])
var count = 0
var r

for (var i = 0; i < Math.pow(2, 29); i++) {
	if (count++ === m) {
		r = count
		count = 0
	}
}