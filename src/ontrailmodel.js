module.exports = {
	fillTextValue : function(id, value) {
		element = document.querySelector('#' + id);
		element.value = value;
		element.dispatchEvent(new KeyboardEvent('keyup')); // trigger
		// validation
		element.previousElementSibling.classList = [ 'active' ]; // beta.ontrail.net
	},
	fillDuration : function(t) {
		this.fillTextValue('ex-duration', t);
	},
	fillDistance : function(s) {
		this.fillTextValue('ex-distance', s);
	},
	fillHeartRate : function(hr) {
		this.fillTextValue('ex-avghr', hr);
	},
	fillDate : function(date) {
		this.fillTextValue('ex-avghr', date);
	},
	fillSportSelector : function(sport) {
		selector = document.querySelector('#ex-sport');
		for (var i = 0; i < selector.options.length; i++) {
			selector.options[i].selected = selector.options[i].value === sport;
		}
		selector.dispatchEvent(new Event('change'));
	}
};
