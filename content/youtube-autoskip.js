/*
* content script
* declared as: "youtube-autoskip.js"
* matches: ["*://*.youtube.com/*","*://*.youtube-nocookie.com/*","*://*.youtu.be/*","*://*.youtube.co.uk/*","*://*.youtube.de/*"]
*/

try {
  // ;)
  if (document.getElementById("country-code") != null) {
    // make the country code say something stupid
    document.getElementById("country-code").innerText = "xXx_ADSLAYER69_xXx";
  }
  // source: https://dev.to/penge/chrome-extension-that-skips-youtube-ads-steps-how-to-create-it-3ibp
  const click_button = (clazz) => {
    const buttons = document.getElementsByClassName(clazz);
    for (const button of buttons) {
      button.click();
    }
  };

  const del_element = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.remove();
    }

  };
  setInterval(() => {
    // skip ad button
    click_button("ytp-ad-skip-button-text");
    // close banner button, irrelevant if you block youtube.com/pagead entirely
    // which is where all the banner ads live
    click_button("ytp-ad-overlay-close-button");
  }, 100);


  if (document.getElementsByClassName("ytp-ad-skip-button-text")) {
    click_button("ytp-ad-skip-button-text");
  }
  if (document.getElementsByClassName("ytp-ad-overlay-close-button")) {
    click_button("ytp-ad-overlay-close-button");
  }

  // This snippet "tries" to skip unskippable ads
  // by autoclicking the "stop seeing this ad" button.
  // This does not work.
  var int;
  if (document.getElementsByClassName('ytp-ad-button-icon')[1] && document.getElementsByClassName('ytp-ad-button-text')[2]) {
    try {
      int = setInterval(() => {
        document.getElementsByClassName('ytp-ad-button-icon')[1].click(); // click the i button
        for (let i = 0;i < document.getElementsByClassName('ytp-ad-button-text').length;i++) {
          if (document.getElementsByClassName('ytp-ad-button-text')[i].innerText == 'Stop seeing this ad') {
            document.getElementsByClassName('ytp-ad-button-text')[i].click(); // click 'stop seeing this ad'
            break;
          }
        }
        for (let i = 0;i < document.getElementsByClassName('ytp-ad-feedback-dialog-reason-text').length;i++) {
          if (document.getElementsByClassName('ytp-ad-feedback-dialog-reason-text')[i].innerText == 'Repetitive') {
            document.getElementsByClassName('ytp-ad-feedback-dialog-reason-text')[i].click(); // click any item with the label 'Repetitive'. Any others will do.
          }
        }
        for (let i = 0;i < document.getElementsByClassName('ytp-ad-feedback-confirm-button').length;i++) {
          if (document.getElementsByClassName('ytp-ad-feedback-confirm-button')[i].innerText == 'SEND') {
            document.getElementsByClassName('ytp-ad-feedback-confirm-button')[i].click(); // click the confirm button
          }
        }
      }, 300);
    } catch (e) { clearInterval(int); console.log('unskippable', e); }

    setTimeout(() => {
      clearInterval(int);
    }, 30000);
  }
  if (document.getElementsByClassName('ytp-ad-button-icon')[1] == null || 'undefined') {
    clearInterval(int);
  }

  setInterval(() => {
    del_element("player-ads");
  }, 300);

  if (document.getElementById("player-ads")) {
    del_element("player-ads");
  }
  if (document.getElementsByTagName('ytd-promoted-sparkles-web-renderer')) {
    for (var element of document.getElementsByTagName('ytd-promoted-sparkles-web-renderer')) {
      element.remove();

    }
  }

  // giant "get youtube premium" banner at the top
  setInterval(() => {
    if (document.getElementsByClassName("ytd-promo-renderer-background")) {
      var bannerads = document.getElementsByClassName("ytd-promo-renderer-background");
      for (var bannerad of bannerads) {
        bannerad.remove();
      }
    }
  }, 500);
  window.onload = () => {
  if (document.getElementsByClassName("ytd-banner-promo-renderer")) {
    var banners = document.getElementsByClassName("ytd-banner-promo-renderer");
    for (var banner of banners) {
      banner.remove();
      console.info("banner blocked");
    }
  } if (document.getElementsByClassName("ytd-banner-promo-renderer-background")) {
    var _bannersbg = document.getElementsByClassName("ytd-banner-promo-renderer-background");
    for (var bannerbg of _bannersbg) {
      bannerbg.remove();
      console.info("banner blocked");
    }
  }
  if (document.getElementById('sparkles-container')) {
    document.getElementById('sparkles-container').remove();
  }
  let sinterval = setInterval(() => {
      if (document.getElementById("masthad-ad") != null) {
    while(true) {
      document.getElementById("masthad-ad").remove();
      if(document.getElementById("masthad-ad") == null) {break;}
    }
  }
  }, 1000);

  setTimeout(() => {
    clearInterval(sinterval);
  }, 30000);

}




  // for ads in a similar format to other videos in the recomendations, doesn't work
  /*if(document.querySelector("#content > ytd-display-ad-renderer")) {
    const vids = document.querySelector("#content > ytd-display-ad-renderer");
    for (const vid of vids) {
      vid.remove();
      console.info("vid blocked");
    }
  }*/
} catch (e) { console.warn(e); }