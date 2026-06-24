chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "fillTheForms",
    title: "Fill the Forms",
    contexts: ["page", "editable", "frame"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "fillTheForms" || !tab?.id) return;

  chrome.tabs.sendMessage(tab.id, { action: "fillForms" }, (response) => {
    if (chrome.runtime.lastError) {
      // Content script not ready yet — inject it on the fly
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ["content.js"]
        },
        () => {
          chrome.tabs.sendMessage(tab.id, { action: "fillForms" });
        }
      );
    }
  });
});
