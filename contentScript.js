var recording = false;
var recordedGestures = {};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "recordGesture") {
    recording = true;
    var website = request.website;
    recordedGestures[website] = null;
    document.addEventListener("mousedown", function(event) {
      recordedGestures[website] = {
        type: "mousedown",
        clientX: event.clientX,
        clientY: event.clientY
      };
    });
    document.addEventListener("mouseup", function(event) {
      recordedGestures[website] = {
        type: "mouseup",
        clientX: event.clientX,
        clientY: event.clientY
      };
    });
    document.addEventListener("mousemove", function(event) {
      if (recordedGestures[website]) {
        recordedGestures[website].clientX = event.clientX;
        recordedGestures[website].clientY = event.clientY;
      }
    });
  }
});

// Auto swipe
function autoSwipe(website) {
  if (recordedGestures[website]) {
    var element = document.querySelector('div.swipeable');
    var event = new MouseEvent(recordedGestures[website].type, {
      bubbles: true,
      cancelable: true,
      view: window,
      button: 0,
      buttons: 1,
      clientX: recordedGestures[website].clientX,
      clientY: recordedGestures[website].clientY
    });
    element.dispatchEvent(event);
  }
}

// Auto click
function autoClick(website) {
  if (recordedGestures[website]) {
    var element = document.querySelector('button.clickable');
    var event = new MouseEvent(recordedGestures[website].type, {
      bubbles: true,
      cancelable: true,
      view: window,
      button: 0,
      buttons: 1,
      clientX: recordedGestures[website].clientX,
      clientY: recordedGestures[website].clientY
    });
    element.dispatchEvent(event);
  }
}

// Run the auto swipe and click functions
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "start") {
    var website = request.website;
    autoSwipe(website);
    autoClick(website);
  }
});