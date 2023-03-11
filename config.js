/**
 * Configuration script
*/

// check value to see that the config file is being recognized
const configBool = 'true';

// affects: utils/log-event.js
var log = {
  // Log out blocked requests to console.log
  EnableConsole: true,

  // Enable storing detailed info in an array
  EnableArray: true,

  // What to log out. If false, the value will be replaced with the string 'disabled'.
  opts: {
    origin: true,
    tabid: true,
    url: true,
    init: true,
    caller: true,
    timestamp: true,
  },

  // What to log out to the console.
  // This does not affect EnableArray.
  logOut: {
    event: true,
    ping: false,
    ads: true,
    adware: true,
    redirects: false,
  }
};
// affects: bgscr/ad-radar-advanced.js, bgscr/special-case.js
var switches = {
  block: {
    ads: true,
    pings: true,
    playlogs: true,
    ytapi: true,
    ip: true,
    favicon: false,
    byregex: true,
    gapi: true
  },
  modif: {
    ythttp: true,
    cache: true,
    resua: true,
  },
};

// Unnecessary Google search URL parameters
var deleteGoogleSearchURLParams = ['ved', 'aqs', 'bih', 'biw', 'dpr', 'gs_lcp', 'ei', 'sclient', 'uact', 'source', 'sa', 'fir', 'usg', 'stick', 'oq', 'sourceid', 'lei'];

// affects: bgscr/special-case.js
var regex = {
  ytapi: /(generate_204|feedback|activeview|ad_break|api\/stats\/(ads|qoe|atr)|ptracking|log_(event|interaction))/gi,
  gapi: /(_\/(OneGoogleWidgetUi|VisualFrontendUi)\/(jserror|browserinfo)|((\/(presentation|document))?\/([a-z0-9]+\/)?(naL|l)ogImpressions))/g,
  gen204: /(google|youtube|googlevideo|gstatic|ytimg)\.com(\.[a-z]{2})?\/((gen(erate)*)|client)_204/gi,
  ip: /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/gi,
  favicon: /favicon.*\.(jp[e]?g|bmp|png|gif|tif+|flv|ico)/gi,
  search: /(https?):\/\/.*\.google\.com(\.[a-z]{2})?\/search\?.*&(ved|aqs|biw|bih|dpr|si)=/gi
};

/**
 * template: /^(https?):\/\//gi,
 * start with: /^(https?):\/\/
 * use flags: gi
 * wildcards: (.*)
 * path wildcards: ([a-z0-9\-_\.\~\!\$\(\)\/])*
 * tlds (.com, .net, .co.uk): (\.\w+){1,2}
 * subdomains (ads.example.com): ([0-9,a-z,-]+\.)*
 */
var regexList = {
  reglist: [
    /^(https?):\/\/([0-9,a-z,-]+\.)*engage\.3m(\.\w+){1,2}/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*adskeeper(\.\w+){1,2}/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*google-analytics(\.\w+){1,2}/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*greenelephants[0-9]+\.live/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*ybinst[0-9]\.ec\.yimg\.com/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*facebook\.com\/common\/cavalry_endpoint\.php/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*([a-f,h-z]+)oogle(\.\w+){1,2}/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*([a-x,z]+)(outube[kids]*)(\.\w+){1,2}/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*rdv[0-9]{2}\.fr/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*dial[0-9]{2}\.fr/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*google(\.\w+){1,2}\/api\/stats\/watchtime/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*youtube\.googleapis(\.\w+){1,2}\/youtubei\/v1\/log_event/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*tij?(\.\w+){1,2}\/akam\/\d{2}/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*px-cloud\.net\/api\/v(\d)+\/collector/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*google\.com([a-z0-9\-_\.\~\!\$\(\)\/])*\/v2internal\/viewerimpressions/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*connect\.facebook\.net\/[a-z]{2}_[a-z]{2}\/fbevents\.js/gi,

    // This URL helps Drive determine if you have an active internet connection.
    // Enable at your own risk.
    // /^(https?):\/\/([0-9,a-z,-]+\.)*gstatic.com\/docs\/common\/cleardot\.gif/gi,
  ],
  adware: [
    // these are from https://raw.githubusercontent.com/notracking/hosts-blocklists/master/adblock/adblock.txt, 
    // with similar domains replaced with regex
    // the rest are dumped to lists/adware.js
    /^(https?):\/\/([0-9,a-z,-]+\.)*hostingcloud(\.\w+){1,2}/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*999080321newfolder1002-[0-9]{17}\.site/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*10022020newfolder1002-[0-9]{16}\.site/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*([0-9]+)gmail\.com/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*333[0-9]{4}\.com/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*206[0-9]{3}\.com/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*pdf([a-z]{2}|[a-z]{1})\.site/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*ad[0-9]\.udn\.com/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*ads-media-(\d+).buzz/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*dominoduck[0-9]{4}.duckdns.org/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*dev[a-z]{2}\.site/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*adm([0-9]+).bit/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*(adobeflash(manager|install|player))(\.\w+){1,2}/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*asyabahis(\d+)\.com/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*atakai-technologies(\.\w+){1,2}/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*buyu[0-9]+\.com/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*cengizsokak[0-9]+(\.\w+){1,2}/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*cocomo[0-9]+\.serveblog\.net/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*collect-(eu|us)-fy\d{4}\.myhomescreen\.tv/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*cookie-law-enforcement-[a-z]{2}\.xyz/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*counter[0-9]+\.bravenet\.com/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*curtainhardsh\d+\.live/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*doc[a-z]{2}\.site/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*effectstorestream[0-9]+\.live/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*epub[a-z]+\.site/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*zgloszenie\d{3}\.site/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*my-jcb-co-jp-\w+\.top/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*zip[a-z]{2}\.site/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*inbox[0-9]{2}-mails\.icu/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*ideaanstudy[0-9]+\.live/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*aj[0-9]{4}\.online/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*server[0-9]{6}\.nazwa\.pl/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*secure.runescape.com-[a-z]{2}(\.\w+){1,2}/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*ucretsizvideoplayerizlet[0-9]+\.xyz/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*pl-id[0-9]{8}\.xyz/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*10022020test[0-9]+-service1002012510022020\.\w+/gi,
    /^(https?):\/\/([0-9,a-z,-]+\.)*free-sex-tonight[0-9]+(\.\w+){1,2}/gi,
  ]
};

// 
const urlShorts = ["*://*.grabify.link/*", "*://*.bit.ly/*", "*://*.adf.ly/*", "*://*.goo.gl/*", "*://*.tinyurl.com/*", "*://*.ow.ly/*", "*://*.is.gd/*", "*://*.buff.ly/*", "*://*.bit.do/*", "*://*.mcaf.ee/*", "*://*.su.pr/*", "*://*.7.ly/*", "*://*.admy.link/*", "*://*.al.ly/*", "*://*.bc.vc/*", "*://*.doiop.com/*", "*://*.fur.ly/*", "*://*.youtu.be/*", "*://*.g.co/*"];

// Block any site (re)directing you to a raw IP address
// 142.250.199.78 is the IP address of google.com
// 127.0.0.1 is localhost
// 192.168.*.* is the LAN address, add if needed
const ipWhitelist = ["127.0.0.1", "192.168.1.1", "192.168.1.0", "142.250.199.78"];


// configuration ends here, do not edit below

// functions to get things

function getUrlShorts() { return urlShorts; }
