
if ((constBool === 'true') && (isReady == true)) {
  bgpa.console.log("[file] bgscr/special-case.js =======> %cREADY", "color:green");
  mainInit();
  if (switches.block.ytapi == true) { case_ytapi(); }
  if (switches.block.playlogs == true) { case_googlelog(); }
  if (switches.block.ip == true) { case_ip(); }
  if (switches.block.byregex == true) { case_byregex(); }
  if (switches.modif.ythttp == true) { case_ythttp(); }
  if (switches.block.gapi == true) { case_gapi(); }
  if (switches.modif.cache == true) { case_cache(); }
  if (switches.modif.resua == true) { case_resua(); }
  if (enableAdvancedPrivacy == true) { case_privacy(); }
} else { console.warn(`[file] bgscr/special-case.js =======> %cERROR%c cannot find files: ${findMissingFiles()}`, "color:red", "color:transparant"); }
function mainInit() {

  // youtube/ytredir
  BrowserAPI.webRequest.onBeforeRequest.addListener(function(d) {

    if (/^(https?):\/\/([0-9,a-z,-]+\.)*youtube(-nocookie)?\.com(\.[a-z]{2})?\/redirect/.test(d.url)) {
      let original_url = d.url;
      var url = new URL(d.url);
      record_redir_event('ytapi/ytredir', original_url, url.searchParams.get('q'), d.type);
      return { redirectUrl: url.searchParams.get('q') };
    }
  }, { urls: ["*://*.youtube.com/*", "*://*.youtu.be/*", "*://*.youtube-nocookie.com/*", "*://*.youtube.com.ph/*", "*://*.youtube-nocookie.com.ph/*"] }, ["blocking"]);

  // xclientdata
  BrowserAPI.webRequest.onBeforeSendHeaders.addListener(function(d) {
    for (let idx = 0; idx < d.requestHeaders.length; idx++) {
      //*
      if (d.requestHeaders[idx].name.toLowerCase() == 'x-client-data') {
        d.requestHeaders.splice(idx, 1);
      }
      //*/
      /*
       if (d.requestHeaders[idx].name.toLowerCase() == 'x-client-data') {
         d.requestHeaders[idx].value = '0';
       }
      //*/
      // if (header.name.toLowerCase() == 'dpr') {
      //   header.value = 'null';
      // }
    }
    return { requestHeaders: d.requestHeaders };
  }, { urls: ['*://*/*'] }, ["blocking", "requestHeaders", "extraHeaders"]);

  // googurl
  BrowserAPI.webRequest.onBeforeRequest.addListener(function(d) {
    if (/^(https?):\/\/([0-9,a-z,-]+\.)*google(\.\w+){1,2}\/url\?/.test(d.url)) {
      let original_url = d.url;
      var url = new URL(d.url, "https://www.google.com");
      let _redirect = url.searchParams.get('url');
      let redirect = /^\/preferences/i.test(_redirect) == true ? 'https://www.google.com' + _redirect : _redirect;
      record_redir_event('googurl/redir', original_url, redirect, d.type);
      return { redirectUrl: redirect };
    }
  }, { urls: ["*://*.google.com/*"] }, ["blocking"]);
  BrowserAPI.webRequest.onBeforeRequest.addListener(function(d) {
    if (regex.search.test(d.url)) {
      let original_url = d.url;
      var url = new URL(d.url);
      var search = new URLSearchParams(url.search);

      for (var params of deleteGoogleSearchURLParams) {
        search.delete(params);
      }
      url.search = search;
      record_redir_event('googurl/vartrack', original_url, url.href, d.type);
      return { redirectUrl: url.href };
    }
  }, { urls: ['*://*.google.com/*'] }, ["blocking"]);

  // gen204
  BrowserAPI.webRequest.onBeforeRequest.addListener(function(d) {
    if (regex.gen204.test(d.url) == true) { return { cancel: true }; }
  }, { urls: ["*://*/*"] }, ["blocking"]);

  // fburl
  BrowserAPI.webRequest.onBeforeRequest.addListener(function(d) {
    let original_url = d.url;
    let url = new URL(d.url);
    let search = new URLSearchParams(url.search);
    if (url.hostname == 'l.facebook.com') {
      var redirect = url.searchParams.get('u');
      record_redir_event('fburl/url', original_url, redirect, d.type);
      return { redirectUrl: redirect };
    }
    if (url.searchParams.has('fbclid')) {
      search.delete('fbclid');
      url.search = search.toString();
      record_redir_event('fburl/fbclid', original_url, url.href, d.type);
      return { redirectUrl: url.href };
    }

  }, { urls: ["*://*/*"] }, ["blocking"]);

  // grabify_nullified
  // This makes you stand out of the crowd,
  // enable (uncomment) at your own risk.
  //*
  BrowserAPI.webRequest.onBeforeSendHeaders.addListener(function(d) {
    for (var header of d.requestHeaders) {
      var headername = header.name.toLowerCase();
      if (headername == 'x-client-data' || 'dpr' || 'user-agent' || 'sec-ch-ua' || 'sec-ch-ua-platform' || 'sec-ch-ua-mobile' || 'referer') {
        header.value = 'null';
      }
    }
    return { requestHeaders: d.requestHeaders };
  }, { urls: getUrlShorts() }, ["blocking", "requestHeaders"]);
  //*/
}// mainInit()

