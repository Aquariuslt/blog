if ('serviceWorker' in navigator) {
  window.addEventListener('load', (): void => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration): void => {
        console.log('SW registered: ', registration);
        registration.pushManager.subscribe({ userVisibleOnly: true })
      })
      .catch((registrationError): void => {
        console.error('SW register failed:', registrationError);
      });
  });
}
