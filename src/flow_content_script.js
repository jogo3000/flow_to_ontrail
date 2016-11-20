module.exports = {
	trim : trim,
	parseFlowDate : parseFlowDate
};

// http://stackoverflow.com/questions/1418050/string-strip-for-javascript
function trim(s) {
	return s.replace(/^\s+|\s+$/g, '');
};

const MONTHS = {
		'Tammi': 1,
		'Helmi': 2,
		'Maalis': 3,
		'Huhti': 4,
		'Touko': 5,
		'Kesä': 6,
		'Heinä': 7,
		'Elo': 8,
		'Syys': 9,
		'Loka': 10,
		'Marras': 11,
		'Joulu': 12}

function parseFlowDate(s) {
	// s looks like this Lauantai, Marras 19, 2016 06:50 | Polar v800
	var sx = s.split(' | ')[0] // strip device name
	sx = trim(sx);
	var sa = sx.split(', '); // ['Lauantai', 'Marras 19, '2016 06:50']
	var year = parseInt(sa[2].split(' ')[0]);
	var month_day=sa[1].split(' ');
	var month = MONTHS[month_day[0]];
	var day = parseInt(month_day[1]);
	return new Date(2016, month, day);
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
		timestamp: parseFlowDate(document.querySelector('#sportHeading > br').nextSibling.textContent).toJSON()
				
	};
	sendResponse(response);
}

chrome.runtime.onMessage.addListener(readValues);