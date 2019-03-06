//const browser = window.chrome || window.browser;

browser.runtime.onInstalled.addListener(() => {
  browser.declarativeContent.onPageChanged.removeRules(undefined, () => {
    browser.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: "flow.polar.com",
              schemes: ["https"],
              pathContains: "training/analysis"
            }
          }),
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: "ontrail.net",
              schemes: ["http"],
              pathContains: "#addex"
            }
          })
        ],
        actions: [new browser.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

const prefillOntrail = () => {
  let data = {};

  // Read data from flow.polar.com
  browser.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {
      browser.tabs.sendMessage(tabs[0].id, {}, {}, response => {
        data = response;
      });
    }
  );

  // Open a new tab and inject content script
  browser.tabs
    .create({
      url: "http://beta.ontrail.net/#addex"
    })
    .then(() => {
      browser.tabs.executeScript(
        null,
        {
          file: "ontrail_addex_contentscript.js"
        },
        () => {
          // Message content script to prefill data
          browser.tabs.query(
            {
              active: true,
              currentWindow: true,
            },
            tabs => {
              browser.tabs.sendMessage(tabs[0].id, data, null, null);
            },
          );
        }
      );
    });
};

browser.pageAction.onClicked.addListener(prefillOntrail);
