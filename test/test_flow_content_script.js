const
assert = require('assert');

var cs = require('../src/flow_content_script.js');
suite('Flow contentscript');

test('#trim', function() {
	assert.equal('Juoksu', cs.trim('  Juoksu  '));
});

/**
 * Asserts date parsing results
 * 
 * @param s
 *            date string
 * @param f
 *            assert function
 */
function assertDate(s, f) {
	var parsed = cs.parseFlowDate(s);
	f(parsed);
}

test('#Date parsing gets the year right', function() {
	assertDate("Lauantai, Marras 1, 2017 06:50 | Polar V800", function(p) {
		assert.equal(2017, p.getFullYear());
	});
});
test('#Date parsing gets the month right', function() {
	assertDate("Lauantai, Marras 12, 2016 06:50 | Polar V800", function(p) {
		assert.equal(10, p.getMonth());
	});
});

test('#Date parsing gets the Joulukuu month right', function() {
	assertDate("Lauantai, Joulu 12, 2016 06:50 | Polar V800", function(p) {
		assert.equal(11, p.getMonth());
	});
});
test('#Date parsing gets the day right', function() {
	assertDate("Lauantai, Tammi 31, 2016 06:50 | Polar V800", function(p) {
		assert.equal(31, p.getDate());
	});
});
test('#Date parsing gets the hour right', function() {
	assertDate("Lauantai, Joulu 31, 2016 06:50 | Polar V800", function(p) {
		assert.equal(6, p.getHours());
	});
});
test('#Date parsing gets the minutes right', function() {
	assertDate("Lauantai, Joulu 31, 2016 06:21 | Polar V800", function(p) {
		assert.equal(21, p.getMinutes());
	});
});
