if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.error('SW register failed:', registrationError);
        });
    });
  }

  const analyticsTracking = document.getElementById('google-analytics');
  if (analyticsTracking) {
    window['ga'] =
      window['ga'] ||
      function() {
        (window['ga'].q = window['ga'].q || []).push(arguments);
      };
    window['ga'].l = +new Date();
    window['ga']('create', analyticsTracking.getAttribute('content'), 'auto');
    window['ga']('send', 'pageview');
  }
}
