const assert = require('assert');

const cs = require('../src/flow_content_script.js');
suite('Flow contentscript');

describe('trim', function() {
    it('should trim "  Juoksu   " to "Juoksu"', function () {
	assert.equal('Juoksu', cs.trim('   Juoksu   '));
    });
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
describe('Date parsing from input scraped from Finnish flow.polar.com', function() {
    it('should parse the year 2017', function() {
	assertDate("   Lauantai, Marras 1, 2017 06:50 | Polar V800", function(p) {
	assert.equal(2017, p.getFullYear());
	});
    });

    it('should parse the month 10 from "Marras" (javascript months start from 0)', function() {
	assertDate("   Lauantai, Marras 12, 2016 06:50 | Polar V800", function(p) {
	    assert.equal(10, p.getMonth());
	});
    });

    it('Should parse the month 11 from "Joulu" (javascript months start from 0)', function() {
	assertDate("Lauantai, Joulu 12, 2016 06:50 | Polar V800", function(p) {
	    assert.equal(11, p.getMonth());
	});
    });

    it('Should parse the date 31 from the input', function() {
	assertDate("Lauantai, Tammi 31, 2016 06:50 | Polar V800", function(p) {
	    assert.equal(31, p.getDate());
	});
    });
    it('Should parse the hour 6 from the input', function() {
	assertDate("Lauantai, Joulu 31, 2016 06:50 | Polar V800", function(p) {
	    assert.equal(6, p.getHours());
	});
    });
    it('Should parse the minutes 21 from the input', function() {
	assertDate("Lauantai, Joulu 31, 2016 06:21 | Polar V800", function(p) {
	    assert.equal(21, p.getMinutes());
	});
    });
});
