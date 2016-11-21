module.exports = {
	trim : trim,
	parseFlowDate : parseFlowDate
};

// http://stackoverflow.com/questions/1418050/string-strip-for-javascript
function trim(s) {
	return s.replace(/^\s+|\s+$/g, '');
}

// javascript Date format months start from zero
const
MONTHS = {
	'Tammi' : 0,
	'Helmi' : 1,
	'Maalis' : 2,
	'Huhti' : 3,
	'Touko' : 4,
	'Kesä' : 5,
	'Heinä' : 6,
	'Elo' : 7,
	'Syys' : 8,
	'Loka' : 9,
	'Marras' : 10,
	'Joulu' : 11
};

function parseFlowDate(s) {
	// s looks like this Lauantai, Marras 19, 2016 06:50 | Polar v800
	var sx = s.split(' | ')[0]; // strip device name
	sx = trim(sx);
	var sa = sx.split(', '); // ['Lauantai', 'Marras 19, '2016 06:50']
	var yearAndTime = sa[2].split(' ');
	var year = parseInt(yearAndTime[0]);
	var month_day = sa[1].split(' ');
	var month = MONTHS[month_day[0]];
	var day = parseInt(month_day[1]);

	var time = yearAndTime[1].split(':');

	return new Date(2016, month, day, time[0], time[1]);
}

function readValues(data, sender, sendResponse) {
	response = {
		duration : document.getElementById('preciseDuration').getAttribute(
				'value'),
		distance : document.getElementById('preciseDistanceStr').getAttribute(
				'value'),
		avgheartrate : document.getElementById('BDPHrAvg').innerText,
		extype : trim(document.getElementById('sport-icon-image').getAttribute(
				'title')),
		timestamp : parseFlowDate(
				document.querySelector('#sportHeading > br').nextSibling.textContent)
				.toJSON()

	};
	sendResponse(response);
}

chrome.runtime.onMessage.addListener(readValues);