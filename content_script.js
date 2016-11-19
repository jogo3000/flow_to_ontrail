chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	duration = document.getElementById('preciseDuration').getAttribute('value');
	sendResponse({'duration': duration});
    }
);

    //*[@id="bdForm"]/div/div[1]/div/div/div/div[1]/div/div[1]/span[1]
    //*[@id="preciseDuration"]
//duration = document.getElementById('preciseDuration');


