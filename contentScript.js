var recording = false;
var recordedGesture = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "recordGesture") {
    recording = true;
    document.addEventListener("mousedown", function(event) {
      recordedGesture = {
        type: "mousedown",
        clientX: event.clientX,
        clientY: event.clientY
      };
    });
    document.addEventListener("mouseup", function(event) {
      recordedGesture = {
        type: "mouseup",
        clientX: event.clientX,
        clientY: event.clientY
      };
    });
    document.addEventListener("mousemove", function(event) {
      if (recordedGesture) {
        recordedGesture.clientX = event.clientX;
        recordedGesture.clientY = event.clientY;
      }
    });
  }
});

// Auto swipe
function autoSwipe() {
  if (recordedGesture) {
    var element = document.querySelector('div.swipeable');
    var event = new MouseEvent(recordedGesture.type, {
      bubbles: true,
      cancelable: true,
      view: window,
      button: 0,
      buttons: 1,
      clientX: recordedGesture.clientX,
      clientY: recordedGesture.clientY
    });
    element.dispatchEvent(event);
  }
}

// Auto click
function autoClick() {
  if (recordedGesture) {
    var element = document.querySelector('button.clickable');
    var event = new MouseEvent(recordedGesture.type, {
      bubbles: true,
      cancelable: true,
      view: window,
      button: 0,
      buttons: 1,
      clientX: recordedGesture.clientX,
      clientY: recordedGesture.clientY
    });
    element.dispatchEvent(event);
  }
}

// Run the auto swipe and click functions
autoSwipe();
autoClick();