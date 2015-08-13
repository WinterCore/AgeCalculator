var isLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	notLeap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	day = $('#day'),
	month = $('#month'),
	year = $('#year'),
	birthday = $('#bDay'),
	age = $('#age'),
	months = $('#months'),
	weeks = $('#weeks'),
	days = $('#days'),
	hours = $('#hours'),
	minutes = $('#minutes'),
	seconds = $('#seconds'),
	remaining = $('#remaining'),
	interval,
	firstTime = true;


function commafy(data) {
	"use strict";
	var str = data.toString();
	str = str.split('').reverse().join('');
	str = str.replace(/(\d{3})/g, '$1,');
	str = str.split('').reverse().join('');
	return str.replace(/(^\,)/, '');
}

function sp(data) {
	"use strict";
	return data > 1 ? 's' : '';
}

function birthDay(e) {
	"use strict";
	e = e.slice(0, 3);
	var t;
	switch (e) {
	case "Fri":
		t = "Friday";
		break;
	case "Thu":
		t = "Thursday";
		break;
	case "Wed":
		t = "Wednesday";
		break;
	case "Tue":
		t = "Tuesday";
		break;
	case "Mon":
		t = "Monday";
		break;
	case "Sun":
		t = "Sunday";
		break;
	case "Sat":
		t = "Saturday";
		break;
	}
	return t;
}

function calculate(e, t, n) {
	"use strict";
	var r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, A, O,
		result;
	n = Number(n);
	t = Number(t) - 1;
	e = Number(e);
	N = new Date();
	C = new Date(e, t, n, 0, 0, 0, 0);
	k = new Date(N.getFullYear(), t, n);
	if (k.getTime() < N.getTime()) {
		E = N.getFullYear() + 1;
		k = new Date(E, t, n);
	}
	S = N.getTime() - C.getTime();
	a = Math.floor(S / 1e3);
	d = a;
	u = Math.floor(a / 60);
	p = u;
	a %= 60;
	o = Math.floor(u / 60);
	h = o;
	u %= 60;
	s = Math.floor(o / 24);
	c = s;
	l = Math.floor(c / 7);
	o %= 24;
	r = 0;
	E = C.getFullYear() + 1;
	while (true) {
		var L = E % 4 === 0 ? true : false;
		if (L) {
			if (s >= 366) {
				s -= 366;
				E += 1;
				r += 1;
			} else {
				break;
			}
		} else {
			if (s >= 365) {
				s -= 365;
				E += 1;
				r += 1;
			} else {
				break;
			}
		}
	}
	E = N.getFullYear() + 1;
	T = E % 4 === 0 ? isLeap : notLeap;
	i = 0;
	for (A = 0; s > T[A]; A++) {
		s -= T[A];
		i += 1;
	}
	f = 0;
	E = C.getFullYear() + 1;
	T = E % 4 === 0 ? isLeap : notLeap;
	for (A = 0, O = c; O > T[A]; A++) {
		T = E % 4 === 0 ? isLeap : notLeap;
		O -= T[A];
		f += 1;
		E += 1;
		if (A === 11) {
			A = 0;
		}
	}
	x = k.getTime() - N.getTime();
	b = Math.floor(x / 1e3);
	y = Math.floor(b / 60);
	b %= 60;
	g = Math.floor(y / 60);
	y %= 60;
	m = Math.floor(g / 24);
	g %= 24;
	T = E === 0 ? isLeap : notLeap;
	v = 0;
	for (A = N.getMonth(); m > T[A]; A++) {
		m -= T[A];
		v += 1;
		if (A === 11) {
			A = 0;
		}
	}
	w = birthDay(C.toDateString());
	result = [r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w];
	return result;
}


function printResults(result) {
	"use strict";
	birthday.html('You Were Born On <span>' + result[17] + '.</span>');
	age.html('You are ' + result[0] + '&nbsp;Year' + sp(result[0]) + ', ' + result[1] + '&nbsp;Month' + sp(result[1]) + ', ' + result[2] + '&nbsp;Day' + sp(result[2]) + ', ' + result[3] + '&nbsp;Hour' + sp(result[3]) + ', ' + result[4] + '&nbsp;Minute' + sp(result[4]) + ' and ' + result[5] + '&nbsp;Second' + sp(result[5]) + ' old.');
	months.html('OR ' + commafy(result[6]) + ' Month' + sp(result[6]) + '.');
	weeks.html('OR ' + commafy(result[7]) + ' Week' + sp(result[7]) + '.');
	days.html('OR ' + commafy(result[8]) + ' Day' + sp(result[8]) + '.');
	hours.html('OR ' + commafy(result[9]) + ' Hour' + sp(result[9]) + '.');
	minutes.html('OR ' + commafy(result[10]) + ' Minute' + sp(result[10]) + '.');
	seconds.html('OR ' + commafy(result[11]) + ' Second' + sp(result[11]) + '.');
	remaining.html('And Your Next Birthday is in :<br/><div>' + result[12] + '&nbsp;Month' + sp(result[12]) + ', ' + result[13] + '&nbsp;Day' + sp(result[13]) + ', ' + result[14] + '&nbsp;Hour' + sp(result[14]) + ', ' + result[15] + '&nbsp;Minute' + sp(result[15]) + ' and ' + result[16] + '&nbsp;Second' + sp(result[16]) + '.</div>');
}
$('.inputs').on('keyup', function (evt) {
	"use strict";
	if (day.val().length > 0 && month.val().length > 0 && year.val().length > 3) {
		clearInterval(interval);

		printResults(calculate(year.val(), month.val(), day.val()));
		interval = setInterval(function () {
			printResults(calculate(year.val(), month.val(), day.val()));
		}, 1000);
	}
	if(firstTime) {
		firstTime = false;
		$('.center').fadeIn(500);
	}
});