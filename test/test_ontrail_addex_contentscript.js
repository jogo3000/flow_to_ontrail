const
assert = require('assert');

var cs = require('../src/ontrail_addex_contentscript.js');
suite('Ontrail contentscript');

test('#round', function() {

	var tests = [ [ '8000', '8000' ], 
	              [ '8000', '8001' ],
	              [ '8010', '8005' ],
	              [ '8000', '7999' ]
	              ];

	tests.forEach(function (test) {
		assert.equal(test[0], cs.round(test[1]));
	})
});

test('#toOntrailDateString', function(){
	assert.equal('11.1.1981', cs.toOntrailDateString(new Date(1981, 1, 11)));
});