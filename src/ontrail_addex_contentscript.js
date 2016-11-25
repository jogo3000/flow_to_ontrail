OntrailModel = require('./ontrailmodel.js');

module.exports = {
	Prefiller : Prefiller
};

function toOntrailDateString(d) {
	return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
}

function Prefiller(model) {
	return function(data, sender, sendResponse) {
		if (data.duration) {
			// duration has millisecond precision
			model.fillDuration(data.duration.split('.', 1)[0]);
		}
		if (data.distance) {
			var s = parseFloat(data.distance) / 1000;
			model.fillDistance(s.toFixed(2).replace('.', ',') + ' km');
		}
		if (data.avgheartrate) {
			model.fillHeartRate(data.avgheartrate);
		}
		if (data.timestamp) {
			var d = new Date(data.timestamp);
			model.fillDate(toOntrailDateString(d));
		}
		if (data.extype) {
			var sport = (data.extype in model.TRANSLATIONS) ? model.TRANSLATIONS[data.extype]
					: data.extype;
			model.fillSportSelector(sport);
		}
	};
}

chrome.runtime.onMessage.addListener(Prefiller(OntrailModel));
