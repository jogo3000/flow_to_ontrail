function readValues(request, sender, sendResponse) {
	data.duration = document.getElementById('preciseDuration').getAttribute('value');
	data.distance = document.getElementById('preciseDistanceStr').getAttribute('value');
	sendResponse(data);
}

chrome.runtime.onMessage.addListener(readValues);