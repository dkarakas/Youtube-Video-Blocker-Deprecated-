var forbidden_page_opened = false;
var blockPage_timer = false;
setInterval(timer,1000);//timer increments
var containerList = [
    {//thumbnails of the homepage
  container: 'ytd-grid-video-renderer',
  channelname: 'yt-formatted-string > a',
  videotitle: 'a#video-title.yt-simple-endpoint.style-scope.ytd-grid-video-renderer'   },

  {//in home page of youtube when there one video takes up whole seciont
    container: 'ytd-video-renderer',
    channelname: 'yt-formatted-string > a',
    videotitle: 'div#title-wrapper.style-scope.ytd-video-renderer'
  },
  {//video title when you open a stand alone page of the video
    container: 'div#primary-inner',
    channelname: 'yt-formatted-string#owner-name',
    videotitle: 'h1 > yt-formatted-string'
  },
  {//videos in the search results
    container: 'ytd-video-renderer',
    channelname: 'yt-formatted-string#byline',
    videotitle: 'h3.title-and-badge.style-scope.ytd-video-renderer'
  },
  {//videos in the search results listed as latest
    container: 'ytd-shelf-renderer',
    channelname: 'h2.style-scope.ytd-shelf-renderer',
    videotitle: 'h2.style-scope.ytd-shelf-renderer'
  },
  {//videos in the search results listed as latest
    container: 'ytd-channel-renderer',
    channelname: 'h3#channel-title.style-scope.ytd-channel-renderer',
    videotitle: 'h3#channel-title.style-scope.ytd-channel-renderer'
  }  ,
  // {//videos in recommended to fix
  //   container: 'ytd-compact-video-renderer',
  //   channelname: 'yt-formatted-string > ytd-video-meta-block.compact.style-scope.ytd-compact-video-renderer.byline-separated',
  //   videotitle: 'h3.style-scope.ytd-compact-video-renderer'
  // }
  /*,
  {
    container: '.lohp-medium-shelf',
    channelname: '.content-uploader > a',yt-formatted-string > a
    videotitle: 'a.lohp-video-link'
  },
  {
    container: '.yt-shelf-grid-item',
    channelname: '.yt-lockup-byline .g-hovercard',
    videotitle: '.yt-lockup-title > a'
  },
  {
    container: '#results .item-section > li .yt-lockup-video',
    channelname: '.yt-lockup-byline > a',
    videotitle: '.yt-lockup-title > a'
  },
  {
    container: '#results .item-section > li .yt-lockup-channel',
    channelname: '.yt-lockup-title > a',
    videotitle: '.yt-lockup-title > a'
  },
  {
    container: '.expanded-shelf .expanded-shelf-content-item-wrapper',
    channelname: '.yt-lockup-byline .g-hovercard',
    videotitle: '.yt-lockup-title > a'
  },
  {
    container: '.video-list-item',
    channelname: 'a .attribution .g-hovercard',
    videotitle: 'a .title'
  },
  {
    container: '.playlist-videos-list > li',
    channelname: 'a .playlist-video-description > .video-uploader-byline > span',
    videotitle: 'a .playlist-video-description > h4'
  },
  {
    container: '.pl-video-table .pl-video',
    channelname: '.pl-video-owner > .g-hovercard',
    videotitle: '.pl-video-title > .pl-video-title-link'
  },
  {
    container: '.branded-page-related-channels-list > .branded-page-related-channels-item',
    channelname: '.yt-lockup-title > a',
    videotitle: '.yt-lockup-title > a'
  },
  {
    container: '.ytp-endscreen-content .ytp-videowall-still',
    channelname: '.ytp-videowall-still-info-author',
    videotitle: '.ytp-videowall-still-info-title'
  }*/
];
document.addEventListener('DOMContentLoaded', function(event) {
  chrome.runtime.sendMessage({ 'name': 'pageActionLoaded' });
  getSettings(function(storage) {
    if (storage.version.updated === true) {
      var container = document.createElement('div');
      container.classList.add('videoblocker-container');
      document.body.appendChild(container);
      var inner = document.createElement('div');
      inner.classList.add('videoblocker-inner');
      container.appendChild(inner);
      var content = document.createElement('div');
      content.classList.add('videoblocker-content');
      content.innerHTML = '' +
        '<h1><img src="' + chrome.extension.getURL("images/icons/icon32.png") + '" alt="__MSG_extName__"> <span>Journeys Youtube Video Blocker - Extension updated (1.0.2)</span></h1>' +
        '<hr>' +
        '<p>Journeys Youtube Video Blocker extension has been successfully updated. Below, I have listed the changes.</p>' +
        '<ul>' +
        '<li>Rename extension to Journeys Youtube Video Blocker</li>' +
        '</ul>' +
        '<p>More information can be found on the settings page under the \'Help\' section.</p>' +
        '<hr>' +
        '<p style="text-align:center; margin-bottom:0; font-weight:500;"><a id="videoblocker-closewindow" href="#">Close this window (until the next update)</a></p>';
      inner.appendChild(content);
      document.getElementById('videoblocker-closewindow').addEventListener('click', function(event) {
        document.querySelector('.videoblocker-container').remove();
        setSetting('version', { number: chrome.runtime.getManifest().version, updated: false, installed: false });
      }, false);
    }
    if (storage.version.installed === true) {
      var container = document.createElement('div');
      container.classList.add('videoblocker-container');
      document.body.appendChild(container);
      var inner = document.createElement('div');
      inner.classList.add('videoblocker-inner');
      container.appendChild(inner);
      var content = document.createElement('div');
      content.classList.add('videoblocker-content');
      content.innerHTML = '' +
        '<h1><img src="' + chrome.extension.getURL("images/icons/icon32.png") + '" alt="__MSG_extName__"> <span>Journeys Youtube Video Blocker - Extension installed</span></h1>' +
        '<hr>' +
        '<p>Journeys Youtube Video Blocker extension has been successfully installed. Below, I have listed the key features.</p>' +
        '<ul>' +
        '<li>Block videos from specific YouTube channels by adding them manually or via right click on a video thumbnail. *</li>' +
        '<li>Block videos on YouTube with specific keywords in the title</li>' +
        '<li>Set a password to prevent e.g. children to remove items from the \'blocked\' list. (The extension can still be removed without entering the password though.)</li>' +
        '<li>Export your blocked items and import them on a different computer.</li>' +
        '</ul>' +
        '<p>More information can be found on the settings page under the \'Help\' section.</p>' +
        '<hr>' +
        '<p style="text-align:center; margin-bottom:0; font-weight:500;"><a id="videoblocker-closewindow" href="#">Close this window (until the next update)</a></p>';
      inner.appendChild(content);
      document.getElementById('videoblocker-closewindow').addEventListener('click', function(event) {
        document.querySelector('.videoblocker-container').remove();
        setSetting('version', { number: chrome.runtime.getManifest().version, updated: false, installed: false });
      }, false);
    }
  });
  hideVideos();
  var mutationTarget = document.querySelector("ytd-app");
  var mutationObserver = new MutationObserver(function(mutations) {
    hideVideos();
  });
  var mutationConfig = {
    "childList": true,
    "subtree": true
  };
  mutationObserver.observe(mutationTarget, mutationConfig);
});