function case_ythttp() {
  bgpa.console.log("[sect] special-case/case_ythttp ====> %cREADY", "color:green");
  BrowserAPI.webRequest.onBeforeSendHeaders.addListener(function(d) {
    for (var head of d.requestHeaders) {
      head = head.name.toLowerCase();
      if (head == "x-youtube-client-version" || "sec-ch-ua-model" || "dpr") { head.value = '0'; }
      if (head == "x-youtube-ad-signals") { head.value = 'null'; }
    }
    return { requestHeaders: d.requestHeaders };
  }, { urls: ['*://*.youtube.com/*', '*://*.youtube-nocookie.com/*'] }, ["blocking", "requestHeaders"]);
}

function case_ytapi() {
  bgpa.console.log("[sect] special-case/case_ytapi =====> %cREADY", "color:green");
  BrowserAPI.webRequest.onBeforeRequest.addListener(function(d) {
    if (d.url.match(regex.ytapi)) {
      logEvent(d, 'ping', 'special-case/case_ytapi');
      return { cancel: true };
    }
  }, { urls: ["*://*.youtube.com/*", "*://*.youtu.be/*", "*://*.youtube-nocookie.com/*"] }, ["blocking"]);
}

function case_privacy() {
  bgpa.console.log("[sect] special-case/case_privacy ===> %cREADY", "color:green");
  BrowserAPI.webRequest.onBeforeSendHeaders.addListener(function(d) {
    for (var header of d.requestHeaders) {
      if (header.name.toLowerCase() == 'x-client-data' || 'user-agent' || 'referer' || 'sec-ch-ua' || 'dpr') { header.value = '0'; }
      if (header.name.toLowerCase() == 'dnt') { header.value = '1'; }
    }
    return { requestHeaders: d.requestHeaders };
  }, { urls: ['*://*/*'] }, ["blocking", "requestHeaders"]);
}


function case_googlelog() {
  bgpa.console.log("[sect] special-case/case_googlelog => %cREADY", "color:green");
  BrowserAPI.webRequest.onBeforeRequest.addListener(function(d) { if (/^(https?):\/\/([0-9,a-z,-]+\.)*google\.com(\.ph)?\/log\?/.test(d.url)) { logEvent(d, 'ping', 'special-case/case_googlelog'); return { cancel: true }; } }, { urls: ["*://*.google.com/*"] }, ["blocking"]);
}

function case_gapi() {
  bgpa.console.log("[sect] special-case/case_gapi ======> %cREADY", "color:green");
  BrowserAPI.webRequest.onBeforeRequest.addListener(function(d) {
    if (regex.gapi.test(d.url) == true) {
      logEvent(d, 'ping', 'special-case/case_gapi');
      return { cancel: true };
    }
  }, { urls: ["*://*.google.com/*", "*://*.google.com.ph/*"] }, ["blocking"]);
}

