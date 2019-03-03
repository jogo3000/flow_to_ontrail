browser.runtime.onInstalled.addListener(function() {
    browser.declarativeContent.onPageChanged.removeRules(undefined, function() {
	browser.declarativeContent.onPageChanged.addRules([ {
	    conditions : [ new browser.declarativeContent.PageStateMatcher({
		pageUrl : {
		    hostEquals : 'flow.polar.com',
		    schemes : [ 'https' ],
		    pathContains : 'training/analysis'
		}
	    }), new browser.declarativeContent.PageStateMatcher({
		pageUrl : {
		    hostEquals : 'ontrail.net',
		    schemes : [ 'http' ],
		    pathContains : '#addex'
		}
	    }) ],
	    actions : [ new browser.declarativeContent.ShowPageAction() ]
	} ]);
    });
});

prefillOntrail = function() {

    let data = {};

    // Read data from flow.polar.com
    browser.tabs.query({
	active : true,
	currentWindow : true
    }, function(tabs) {
	browser.tabs.sendMessage(tabs[0].id, {}, {}, function(response) {
	    data = response;
	});
    });

    // Open a new tab and inject content script
    browser.tabs.create({
	'url' : 'http://beta.ontrail.net/#addex'
    });

    browser.tabs.executeScript(null, {
	file : "ontrail_addex_contentscript.js"
    }, function() {
	// Message content script to prefill data
	browser.tabs.query({
	    active : true,
	    currentWindow : true
	}, function(tabs) {
	    browser.tabs.sendMessage(tabs[0].id, data, null, null);
	});
    });

};

browser.pageAction.onClicked.addListener(prefillOntrail);
