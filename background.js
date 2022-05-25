const URL = /^https:\/\/codeforces.com\/*/;
chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (currentTab) => {
    if (URL.test(currentTab.url)) {
      chrome.scripting.executeScript({
        target: { tabId: tab.tabId },
        files: ["./content-scripts/content-script.js"],
      });
      chrome.scripting.insertCSS({
        target: { tabId: tab.tabId },
        files: ["./content-scripts/content-css.css"],
      });
    }
  });
});
function getValueFromStorage(key, cb) {
  chrome.storage.sync.get([key],(result)=>{
    if (cb&&result) cb(JSON.parse(result[key]));
  });
}
function setValueToStorage(key, value) {
  chrome.storage.sync.set({ [key]: JSON.stringify(value)});
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
      if(request.type==="GET_DATA"){
        getValueFromStorage(request.key,sendResponse);
      }else if(request.type==="SET_DATA"){
        setValueToStorage(request.key,request.value);
      }
      return true;    
  }
);
