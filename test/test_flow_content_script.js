const
assert = require('assert');

var cs = require('../src/flow_content_script.js');
suite('Flow contentscript');

test('#trim', function() {
	assert.equal('Juoksu', cs.trim('  Juoksu  '));
});
