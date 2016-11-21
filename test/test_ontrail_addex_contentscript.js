const
assert = require('assert');
const
spy = require('sinon').spy;

var cs = require('../src/ontrail_addex_contentscript.js');
suite('Ontrail contentscript');

test('#round', function() {

	var tests = [ [ '8,00 km', '8000' ], [ '8,00 km', '8001' ],
			[ '8,01 km', '8005' ], [ '8,00 km', '7999' ] ];

	tests.forEach(function(test) {
		assert.equal(test[0], cs.formatDistance(test[1]));
	})
});

test('#toOntrailDateString', function() {
	assert.equal('11.1.1981', cs.toOntrailDateString(new Date(
			"1981-01-11T07:56:00.123Z")));
});

function assertTimeTagCreated(expected, timestamp) {
	data = {
		timestamp : timestamp
	};
	var tagSelector = spy();

	cs.prefiller(tagSelector)(data);

	assert(tagSelector.calledWith(
			'#s2id_ex-tags > ul > li.select2-search-field > input', expected));
}

test('#prefill generates tag for morning run', function() {
	assertTimeTagCreated('aamu', '2011-05-26T07:56:00.123Z');
});

test('#prefill generates tag for evening run', function() {
	assertTimeTagCreated('iltapäivä', '2011-05-26T12:00:01.123Z');
});