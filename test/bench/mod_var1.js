var r = 0
var m = parseInt(process.argv[2])
for (var i = 0; i < Math.pow(2, 29); i++) {
	r = i % m
}