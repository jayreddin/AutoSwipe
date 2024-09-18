document.addEventListener("DOMContentLoaded", function() {
    var websiteSelect = document.getElementById("website-select");
    var startButton = document.getElementById("start-button");
    var settingsButton = document.getElementById("settings-button");
    var recordButton = document.getElementById("record-button");
    
    startButton.addEventListener("click", function() {
      var selectedWebsite = websiteSelect.value;
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.update(tabs[0].id, { url: selectedWebsite });
      });
    });
    
    settingsButton.addEventListener("click", function() {
      chrome.runtime.openOptionsPage();
    });
    
    recordButton.addEventListener("click", function() {
      chrome.runtime.sendMessage({ action: "recordGesture" });
    });
  });