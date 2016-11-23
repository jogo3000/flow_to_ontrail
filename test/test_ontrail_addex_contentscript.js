const
assert = require('assert');
const
OntrailModel = require('../src/ontrailmodel.js').OnrailModel;
const
sinon = require('sinon');

var cs = require('../src/ontrail_addex_contentscript.js');
suite('Ontrail contentscript');

test('#round', function() {

	var tests = [ [ '8,00 km', '8000' ], [ '8,00 km', '8001' ],
			[ '8,01 km', '8005' ], [ '8,00 km', '7999' ] ];

	tests.forEach(function(test) {
		assert.equal(test[0], cs.formatDistance(test[1]));
	})
});

// Javascript date constructor takes moths as 0...11
test('#toOntrailDateString', function() {
	assert.equal('11.2.1981', cs.toOntrailDateString(new Date(1981, 1, 11)));
});

test('#toOntrailDateString December', function() {
	assert.equal('11.12.1981', cs.toOntrailDateString(new Date(1981, 11, 11)));
});

test('#Prefill duration', function() {
	var model = sinon.spy(OntrailModel, 'fillDuration');
	cs.Prefiller(model)({
		duration : '00:40:10.101'
	});

	assert(model.fillDuration.calledWith('00:40:10'));

});