document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const statusText = document.getElementById('statusText');

    // Function to update the status display
    function updateStatus(enabled) {
        statusText.textContent = `Status: ${enabled ? 'Enabled' : 'Disabled'}`;
        statusText.className = `status ${enabled ? 'enabled' : 'disabled'}`;
        
        // Update the toggle switch state
        toggleSwitch.checked = enabled;
        
        // Save the state
        chrome.storage.sync.set({ autoScrollEnabled: enabled });
    }

    // Initialize toggle state from storage
    chrome.storage.sync.get('autoScrollEnabled', (data) => {
        updateStatus(data.autoScrollEnabled || false);
    });

    // Handle toggle changes
    toggleSwitch.addEventListener('change', () => {
        const isEnabled = toggleSwitch.checked;
        updateStatus(isEnabled);

        // Get current active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0].url.includes('youtube.com')) {
                // Send message to content script
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'toggleAutoScroll',
                    enabled: isEnabled
                });
                
                // Reload the tab
                chrome.tabs.reload(tabs[0].id);
            }
        });
    });
});

// content.js
let scrollInterval = null;
const SCROLL_INTERVAL = 5000; // 5 seconds

function startAutoScroll() {
    if (!scrollInterval) {
        scrollInterval = setInterval(() => {
            window.scrollBy(0, window.innerHeight);
        }, SCROLL_INTERVAL);
        console.log('Auto-scroll started');
    }
}

function stopAutoScroll() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
        console.log('Auto-scroll stopped');
    }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleAutoScroll') {
        if (request.enabled) {
            startAutoScroll();
        } else {
            stopAutoScroll();
        }
    }
});

// Check initial state when page loads
chrome.storage.sync.get('autoScrollEnabled', (data) => {
    if (data.autoScrollEnabled) {
        startAutoScroll();
    }
});