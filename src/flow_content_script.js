module.exports = { trim: trim };

// http://stackoverflow.com/questions/1418050/string-strip-for-javascript
function trim(s) {
	return s.replace(/^\s+|\s+$/g, '');
}

function readValues(data, sender, sendResponse) {
	response = {
			duration: document.getElementById('preciseDuration').getAttribute('value'),
			distance: document.getElementById('preciseDistanceStr').getAttribute('value'),
			avgheartrate: document.getElementById('BDPHrAvg').innerText,
			extype: trim(document.getElementById('sport-icon-image').getAttribute('title'))
	};
	sendResponse(response);
}

chrome.runtime.onMessage.addListener(readValues);