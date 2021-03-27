if (process.env.NODE_ENV === 'production') {
  const analyticsTracking = document.getElementById('google-analytics');
  if (analyticsTracking) {
    window['ga'] =
      window['ga'] ||
      function () {
        (window['ga'].q = window['ga'].q || []).push(arguments);
      };
    window['ga'].l = +new Date();
    window['ga']('create', analyticsTracking.getAttribute('content'), 'auto');
    window['ga']('send', 'pageview');
  }
}
