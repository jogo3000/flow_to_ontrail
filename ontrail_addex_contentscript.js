/**
 * 
 */

function prefillValues(request, sender, sendResponse) {
	console.log(request);
	document.getElementById('ex-duration').value = request.duration;
	document.getElementById('ex-distance').value = request.distance;
}

chrome.runtime.onMessage.addListener(prefillValues);