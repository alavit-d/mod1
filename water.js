var water = new Float64Array(32 * 32);
var ground = new Float64Array(32 * 32);
var width = 32;

for (var i = 0; i < water.length; i++)
	water[i] = 50;

function generateHill(data, width, x1, y1) {
	for (var i = 0; i < width * width; i++) {
		var x = i % width, y =  Math.floor(i / width);
		tmp = Math.pow(10, 2) - (Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
		data[i] += (tmp > 0 ? Math.floor(tmp) : 0);
	}
}

function	height(i) {
	if (0 <= i && i < ground.length)
		return ground[i] + water[i];
	return 10000000;
}

function	nbrFlow(i) {
	var	n = 0;
	if (water[i] > 0) {
		n += (height(i) > height(i + 1) ? 1 : 0);
		n += (height(i) > height(i - 1) ? 1 : 0);
		n += (height(i) > height(i - width) ? 1 : 0);
		n += (height(i) > height(i + width) ? 1 : 0);
	}
	return n;
}

function	moveWater(a, b, n) {
	if (height(a) > height(b)) {
		var vol = (height(a) - height(b)) / (n * 2);
		//console.log(a + ' to ' + b + ' vol: ' + vol);
		water[a] -= vol;
		water[b] += vol;
	}
}

function	fluid(ground, water) {
	for (var i = 0; i < ground.length; i++) {
		var n = nbrFlow(i);
		if (n != 0) {
			moveWater(i, i + 1, n);
			moveWater(i, i - 1, n);
			moveWater(i, i + width, n);
			moveWater(i, i - width, n);
		}
	}
}

function print() {
	for (var i = 0; i < 32; i++) {
		var str = '';
		for (var j = 0; j < 32; j++) {
			str += ' ' + (height(j + i * 32));
		}
		console.log(str);
	}
}
console.log('printing');
print();
generateHill(ground, 32, 16, 16);
console.log('printing');
print();
for (var i = 0; i < 10; i++)
	fluid(water, ground);
console.log('printing');
print();
