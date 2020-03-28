import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    register('/service-worker.js', {
      ready(registration) {
        console.log('Service worker is active.');
      },
      registered(registration) {
        console.log('Service worker has been registered.');
      },
      cached(registration) {
        console.log('Content has been cached for offline use.');
      },
      updatefound(registration) {
        console.log('New content is downloading.');
      },
      updated(registration) {
        console.log('New content is available; please refresh.');
      },
      offline() {
        console.log('No internet connection found. App is running in offline mode.');
      },
      error(error) {
        console.error('Error during service worker registration:', error);
      },
    });
  }

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
