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
	'Joulu' : 11,
	'Jan' : 0,
	'Feb' : 1,
	'Mar' : 2,
	'Apr' : 3,
	'May' : 4,
	'Jun' : 5,
	'Jul' : 6,
	'Aug' : 7,
	'Sep' : 8,
	'Oct' : 9,
	'Nov' : 10,
	'Dec' : 11
};

/**
 * In flow Finnish site s looks like this Lauantai, Marras 19, 2016 06:50 |
 * Polar v800
 * 
 * @param s
 *            date string
 * @returns {Date}
 */
function parseFlowDate(s) {
	var sa = s.trim().replace(/[\,:\|]/g, ' ').replace(/\s+/g, ' ').split(' ');
	var year = parseInt(sa[3]);
	var month = MONTHS[sa[1]];
	var day = parseInt(sa[2]);
	var hour = parseInt(sa[4]);
	var minute = parseInt(sa[5]);

	return new Date(year, month, day, hour, minute);
}

function readAscent() {
	var node = document
			.querySelector('#trainingDetailsContainerBox > div > div.col-md-8.col-md-push-4.exercise-statistics-wrapper > fieldset > div > div > aside.col-md-4.col-sm-4.col-xs-12.clearfix.ASCENT > div.basic-data-panel__value > span.basic-data-panel__value-container');
	return node ? node.textContent : '';
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
				.toJSON(),
		ascent : readAscent()

	};
	sendResponse(response);
}

chrome.runtime.onMessage.addListener(readValues);