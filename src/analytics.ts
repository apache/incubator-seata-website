import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

(function () {
  if (ExecutionEnvironment.canUseDOM) {
    let s= document.getElementsByTagName('script')[0];

    let matomo = document.createElement('script');
    matomo.text = `
      <!-- Matomo -->
        var _paq = window._paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
<!--        _paq.push(["setDoNotTrack", true]);-->
        _paq.push(["disableCookies"]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="https://analytics.apache.org/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '46']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
      <!-- End Matomo Code -->
    `;
    s.parentNode.insertBefore(matomo, s);

    let gtag = document.createElement('script');
    gtag.src = '/js/gtag.js';
    gtag.async = true;
    s.parentNode.insertBefore(gtag, s);

    let hm= document.createElement('script');
    hm.src = '/js/hm.js';
    hm.async = true;
    s.parentNode.insertBefore(hm, s);

    let aplus_v2= document.createElement('script');
    aplus_v2.src = '/js/aplus_v2.js';
    aplus_v2.id = 'beacon-aplus';
    aplus_v2.setAttribute('exparams','clog=o&aplus&sidx=aplusSidx&ckx=aplusCkx');
    aplus_v2.defer= true;
    s.parentNode.insertBefore(aplus_v2, s);

    let tracker= document.createElement('script');
    tracker.src = '/js/tracker.js';
    tracker.defer = true;
    s.parentNode.insertBefore(tracker, s);
  }
})();
