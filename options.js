document.addEventListener("DOMContentLoaded", function() {
    var darkModeCheckbox = document.getElementById("dark-mode");
    var recordSwipesCheckbox = document.getElementById("record-swipes");
    var recordClicksCheckbox = document.getElementById("record-clicks");
    var saveButton = document.getElementById("save-button");
    
    chrome.storage.local.get(["darkMode", "recordSwipes", "recordClicks"], function(result) {
      darkModeCheckbox.checked = result.darkMode;
      recordSwipesCheckbox.checked = result.recordSwipes;
      recordClicksCheckbox.checked = result.recordClicks;
    });
    
    saveButton.addEventListener("click", function() {
      chrome.storage.local.set({
        darkMode: darkModeCheckbox.checked,
        recordSwipes: recordSwipesCheckbox.checked,
        recordClicks: recordClicksCheckbox.checked
      });
    });
  });