var DATABASE_KEY="tag-hider";
function getDomElements(selector, all = false) {
  if (all === true) document.querySelectorAll(selector);
  return document.querySelector(selector);
}
function hideDomElement(element) {
  element?.classList.add("hide-tag-hider");
}
function showDomElement(element) {
  if (element?.classList?.contains("hide-tag-hider")) {
    element?.classList.remove("hide-tag-hider");
  }
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "hideRatingTag") {
    const ratingTag = getDomElements('[title="Difficulty"]');
    hideDomElement(ratingTag.parentElement);
    sendResponse("done..");
  } else if (request.type === "showRatingTag") {
    const ratingTag = getDomElements('[title="Difficulty"]');
    showDomElement(ratingTag.parentElement);
    sendResponse("done..");
  } else if (request.type === "hideProblemTags") {
    const problemTags = Array.from(
      document.getElementsByClassName("tag-box")
    ).filter((ratingTag) => ratingTag.getAttribute("title") !== "Difficulty");
    problemTags.forEach((problemTag) => {
      hideDomElement(problemTag.parentElement);
    });
  } else if (request.type === "showProblemTags") {
    const problemTags = Array.from(
      document.getElementsByClassName("tag-box")
    ).filter((ratingTag) => ratingTag.getAttribute("title") !== "Difficulty");
    problemTags.forEach((problemTag) => {
      showDomElement(problemTag.parentElement);
    });
  }
  return true;
});
(() => {
  chrome.runtime.sendMessage(
    { type: "GET_DATA", key: DATABASE_KEY },
    ([hideProblemTag, hideRatingTag]) => {
      if (hideProblemTag) {
        const problemTags = Array.from(
          document.getElementsByClassName("tag-box")
        ).filter(
          (ratingTag) => ratingTag.getAttribute("title") !== "Difficulty"
        );
        problemTags.forEach((problemTag) => {
          hideDomElement(problemTag.parentElement);
        });
      }
      if (hideRatingTag) {
        const ratingTag = getDomElements('[title="Difficulty"]');
        hideDomElement(ratingTag.parentElement);
      }
    }
  );
})();
