/**
 * This file removes tracking parameters 
 */
var extractor = {
  strip: {
    /**
     * Remove URL parameters
     * @param {string} url - URL to remove parameters
     * @param {string[]} deleteParameters - parameters to remove
     * @returns {string} a sanitized URL
     */
    searchParams: function(url, deleteParameters) {
      let urlobj = new URL(url);
      let search = new URLSearchParams(urlobj.search);
      for (var params of deleteParameters) {
        search.delete(params);
      }
      urlobj.search = search;
      return urlobj.href;
    },

    /**
     * This also works for YouTube's "redirect_event" URL's, but I wouldn't recommend using
     * this function for that.
     * @param {string} url - a "google.com/url?" URL to extract
     * @returns {string} the original URL
     */
    googurl: function(url) {
      let urlobj = new URL(url, 'https://www.google.com');
      let _redirect = urlobj.searchParams.get('url') || urlobj.searchParams.get('q');
      let redirect = /^\/preferences/i.test(_redirect) == true ? 'https://www.google.com' + _redirect : _redirect;
      return redirect;
    },

    /**
     * @param {string} url - URL to clean
     * @returns {string} 
     */
    youtube: function(url) {
      let urlobj = new URL(url);
      return urlobj.searchParams.get('q');
    },

    /**
     * 
     * @param {string} url - a "l.facebook.com/l.php?" URL to extract
     * @returns {string} either a sanitized URL (fbclid) or the original URL (l.facebook.com/l.php?)
     */
    facebook: function(url) {

      let urlobj = new URL(url);
      let search = new URLSearchParams(urlobj.search);
      let _redirect;
      let redirect;
      if(urlobj.hostname == 'l.facebook.com') {
        _redirect = new URL(urlobj.searchParams.get('u'));
      }
      if(urlobj.searchParams.has('fbclid')) {
        search.delete('fbclid');
        urlobj.search = search.toString();
        _redirect = urlobj.href;
      }
      if(_redirect.searchParams.has('fbclid')) {
        _redirect.searchParams.delete('fbclid');
      }
      
      redirect = _redirect.href;
      return redirect;
    }
  }
}