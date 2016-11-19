chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([ {
			conditions : [ new chrome.declarativeContent.PageStateMatcher({
				pageUrl : {
					hostEquals : 'flow.polar.com',
					schemes : [ 'https' ],
					pathContains : 'training/analysis'
				}
			}), new chrome.declarativeContent.PageStateMatcher({
				pageUrl : {
					hostEquals : 'ontrail.net',
					schemes : [ 'http' ],
					pathContains : '#addex'
				}
			}) ],
			actions : [ new chrome.declarativeContent.ShowPageAction() ]
		} ]);
	});
});

prefillOntrail = function() {

	data = {};

	chrome.tabs.query({
		active : true,
		currentWindow : true
	}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {
			console.log(response.duration);
			console.log(response.distance);
		});
	});

	chrome.tabs.create({
		'url' : 'http://ontrail.net/#addex'
	});

	chrome.tabs.executeScript(null, {
		file : "ontrail_addex_contentscript.js"
	});
};

chrome.pageAction.onClicked.addListener(prefillOntrail);