function case_resua() {
  bgpa.console.log("[sect] special-case/case_resua =====> %cREADY", "color:green");
  BrowserAPI.webRequest.onBeforeSendHeaders.addListener(function(d) {
    if (d.type == 'image') {
      for (let header of d.requestHeaders) {
        if (header.name.toLowerCase() == 'user-agent') {
          header.value = '0';
        }
        if (header.name.toLowerCase() == 'sec-ch-ua') {
          header.value = '0';
        }
      }
      return { requestHeaders: d.requestHeaders };
    }
  }, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders"]);
}

function case_ip() {
  bgpa.console.log("[sect] special-case/case_ip ========> %cREADY", "color:green");
  BrowserAPI.webRequest.onBeforeRequest.addListener(function(d) {
    let url = new URL(d.url);
    if (regex.ip.test(url.hostname) == true && ipWhitelist.includes(url.hostname) == false) {
      logEvent(d, 'adware', 'special-case/case_ip');
      return { cancel: true };
    }
  }, { urls: ["<all_urls>"] }, ["blocking"]);
}

function case_favicon() {
  bgpa.console.log("[sect] special-case/case_favicon ===> %cREADY", "color:green");
  BrowserAPI.webRequest.onBeforeRequest.addListener(function(d) {
    if (regex.favicon.test(d.url) || (d.type == 'x-icon')) {
      return { cancel: true };
    }
  }, { urls: ["*://*/*"] }, ["blocking"]);
}

function case_cache() {
  bgpa.console.log("[sect] special-case/case_cache =====> %cREADY", "color:green");
  // The magic sauce. This string means: "do not cache this, ever".
  let ccheader = 'no-cache, no-store, max-age=0';
  BrowserAPI.webRequest.onBeforeSendHeaders.addListener(function(d) {
    if (d.type == 'image') {
      // cache-control
      for (var idxc = 0; idxc < d.requestHeaders.length; idxc++) {
        if (d.requestHeaders[idxc].name.toLowerCase() == 'cache-control') {
          d.requestHeaders[idxc].value = ccheader; break;
        }
        if ((d.requestHeaders.length - 1) == idxc) {
          d.requestHeaders.push({ name: 'cache-control', value: ccheader }); break;
        }
      }
    }
    return { requestHeaders: d.requestHeaders };
  }, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders", "extraHeaders"]);
  BrowserAPI.webRequest.onHeadersReceived.addListener(function(d) {
    if (d.type == 'image') {

      // cache-control
      for (var idxc = 0; idxc < d.responseHeaders.length; idxc++) {
        if (d.responseHeaders[idxc].name.toLowerCase() == 'cache-control') {
          d.responseHeaders[idxc].value = ccheader; break;
        }
        if ((d.responseHeaders.length - 1) == idxc) {
          d.responseHeaders.push({ name: 'cache-control', value: ccheader }); break;
        }
      }
      // expires
      for (var idxe = 0; idxe < d.responseHeaders.length; idxe++) {
        if (d.responseHeaders[idxe].name.toLowerCase() == 'expires') {
          d.responseHeaders[idxe].value = '0'; break;
        }
        if ((d.responseHeaders.length - 1) == idxe) {
          d.responseHeaders.push({ name: 'Expires', value: '0' }); break;
        }
      }

    }
    return { responseHeaders: d.responseHeaders };
  }, { urls: ["<all_urls>"] }, ["blocking", "responseHeaders", "extraHeaders"]);
}

function case_byregex() {
  bgpa.console.log("[sect] special-case/case_byregex ===> %cREADY", "color:green");
  BrowserAPI.webRequest.onBeforeRequest.addListener(
    function(d) {
      for (let i = 0; i < regexList.adware.length; i++) {
        if (regexList.adware[i].test(d.url)) {
          logEvent(d, "adware", "special-case/case_byregex:adware");
          return { cancel: true };
        }
      }
      for (let n = 0; n < regexList.reglist.length; n++) {
        if (regexList.reglist[n].test(d.url)) {
          logEvent(d, "reg", "special-case/case_byregex:reg");
          return { cancel: true };
        }
      }
    }, { urls: ["<all_urls>"] }, ["blocking"]);
}

function record_redir_event(groupName, originalUrl, redirectUrl, type) {
  if (log.logOut.redirects == true) {
    bgpa.console.log(`%cRedirect:%c\n from: ${originalUrl}\n to:   ${redirectUrl}\n by: ${groupName}`, ccss.succ[0], ccss.succ[1]);
  }
  dd.redirect.push({ originalUrl, type, redirectUrl, groupName, success: (originalUrl != redirectUrl) });
}
