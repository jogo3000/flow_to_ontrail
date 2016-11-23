model = require('./ontrailmodel.js').OntrailModel;

module.exports = {
	formatDistance : formatDistance,
	toOntrailDateString : toOntrailDateString,
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

function prefillValues(request, sender, sendResponse) {
	// duration has millisecond precision
	fillvalue('ex-duration', request.duration.split('.', 1)[0]);
	fillvalue('ex-distance', formatDistance(request.distance));
	fillvalue('ex-avghr', request.avgheartrate);
	fillvalue('ex-date', toOntrailDateString(new Date(request.timestamp)));

	// sport selector is a bit more tricky
	selector = document.querySelector('#ex-sport');
	for (var i = 0; i < selector.options.length; i++) {
		selector.options[i].selected = selector.options[i].value === request.extype;
	}
	selector.dispatchEvent(new Event('change'));
}

function Prefiller(model) {
	return function(data) {
		if (data.duration)
			model.fillDuration(data.duration.split('.', 1)[0]);
		if (data.distance) {
			model.fillDistance(formatDistance(data.distance));
		}
	};
}

chrome.runtime.onMessage.addListener(prefillValues);
