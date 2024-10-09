document.addEventListener("DOMContentLoaded", () => {
    const pauseButton = document.getElementById("pause-button");
    const playButton = document.getElementById("play-button");
  
    pauseButton.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "pause" });
    });
  
    playButton.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "play" });
    });
  });