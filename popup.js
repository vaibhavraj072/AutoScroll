// document.addEventListener('DOMContentLoaded', () => {
//   const autoScrollToggle = document.getElementById('autoScrollToggle');

//   chrome.storage.sync.get('autoScrollEnabled', (data) => {
// 	autoScrollToggle.checked = data.autoScrollEnabled;
//   });

//   autoScrollToggle.addEventListener('change', () => {
// 	const autoScrollEnabled = autoScrollToggle.checked;
// 	chrome.storage.sync.set({ autoScrollEnabled });
// 	chrome.runtime.sendMessage({ action: 'setAutoScrollStatus', autoScrollEnabled });
//   });
// });