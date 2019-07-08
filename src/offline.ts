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

