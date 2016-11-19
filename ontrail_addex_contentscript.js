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
	
	// sport selector is a bit more tricky
	selector = document.querySelector('#s2id_ex-sport > a > span').innerText = request.extype;
}

chrome.runtime.onMessage.addListener(prefillValues);