function hideVideos() {
  let pageChannelName = undefined;
  if (document.querySelector('yt-formatted-string#owner-name') !== null)
    pageChannelName = document.querySelector('yt-formatted-string#owner-name').textContent.trim();
  var pageVideoTitle = undefined;
  if (document.querySelector('h1 > yt-formatted-string') !== null)
    pageVideoTitle = document.querySelector('h1 > yt-formatted-string').textContent.trim();
  getItems(function(storage) {
    var items = storage;
    loop1: for (var i = 0; i < containerList.length; i++) {
      var containers = document.body.querySelectorAll(containerList[i].container);
      loop2: for (var j = 0; j < containers.length; j++) {
        // let test = containers[j].querySelector(containerList[i].videotitle).textContent.trim();
        // console.log('Title - ' + i + ' ' + test);
        // test = containers[j].querySelector(containerList[i].channelname).textContent.trim();
        // console.log('Channel - ' + i + ' '  + test);
        var videotitle = (typeof containerList[i].videotitle !== 'undefined' && containers[j].querySelector(containerList[i].videotitle) !== null) ? containers[j].querySelector(containerList[i].videotitle).textContent.trim() : '',
          channelname = (typeof containerList[i].channelname !== 'undefined' && containers[j].querySelector(containerList[i].channelname) !== null) ? containers[j].querySelector(containerList[i].channelname).textContent.trim() : '',
          block = false,
          blockPage = false;
        loop3: for (var k = 0; k < items.length; k++) {
          var key = items[k].key,
            type = items[k].type,
            regexpobj = key.match(/^\/(.+?)\/(.+)?/);
          if (regexpobj !== null) {
            try {
              var regexp = new RegExp(regexpobj[1], regexpobj[2]);
            } catch (e) {
              var regexp = undefined;
            }
          }
          switch (type) {
            case 'channel':
              if (regexpobj !== null) {
                if (pageChannelName && regexp && regexp.test(pageChannelName) === true) {
                  blockPage = true;
                  forbidden_page_opened = true;
                }else if (regexp && regexp.test(channelname) === true) {
                  block = true;
                  forbidden_page_opened = false;
                }
                } else {
                if (pageChannelName && pageChannelName === key) {
                  blockPage = true;
                  forbidden_page_opened = true;
                }else if (channelname === key) {
                  block = true;
                  forbidden_page_opened = false;
                }
              }
              break;
            case 'wildcard':
              if (regexpobj === null) {
                if (channelname.toLowerCase().indexOf(key.toLowerCase()) > -1) {
                  block = true;
                }
              }
              break;
            case 'keyword':
              if (regexpobj !== null) {
                if (pageVideoTitle && regexp && regexp.test(pageVideoTitle) === true) {
                  blockPage = true;
                  forbidden_page_opened = true;
                }else if (regexp && regexp.test(videotitle) === true) {
                  block = true;
                  forbidden_page_opened = false;
                }
              } else {
                if (pageVideoTitle && pageVideoTitle.toLowerCase().indexOf(key.toLowerCase()) > -1) {
                  blockPage = true;
                  forbidden_page_opened = true;
                }else if (videotitle.toLowerCase().indexOf(key.toLowerCase()) > -1) {
                  block = true;
                  forbidden_page_opened = false;
                }
              }
              break;
          }
          if (blockPage === true && blockPage_timer === true) {
                  window.location.replace('/');
          }
          if (block === true && blockPage_timer === true){
            let parent = containers[j];
            parent.remove();
            containers[j].remove();
            break;
          }
        }
        if (block === false) {
          containers[j].style.visibility = 'visible';
        }
      }
    }
  });
  fixThumbnails();
}


