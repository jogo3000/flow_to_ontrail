OntrailModel = require('./ontrailmodel.js');

module.exports = {
	Prefiller : Prefiller
};

function formatDistance(v) {
	var i = parseFloat(v) / 1000;
	return i.toFixed(2).replace('.', ',') + ' km';
}

function toOntrailDateString(d) {
	return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
}

function fillvalue(id, value) {
	element = document.querySelector('#' + id);
	element.value = value;
	element.dispatchEvent(new KeyboardEvent('keyup')); // trigger validation
	element.previousElementSibling.classList = [ 'active' ]; // beta.ontrail.net
}

var prefiller = Prefiller(OntrailModel);

function prefillValues(request, sender, sendResponse) {
	prefiller(request);

	// sport selector is a bit more tricky
	selector = document.querySelector('#ex-sport');
	for (var i = 0; i < selector.options.length; i++) {
		selector.options[i].selected = selector.options[i].value === request.extype;
	}
	selector.dispatchEvent(new Event('change'));
}

function Prefiller(model) {
	return function(data) {
		if (data.duration) {
			// duration has millisecond precision
			model.fillDuration(data.duration.split('.', 1)[0]);
		}
		if (data.distance) {
			model.fillDistance(formatDistance(data.distance));
		}
		if (data.avgheartrate) {
			model.fillHeartRate(data.avgheartrate);
		}
		if (data.timestamp) {
			model.fillDate(toOntrailDateString(new Date(data.timestamp)));
		}
	};
}

chrome.runtime.onMessage.addListener(prefillValues);
