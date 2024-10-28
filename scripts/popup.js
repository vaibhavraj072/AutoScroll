let isScrolling = false;
const toggle = document.getElementById("toggle");
const status = document.getElementById("status");
const speedInput = document.getElementById("speed");

// Initialize state from storage
chrome.storage.local.get(["isScrolling", "speed"], (result) => {
    isScrolling = result.isScrolling || false;
    updateButtonState();
    speedInput.value = result.speed || 3;
});

// Toggle button click handler
toggle.addEventListener("click", async () => {
    isScrolling = !isScrolling;
    updateButtonState();
    
    // Save state
    await chrome.storage.local.set({ 
        isScrolling: isScrolling,
        speed: parseInt(speedInput.value)
    });

    // Send message to content script
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url.includes("youtube.com")) {
        chrome.tabs.sendMessage(tab.id, {
            command: "toggleScroll",
            isScrolling: isScrolling,
            speed: parseInt(speedInput.value)
        });
    }
});

// Speed input handler
speedInput.addEventListener("change", async () => {
    if (speedInput.value < 1) speedInput.value = 1;
    if (speedInput.value > 10) speedInput.value = 10;
    
    await chrome.storage.local.set({ speed: parseInt(speedInput.value) });
    
    if (isScrolling) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab && tab.url.includes("youtube.com")) {
            chrome.tabs.sendMessage(tab.id, {
                command: "updateSpeed",
                speed: parseInt(speedInput.value)
            });
        }
    }
});

function updateButtonState() {
    if (isScrolling) {
        toggle.textContent = "Stop";
        toggle.classList.add("active");
        status.textContent = "Status: Running";
    } else {
        toggle.textContent = "Start";
        toggle.classList.remove("active");
        status.textContent = "Status: Stopped";
    }
}