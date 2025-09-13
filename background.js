const SCIHUB_URL = [
  "https://sci-hub.se/",
  "https://sci-hub.st/",
  "https://sci-hub.ru/",
  "https://sci-hub.ee/",
  "https://sci-hub.is/",
  "https://sci-hub.shop/",
  "https://sci-hub.wf/",
  "https://www.sci-hub.red/"
  ]
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: SCIHUB_URL });
});

// Optionally listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openSciHub" && message.doi) {
    chrome.tabs.create({ url: SCIHUB_URL + message.doi });
    return true;
  }
});
