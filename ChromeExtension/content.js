// content.js

// Function to send a message to the background script with the current URL
function trackTimeOnPage() {
    // Get the current URL of the active tab
    const currentUrl = window.location.href;

    // Prepare the message payload
    const payload = {
        type: 'TRACK_URL',
        url: currentUrl,
        timestamp: Date.now() // Capture the current timestamp
    };

    // Send the message to the background script
    chrome.runtime.sendMessage(payload, (response) => {
        if (chrome.runtime.lastError) {
            console.error('Error communicating with background script:', chrome.runtime.lastError);
        } else {
            console.log('Tracking data sent to background script:', response);
        }
    });
}

// Event listener for page load
window.addEventListener('load', () => {
    console.log('Content script loaded for', window.location.href);
    trackTimeOnPage();
});

// Event listener for page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        console.log('Tab became inactive:', window.location.href);
    } else if (document.visibilityState === 'visible') {
        console.log('Tab became active:', window.location.href);
        trackTimeOnPage();
    }
});
