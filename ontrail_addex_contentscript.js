/**
 * 
 */
function prefillValues(request, sender, sendResponse) {
	console.log(request);
	document.getElementById('ex-duration').value = request.duration.split('.', 1)[0]; // duration has millisecond precision
	document.querySelector('#ex-duration').dispatchEvent(new KeyboardEvent('keyup'));	// trigger validation
	document.getElementById('ex-distance').value = request.distance;
}

chrome.runtime.onMessage.addListener(prefillValues);