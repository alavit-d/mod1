var waterOld = new Float64Array(width * width);
var waterNew = new Float64Array(width * width);
for (var i = 0; i < width; i++)
	waterOld[i] = 500.0;

function	height(i) {
    return (ground[i] + waterOld[i]);
}

function	nbrFlow(i) {
	var	n = 0;
	if (waterOld[i] > 0) {
        if (i % width == (i + 1) % width)
		  n += (height(i) > height(i + 1) ? 1 : 0);
        if (i % width == (i - 1) % width)
            n += (height(i) > height(i - 1) ? 1 : 0);
        if (i - width >= 0)
		  n += (height(i) > height(i - width) ? 1 : 0);
        if (i + width < ground.length)
		  n += (height(i) > height(i + width) ? 1 : 0);
	}
	return n;
}

function	moveWater(a, b, n) {
	if (height(a) > height(b)) {
		var vol = (height(a) - height(b)) / (n * 2);
			waterNew[a] -= vol;
			waterNew[b] += vol;
	}
}

function	fluid() {
	waterNew = waterOld;
	for (var i = 0; i < ground.length; i++) {
		var n = nbrFlow(i);
		if (n != 0) {
			moveWater(i, i + 1, n);
			moveWater(i, i - 1, n);
			moveWater(i, i + width, n);
			moveWater(i, i - width, n);
		}
	}
    waterOld = waterNew;
}

function printW() {
    console.log('State: ');
    for (var i = 0; i < width; i++) {
        var str = '';
        for (var j = 0; j < width; j++) {
            str += ' ' + Math.floor(waterOld[i * width + j]);
        }
        console.log(str);
    }
}
