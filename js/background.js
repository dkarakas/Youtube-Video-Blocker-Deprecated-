getSettings(function(settings) {
  if (settings.enableicon === true) {
    browser.browserAction.enable();
  } else {
    browser.browserAction.disable();
  }
  browser.contextMenus.removeAll(function() {
    if (settings.password === '')
      createContextMenu();
  });
});
browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch (message.name) {
    case 'pageActionLoaded':
      getSettings(function(settings) {
        if (settings.enableicon === true) {
          browser.browserAction.enable();
        } else {
          browser.browserAction.disable();
        }
        browser.contextMenus.removeAll(function() {
          if (settings.password === '')
            createContextMenu();
        });
      });
      break;
    case 'settingsUpdated':
      getSettings(function(settings) {
        if (settings.enableicon === true) {
          browser.browserAction.enable();
        } else {
          browser.browserAction.disable();
        }
        browser.contextMenus.removeAll(function() {
          if (settings.password === '')
            createContextMenu();
        });
      });
      break;
    case 'itemsUpdated':
      browser.tabs.executeScript(null, {
        code: 'hideVideos();'
      });
      break;
    case 'importItems':
      addItems(JSON.parse(message.data), sendResponse);
      break;
  }
  return true;
});

function createContextMenu() {
  browser.contextMenus.create({
    'id': 'video_blocker_context_menu',
    'title': browser.i18n.getMessage('cmBlockVideos'),
    'enabled': true,
    'contexts': [
      'link'
    ],
    'documentUrlPatterns': [
      '*://www.youtube.com/*'
    ],
    'targetUrlPatterns': [
      '*://*.youtube.com/watch*',
      '*://*.youtube.com/user/*',
      '*://*.youtube.com/channel/*'
    ]
  });
}
browser.contextMenus.onClicked.addListener(function(info, tab) {
  browser.tabs.sendMessage(tab.id, {
    'name': 'contextMenuClicked'
  });
});
//# sourceMappingURL=background.js.map
