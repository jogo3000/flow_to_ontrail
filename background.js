chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
	chrome.declarativeContent.onPageChanged.addRules([
	    {
		conditions: [ new chrome.declarativeContent.PageStateMatcher({
		    pageUrl: { 
			hostEquals: 'flow.polar.com', 
			schemes: ['https'],
			pathContains: 'training/analysis'
		    }
		    })
			    ],
		actions: [ new chrome.declarativeContent.ShowPageAction() ]
	    }]);
    });
});

prefillOntrail = function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
	    console.log(response.duration);
	});
    });    
    chrome.runtime.sendMessage({'action': 'readData'}, function() {});
//    chrome.tabs.create({
//	'url': 'http://ontrail.net/#addex'
//    });
};

chrome.pageAction.onClicked.addListener(prefillOntrail);