var contextChannelName;
//triggered when you right click a video
window.addEventListener('contextmenu', function(event) {
  contextChannelName = null;
  for (var i = 0; i < containerList.length; i++) {
    if (event.target.closest(containerList[i].container) !== null) {//checks if the event comes from a video(thumbnail)
      contextChannelName = event.target.closest(containerList[i].container).querySelector(containerList[i].channelname).textContent.trim();
    }
     if (contextChannelName !== null)
      break;
  }
});

// document.addEventListener('DOMNodeInserted', function (event) {
//   hideVideos();
// });

chrome.runtime.onMessage.addListener(function(message) {
  if (message.name === 'contextMenuClicked' && contextChannelName !== null) {
    addItem({ key: contextChannelName, type: 'channel' }, hideVideos);
  }
});

function fixThumbnails() {
  var allThumbs = document.body.querySelectorAll(".thumb-link img, .yt-thumb img");
  for (var i = 0; i < allThumbs.length; i++) {
    if (allThumbs[i].hasAttribute('data-thumb') && allThumbs[i].getAttribute('data-thumb') !== allThumbs[i].getAttribute('src'))
      allThumbs[i].setAttribute('src', allThumbs[i].getAttribute('data-thumb'));
  }
}

function timer() {
  if(forbidden_page_opened === true){
    getSettings(function(storage) {
      let new_time = storage.time_so_far;
      if (typeof storage.time_so_far === 'undefined') {
        new_time = 0;
      }
      new_time = parseInt(new_time) + 60;
      let date = new Date();
      let day_of_date = date.getDate();
      let test = storage.last_date;
      if(day_of_date !== parseInt(storage.last_date)){
        new_time = 0;
        setSetting('last_date', day_of_date);
        blockPage_timer = false;
      }
      if(new_time > storage.timer){
        blockPage_timer = true;
        return;
      }
      setSetting('time_so_far', new_time);//setting the timer to default 20 min
    });
  }else{
    getSettings(function(storage) {
      blockPage_timer = false;
      let new_time = storage.time_so_far;
      new_time = new_time + 30;
      if(new_time > storage.timer){
        blockPage_timer = true;
        return;
      }
    });
  }

  // if(forbidden_page_opened === true){
  //   getSettings(function(storage) {
  //     let new_time = storage.time_so_far;
  //     if (typeof storage.time_so_far === 'undefined') {
  //       new_time = 0;
  //     }
  //     new_time = parseInt(new_time) + 60;
  //     let date = new Date();
  //     let day_of_date = date.getDate();
  //     let test = storage.last_date;
  //     if(day_of_date !== parseInt(storage.last_date)){
  //       new_time = 0;
  //       setSetting('last_date', day_of_date);
  //       blockPage_timer = false;
  //     }
  //     if(new_time > storage.timer){
  //       blockPage_timer = true;
  //       return;
  //     }
  //     setSetting('time_so_far', new_time);//setting the timer to default 20 min
  //   });
  // }else{
  //   getSettings(function(storage) {
  //     blockPage_timer = false;
  //     let new_time = storage.time_so_far;
  //     new_time = new_time + 30;
  //     if(new_time > storage.timer){
  //       blockPage_timer = true;
  //       return;
  //     }
  //   });
  // }
}


//# sourceMappingURL=videoblocker.js.map