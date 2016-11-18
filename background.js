chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
	chrome.declarativeContent.onPageChanged.addRules([
	    {
		conditions: [ new chrome.declarativeContent.PageStateMatcher({
		    pageUrl: { hostEquals: 'flow.polar.com', schemes: ['https'] }
		    ,})
			    ],
		actions: [ new chrome.declarativeContent.ShowPageAction() ]
	    }])
    })
})

chrome.pageAction.onClicked.addListener(function (){alert("Triggered action")})
