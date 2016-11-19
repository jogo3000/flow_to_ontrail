function readValues(data, sender, sendResponse) {
	response = {
			duration: document.getElementById('preciseDuration').getAttribute('value'),
			distance: document.getElementById('preciseDistanceStr').getAttribute('value')
	};
	sendResponse(response);
}

chrome.runtime.onMessage.addListener(readValues);