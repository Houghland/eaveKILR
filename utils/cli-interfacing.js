// this script defines a bunch of functions for the CLI interface

// special config for this file only, non-writable from command line
const clienv = {
  acceptAllLoadWarnings: false
};

var loaded_config_info = {};

bgpa.console.log(`Issues? Suggestions? Console spat out an error? Suggest them here: https://forms.gle/d1V88V7DuKcjvCcS9`)

if (log.logOut.event == true) {
  console.log(`%cWARNING%c
This is a powerful extension that can break every feature you like or expose you to unimaginable amounts of danger (https://en.wikipedia.org/wiki/Self-XSS).
DO NOT PASTE ANY TEXT FROM THE INTERNET HERE UNLESS YOU CAN TRUST IT'S SOURCE.`, 'color:red; background-color:yellow; font-size: 30px; font-family:consolas', 'font-size: 16px; font-family:Comic Sans MS');
}

function help() {
  console.log(`Help:

  Objects:
  dd - array of caught and redirected requests
  

  Configuration:
Logging:
ex: log.EnableConsole = true, log.opts.origin = false
  log: {
    EnableConsole: boolean;........Enable logging to console
    EnableArray: boolean;..........Enable logging to an array for later evaluation
    opts: {........................Logging options
        origin: boolean;...........URL of the tab that made the request
        tabid: boolean;............Tab ID (number unique for every tab in a session) of the request
        url: boolean;..............URL that a filter caught
        init: boolean;.............Initiator of the request from details.initiator, differs from origin that it only gets the domain name
        caller: boolean;...........Identifier of what blocked this request, (e.g. ad-radar-advanced/block.ads)
    };
    logOut: {......................What to log out to console, if log.EnableConsole is set to true
        ping: boolean;.............Log out caught ping requests
        ads: boolean;..............Log out caught requests from ad filter
        adware: boolean;...........Log out caught requests from Adware filter
        redirects: boolean;........Log out redirects from redirect filters
    };
  }
Blocking:
ex: switches.block.pings = true
Legend:
# - does not log out
+ - logs as ad filter
- - logs as adware filter
":<category> - has a special category
!:<reason> - enable at your own risk
switches: {
  block: {
      ads: boolean;................Block requests from the ad filter (+)
      pings: boolean;..............Block all ping requests, including requests using the Beacon API on certain browsers (https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API) (":ping)
      playlogs: boolean;...........block all Google /log requests (https://live.paloaltonetworks.com/t5/general-topics/anyone-else-have-a-ton-of-these/td-p/182116) (#)
      ythttp: boolean;.............Block all YouTube backend HTTP headers (x-youtube-ad-signals, x-youtube-client-version)
      ip: boolean;.................Block all requests that use an IP address, may also block LAN IPs (-)
      favicon: boolean;............Block all favicons, may also block real requests for images (+!:can also block other requests with "favicon" in it's name, can be edited in regex.favicon)
      byregex: {...................Block using regular expressions
          enable: boolean;.........Enable feature (!:it can also block other requests you don't intend to)
          reglist: boolean;........Block and as ad filter (+)
          adware: boolean;.........Block and as adware filter (-)
      };
  };
  modif: {........................Modify requests
      cache: boolean;.............Modify Cache-Control header in every image to be "no-store, max-age=0" (#)
      resua: boolean;.............Modify user agent and sec-ch-ua header in every image to be 0 (#)
  };
}
`);
}
function dumpconf(name, flags, version) {
  let _name = name || `backup-${new Date().getTime()}`;
  let _flags = flags || [];
  let _version = version || 'not_defined';
  let _regexList = {
    reglist: [],
    adware: []
  };
  for (let i = 0;i < regexList.reglist.length;i++) {
    _regexList.reglist.push(encodeURIComponent(regexList.reglist[i].toString()));
  }
  for (let i = 0;i < regexList.adware.length;i++) {
    _regexList.adware.push(encodeURIComponent(regexList.adware[i].toString()));
  }
  let _regex = {};
  _regex.ytapi = encodeURIComponent(regex.ytapi.toString());
  _regex.gen204 = encodeURIComponent(regex.gen204.toString());
  _regex.ip = encodeURIComponent(regex.ip.toString());
  _regex.favicon = encodeURIComponent(regex.favicon.toString());
  _regex.search = encodeURIComponent(regex.search.toString());
  return {
    "config_version": 1,
    "name": _name,
    "version": _version,
    "flags": _flags,
    "data": { clienv, log, switches, _regex, _regexList, adware, reglist, deleteGoogleSearchURLParams, enableAdvancedPrivacy, urlShorts, ipWhitelist }
  };
}
function confinfo() {
  if (Object.keys(loaded_config_info).length == 0) {
    return `No configuration file loaded, using default`;
  } else {
    return `Configuration info:
    Name: ${loaded_config_info.name}
    Flags: ${loaded_config_info.flags}
    Version: ${loaded_config_info.version}`;
  }
}

/*
function loadconf(configobj) {
   try {
    if (Object.keys(loaded_config_info).length > 0) {
      if (prompt('Configuration already loaded, overwrite?') == true || clienv.acceptAllLoadWarnings == true) { load(); }
    }
    else if (configobj.flags.includes('do-not-use')) {
      if (prompt('A \"do-not-use\" flag was found, use anyway?') == true || clienv.acceptAllLoadWarnings == true) { load(); }
    } catch(e) {console.log('[loadconf/hasconfig] Caught', e)}

    function load() {
      // configuration loading code
      console.log('loading configuration...');

      // load config info into object
      config_info.name = configobj.name;
      config_info.version = configobj.version;
      config_info.flags = configobj.flags;

      // logic if `half-config` flag is used
      
      if(configobj.flags.includes('half-config') == true) {
        try {
        let $data = configobj.data;
        chrome.storage.local.set({set_config: loaded_config_info, data: $data})
        if($data.switches != undefined) { switches = $data.switches }
        if($data.log != undefined) { log = $data.log }
        if($data.deleteGoogleURLSearchParams != undefined) { deleteGoogleSearchURLParams = $data.deleteGoogleSearchURLParams }
        if($data.enableAdvancedPrivacy != undefined) { enableAdvancedPrivacy = $data.enableAdvancedPrivacy }
        if($data.adware != undefined) { adware = $data.adware }
        if($data.reglist != undefined) { reglist = $data.reglist }
        } catch(e) {console.log('[loadconf/load] Caught:' + e)}
      }


      console.log(`Configuration loaded successully!`);
    }
  } catch(e) {
    console.log(`%cERROR! An error occured:\n ${e}`,'color:red')
  }
}
//*/