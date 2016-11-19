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
	selector = document.querySelector('#ex-sport')
	for (var i = 0; i < selector.options.length; i++) {
		selector.options[i].selected = selector.options[i].value === request.extype;
	}
	selector.dispatchEvent(new Event('change'));
}

chrome.runtime.onMessage.addListener(prefillValues);