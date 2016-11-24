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

function Prefiller(model) {
	return function(data, sender, sendResponse) {
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
		if (data.extype) {
			var sport = (data.extype in model.TRANSLATIONS) ? model.TRANSLATIONS[data.extype]
					: data.extype;
			model.fillSportSelector(sport);
		}
	};
}

chrome.runtime.onMessage.addListener(Prefiller(OntrailModel));
