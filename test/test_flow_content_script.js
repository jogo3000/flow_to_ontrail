const
assert = require('assert');

var cs = require('../src/flow_content_script.js');
suite('Flow contentscript');

test('#trim', function() {
	assert.equal('Juoksu', cs.trim('  Juoksu  '));
});

test('#parseFlowDate', function() {
	var parsed = cs.parseFlowDate("Lauantai, Marras 19, 2016 06:50  | Polar V800");
	assert.equal(2016, parsed.getFullYear());
	assert.equal(19, parsed.getDate());
	assert.equal(11, parsed.getMonth());
});