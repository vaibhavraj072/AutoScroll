const toggle = document.getElementById('toggle');
const status = document.getElementById('status');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('on');
    const isOn = toggle.classList.contains('on');

    // Update status text
    status.textContent = isOn ? "ON" : "OFF";

    // Send message to content script to start/stop scrolling
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "toggleScrolling" }, (response) => {
            console.log("Scrolling status:", response.isScrolling);
        });
    });
});
