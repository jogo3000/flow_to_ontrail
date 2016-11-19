/**
 * 
 */
function fillvalue(id, value)
{	
	element = document.querySelector('#' + id);
	element.value = value;
	element.dispatchEvent(new KeyboardEvent('keyup')); // trigger validation
}

function prefillValues(request, sender, sendResponse) {
	fillvalue('ex-duration', request.duration.split('.', 1)[0]);  // duration has millisecond precision
	fillvalue('ex-distance', request.distance);
	fillvalue('ex-avghr', request.avgheartrate);
}

chrome.runtime.onMessage.addListener(prefillValues);