const
assert = require('assert');
const
OntrailModel = require('../src/ontrailmodel.js');
const
sinon = require('sinon');

var cs = require('../src/ontrail_addex_contentscript.js');
suite('Ontrail contentscript');

// Javascript date constructor takes moths as 0...11
test('#toOntrailDateString', function() {
	assert.equal('11.2.1981', cs.toOntrailDateString(new Date(1981, 1, 11)));
});

test('#toOntrailDateString December', function() {
	assert.equal('11.12.1981', cs.toOntrailDateString(new Date(1981, 11, 11)));
});

function assertModelAction(data, expectation) {
	var mock = sinon.mock(OntrailModel);
	expectation(mock);
	cs.Prefiller(mock.object)(data);
	mock.verify();
}

test('#Prefill duration', function() {
	assertModelAction({
		duration : '00:40:10.101'
	}, function(mock) {
		mock.expects('fillDuration').once().withArgs('00:40:10');
	});
});

function assertDistanceFormat(expected, data) {
	assertModelAction({
		distance : data
	}, function(mock) {
		mock.expects('fillDistance').once().withArgs(expected);
	});
}

test('#prefill distance', function() {
	assertDistanceFormat('10,00 km', '10001');
});

test('#prefill distance even value', function() {
	assertDistanceFormat('9,00 km', '9000');
});

test('#prefill distance rounding up', function() {
	assertDistanceFormat('1,01 km', '1006');
});

test('#prefill distance rounding up to full kilometers', function() {
	assertDistanceFormat('1,00 km', '999');
});

test('#prefill distance sub kilometer distances', function() {
	assertDistanceFormat('0,50 km', '499');
});

test('#prefill heart rate', function() {
	assertModelAction({
		avgheartrate : '100'
	}, function(model) {
		model.expects('fillHeartRate').once().withArgs('100');
	})
});