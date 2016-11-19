function readValues(data, sender, sendResponse) {
	response = {
			duration: document.getElementById('preciseDuration').getAttribute('value'),
			distance: document.getElementById('preciseDistanceStr').getAttribute('value'),
			avgheartrate: document.getElementById('BDPHrAvg').innerText
	};
	sendResponse(response);
}

chrome.runtime.onMessage.addListener(readValues);