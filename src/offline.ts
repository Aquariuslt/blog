import * as config from '@/config.json';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', (): void => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration): void => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError): void => {
        console.error('SW register failed:', registrationError);
      });
  });
}

if (config.features.ga) {
  const googleAnalyticsMeta = document.getElementById('google-analytics');
  if (googleAnalyticsMeta) {
    googleAnalyticsMeta.setAttribute('content', config.features.ga);
  }
}
