import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

(function () {
  if (ExecutionEnvironment.canUseDOM) {
    let s= document.getElementsByTagName('script')[0];

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
