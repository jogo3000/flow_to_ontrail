OntrailModel = require('./ontrailmodel.js');

module.exports = {
    Prefiller : Prefiller
};

function toOntrailDateString(d) {
    return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
}

function toMozDateString(d) {
    return d.toISOString().split('T')[0];
}

const stripMilliseconds = (duration) => duration.split('.', 1)[0]; 

function Prefiller(model) {
    return function(data, sender, sendResponse) {
	if (data.duration) {
	    // duration has millisecond precision
	    model.fillDuration(stripMilliseconds(data.duration));
	}
	if (data.distance) {
	    const s = parseFloat(data.distance) / 1000;
	    model.fillDistance(s.toFixed(2).replace('.', ',') + ' km');
	}
	if (data.avgheartrate) {
	    model.fillHeartRate(data.avgheartrate);
	}
	if (data.timestamp) {
	    const date = new Date(data.timestamp);
	    const ontrailDateString = toOntrailDateString(date);
	    
	    model.fillDate(ontrailDateString);
	    const valueOnPage = model.readDate();
	    if (valueOnPage !== ontrailDateString) {
		console.log("Wasn't able to prefill date, trying another format");
		// Try another format
		const alternateFormat = toMozDateString(date);
		model.fillDate(alternateFormat);
	    }
	}
	if (data.extype) {
	    const sport = (data.extype in model.TRANSLATIONS) ? model.TRANSLATIONS[data.extype]
		  : data.extype;
	    model.fillSportSelector(sport);
	}
	if (data.ascent) {
	    model.fillAscent(data.ascent);
	}
    };
}

browser.runtime.onMessage.addListener(Prefiller(OntrailModel));
