import * as config from '@/config.json';

if (config.features.ga) {
  const googleSiteVerificationTag = document.getElementById('google-site-verification');
  if (googleSiteVerificationTag) {
    googleSiteVerificationTag.setAttribute('content', config.features.ga.verification);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.ga =
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      window.ga ||
      function() {
        // eslint-disable-next-line prefer-rest-params
        (ga.q = ga.q || []).push(arguments);
      };
    ga.l = +new Date();
    ga('create', config.features.ga.tracking, 'auto');
    ga('send', 'pageview');
  }
}
