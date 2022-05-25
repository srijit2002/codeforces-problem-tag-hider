var DATABASE_KEY="tag-hider";
const problemTagHiderButon = document.getElementById("problemTagHider");
const ratingTagHiderButon = document.getElementById("ratingTagHider");
function sendMessageToContentScript(messageType) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: messageType });
  });
}
function sendMessageToBackgroundScript(type, key, value) {
  chrome.runtime.sendMessage({ type, key, value });
}
problemTagHiderButon.addEventListener("change", (e) => {
  if (e.target.checked) {
    console.log("sent");
    sendMessageToContentScript("hideProblemTags");
  } else {
    sendMessageToContentScript("showProblemTags");
  }
  sendMessageToBackgroundScript("SET_DATA", DATABASE_KEY, [
    problemTagHiderButon.checked,
    ratingTagHiderButon.checked,
  ]);
});
ratingTagHiderButon.addEventListener("change", (e) => {
  console.log("activated");
  if (e.target.checked) {
    sendMessageToContentScript("hideRatingTag");
  } else {
    sendMessageToContentScript("showRatingTag");
  }
  sendMessageToBackgroundScript("SET_DATA", DATABASE_KEY, [
    problemTagHiderButon.checked,
    ratingTagHiderButon.checked,
  ]);
});
(function checkChekBoxesOnStart(){
  chrome.runtime.sendMessage(
    { type: "GET_DATA", key: DATABASE_KEY },
    ([hideProblemTag, hideRatingTag]) => {
      if (hideProblemTag) {
        problemTagHiderButon.checked=true;
      }
      if (hideRatingTag) {
       ratingTagHiderButon.checked=true;
      }
    })
})();

