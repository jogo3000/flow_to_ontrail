module.exports = {
	formatDistance : formatDistance,
	toOntrailDateString : toOntrailDateString,
	prefiller : prefiller
};

function formatDistance(v) {
	var i = parseFloat(v) / 1000;
	return i.toFixed(2).replace('.', ',') + ' km';
}

function toOntrailDateString(d) {
	return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
}

function fillvalue(id, value) {
	element = document.querySelector('#' + id);
	element.value = value;
	element.dispatchEvent(new KeyboardEvent('keyup')); // trigger validation
	element.previousElementSibling.classList = [ 'active' ]; // beta.ontrail.net
}

/*
 * Usually found on #s2id_ex-tags > ul > li.select2-search-field > input
 */
function TagSelector(doc) {
	return function(selector, value) {
		var element = document.querySelector(selector);
		element.dispatchEvent(new Event('keydown'));
		element.value = value + ',';
		element.dispatchEvent(new Event('keyup'));
	};
}

function prefiller(tagSelector) {
	return function(date) {
		var orig = new Date(date.timestamp);
		var noon = new Date(date.timestamp);
		noon.setHours(12, 0, 0, 0);
		console.log([ orig, noon ]);
		tagSelector('#s2id_ex-tags > ul > li.select2-search-field > input',
				(orig < noon) ? 'aamu' : 'iltapäivä');
	};
}

function prefillValues(request, sender, sendResponse) {
	// duration has millisecond precision
	fillvalue('ex-duration', request.duration.split('.', 1)[0]);
	fillvalue('ex-distance', formatDistance(request.distance));
	fillvalue('ex-avghr', request.avgheartrate);
	fillvalue('ex-date', toOntrailDateString(new Date(request.timestamp)));

	// sport selector is a bit more tricky
	selector = document.querySelector('#ex-sport');
	for (var i = 0; i < selector.options.length; i++) {
		selector.options[i].selected = selector.options[i].value === request.extype;
	}
	selector.dispatchEvent(new Event('change'));
}

chrome.runtime.onMessage.addListener(prefillValues);