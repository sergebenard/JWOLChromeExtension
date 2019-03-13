// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// Current search items, as a constant

let searchResources = [];

chrome.runtime.onInstalled.addListener( function( searchResources) {
  chrome.contextMenus.create( {
    id: 'openWOLSearchLink',
    title: "Search Watchtower Online Library for '%s'",
    type: 'normal',
    contexts: ['selection'],
  })
});

// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
// chrome.runtime.onInstalled.addListener(function() {
//   for (let key of Object.keys(kResources)) {
//     let searchResource = {
//       id: key,
//       title: kResources[key]
//     }
    
//     chrome.contextMenus.create({
//       id: key,
//       title: kResources[key],
//       type: 'normal',
//       contexts: ['selection'],
//     });
//   }
// });

function generateURL() {
  console.log('Inside of generateURL')
  let url = "";
  
  chrome.storage.sync.get(['removedContextMenu'], function(list) {
    let removed = list.removedContextMenu || [];
    
    for (let key of Object.keys(kResources)) {

      if ( ! removed.includes(key) ) {
        // &fc[]=
        url += "&fc%5B%5D=" + key;
      }

    }
    return url;
  });
}

chrome.contextMenus.onClicked.addListener(function(item, tab) {
  console.log('Inside context menu onClicked...', 'kResources: ' + Object.keys( kResources ).length);

  chrome.storage.sync.get(['removedContextMenu'], function(list) {
    console.log('retrieving storage stuff: ' + list);
    
    let urlQuery = "";
    let removed = list.removedContextMenu || [];
    
    console.log( 'removed: ' + removed + ' - kResources: ' + kResources, 'removed.length: ' + removed.length + ' - kResources.length: ' + Object.keys( kResources ).length && removed.length );
    
    if ( removed.length < Object.keys( kResources ).length && removed.length >= 1 ) {

      for (let key of Object.keys(kResources)) {
        if ( ! removed.includes(key) ) {
          // &fc[]=
          urlQuery += "&fc%5B%5D=" + key;
        }
        console.log('Query up to now: ' + urlQuery);
      }
      console.log('Complete URL Query: ' + urlQuery);
      
    }
    
    let url = 'https://wol.jw.org/en/wol/s/r1/lp-e?q=' + item.selectionText + urlQuery;
    chrome.tabs.create({url: url, index: tab.index + 1});

  });
});

chrome.storage.onChanged.addListener(function(list, sync) {
  let newlyDisabled = [];
  let newlyEnabled = [];
  let currentRemoved = list.removedContextMenu.newValue;
  let oldRemoved = list.removedContextMenu.oldValue || [];
  for (let key of Object.keys(kResources)) {
    if (currentRemoved.includes(key) && !oldRemoved.includes(key)) {
      newlyDisabled.push(key);
    } else if (oldRemoved.includes(key) && !currentRemoved.includes(key)) {
      newlyEnabled.push({
        id: key,
        title: kResources[key]
      });
    }
  }
  for (let resource of newlyEnabled) {

    searchResources.push.resource;

    // chrome.contextMenus.create({
    //   id: resource.id,
    //   title: resource.title,
    //   type: 'normal',
    //   contexts: ['selection'],
    // });
  }
  for (let resource of newlyDisabled) {
    delete searchResources.resource;
    // chrome.contextMenus.remove(resource);
  }
});
