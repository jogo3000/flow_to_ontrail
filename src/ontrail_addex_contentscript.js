/**
 * 
 */

module.exports = {
		round: round,
		toOntrailDateString: toOntrailDateString
};


function round(v) {
	var i = Math.round(parseFloat(v) / 10) * 10;
	return i;
};

function toOntrailDateString(d) {
	return d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear();
}

function fillvalue(id, value)
{	
	element = document.querySelector('#' + id);
	element.value = value;
	element.dispatchEvent(new KeyboardEvent('keyup')); // trigger validation
	element.previousElementSibling.classList = ['active'] // beta.ontrail.net
}

function prefillValues(request, sender, sendResponse) {
	fillvalue('ex-duration', request.duration.split('.', 1)[0]);  // duration has millisecond precision
	fillvalue('ex-distance', round(request.distance));
	fillvalue('ex-avghr', request.avgheartrate);
	fillvalue('ex-date', toOntrailDateString(new Date(request.timestamp)))
	
	// sport selector is a bit more tricky
	selector = document.querySelector('#ex-sport');
	for (var i = 0; i < selector.options.length; i++) {
		selector.options[i].selected = selector.options[i].value === request.extype;
	}
	selector.dispatchEvent(new Event('change'));
}

chrome.runtime.onMessage.addListener(prefillValues);