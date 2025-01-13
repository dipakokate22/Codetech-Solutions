let startTime = 0;
let currentWebsite = "";

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  trackTime(tab.url);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    trackTime(tab.url);
  }
});

function trackTime(url) {
  const domain = new URL(url).hostname;
  const now = Date.now();
  
  if (currentWebsite) {
    const duration = (now - startTime) / 1000; // in seconds
    sendToBackend(currentWebsite, duration);
  }
  startTime = now;
  currentWebsite = domain;
}

function sendToBackend(website, duration) {
  fetch("http://localhost:3000/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ website, duration }),
  });
}
