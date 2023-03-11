if (configBool && constBool === 'true') { bgpa.console.log("[file] utils/log-event.js ==========> %cREADY", "color:green"); } else { console.log("[file] bgscr/special-case.js ==========> %cERROR%c" + " cannot find files: config.js, consts.js", "color:red", "color:transparant"); }

var dd = {
  reg: [],
  adware: [],
  ping: [],
  redirect: []
};
incBadge();
/**
 * @param {object} d - Details object
 * @param {string} type - type of event (reg || adware || ping)
 * @param {string} caller - caller of event
 */
function logEvent(d, type, caller) {
  var init = d.initiator;
  incBadge();
  if (log.EnableConsole == true) {
    if (log.opts.origin == true) {
      // if (d.tabId != 'undefined' && d.tabId > -1) {
      //   BrowserAPI.tabs.get(d.tabId, function(tab) {
      //     if (BrowserAPI.runtime.lastError) { console.debug("[Debug] err::runtime.lastError: %O", BrowserAPI.runtime.lastError); }
      //     // tab != undefined ? occ(tab.url) : occ('err::!tab');
      //     if (tab) { occ(tab.url); }
      //     else if (!tab) { occ('err::!tab'); }
      //   });
      // } else { occ('err::tabId: ' + d.tabId); }
      getOriginURL(d.tabId, occ)
    } else { occ('Origin logging is disabled'); }

    function occ(origin) {
      if (log.logOut.ping == true && type == 'ping') {
        bgpa.console.log(`%cPing:%c    ${d.url}\n (${origin})`, ccss.succ[0], ccss.succ[1]);
      }
      if (log.logOut.ads == true && type == 'reg') {
        bgpa.console.log(`%cBlocked:%c ${d.url}\n (${origin})`, ccss.succ[0], ccss.succ[1]);
      }
      if (log.logOut.adware == true && type == 'adware') {
        bgpa.console.log(`%cAdware:%c  ${d.url}\n (${origin})`, ccss.adware[0], ccss.adware[1]);
      }
    }
  }
  if (log.EnableArray == true) {
    if (log.opts.origin == true) {
      // if (d.tabId > -1 && d.tabId != 'undefined') {
      //   BrowserAPI.tabs.get(d.tabId, function(tab) {
      //     if (BrowserAPI.runtime.lastError) { oca("err::runtime.lastError"); }
      //     // tab != undefined ? oca(tab.url) : oca('err::!tab');
      //     if (tab) { oca(tab.url); }
      //     if (!tab) { oca('err::!tab'); }
      //   });
      // } else { oca('err::tabId: ' + d.tabId); }
      getOriginURL(d.tabId, oca)
    } else { oca('disabled-by-user'); }

    function oca(origin) {
      let push = {
        'type': type,
        'req_type': d.type,
        'url': log.opts.url ? d.url : 'disabled',
        'origin': log.opts.origin ? origin : 'disabled',
        'initiator': log.opts.init ? d.initiator || init : 'disabled',
        'tabId': log.opts.tabid ? d.tabId : 'disabled',
        'caller': log.opts.caller ? caller : 'disabled',
        'timestamp': log.opts.timestamp ? new Date().getTime() : 'disabled',
        'req_timestamp': log.opts.timestamp ? d.timeStamp : 'disabled',
      };
      switch (type) {
        case 'reg':
          dd.reg.push(push);
          break;
        case 'adware':
          dd.adware.push(push);
          break;
        case 'ping':
          dd.ping.push(push);
          break;
      }
    }
  }
}

function getOriginURL(tabId, callback) {
  if (tabId > -1 && tabId != 'undefined') {
    if (typeof chrome != 'undefined') {
      BrowserAPI.tabs.get(tabId, function(tab) {
        if (BrowserAPI.runtime.lastError) { callback('err::runtime.lastError: ' + BrowserAPI.runtime.lastError); }
        tab ? callback(tab.url) : callback('err::!tab');
        // if (tab) { callback(tab); }
      });
    } else if(typeof browser != 'undefined') {
      BrowserAPI.tabs.get(tabId).then(function(tab) {
        if(BrowserAPI.runtime.lastError) { callback('err::runtime.lastError: ' + BrowserAPI.runtime.lastError); }
        tab ? callback(tab.url) : callback('err::!tab');
      })
    }
  } else { callback('err::tabId: ' + tabId); }
}

function clrdd() {
  dd = {
    adware: [],
    redirect: [],
    reg: [],
    ping: []
  };
  incBadge();
}

function dump() {
  return {
    dd,
    lengths: {
      total: dd.reg.length + dd.adware.length + dd.ping.length + dd.redirect.length,
      reg: dd.reg.length,
      adware: dd.adware.length,
      ping: dd.ping.length,
      redirect: dd.redirect.length
    }
  };
}

function incBadge() {
  BrowserAPI.browserAction.setBadgeText({
    text: (
      (log.logOut.ads == true ? dd.reg.length : 0) +
      (log.logOut.adware == true ? dd.adware.length : 0) +
      (log.logOut.ping == true ? dd.ping.length : 0)
    ).toString(10)
  });
}