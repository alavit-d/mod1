var water = new Float64Array(1024 * 1024);

for (var i = 0; i < water.length; i++)
	water[i] = 60;

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
