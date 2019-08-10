import * as config from '@/config.json';

if (config.features.ga) {
  const googleSiteVerificationTag = document.getElementById('google-site-verification');
  if (googleSiteVerificationTag) {
    googleSiteVerificationTag.setAttribute('content', config.features.ga.verification);

    // @ts-ignore
    window.ga =
      // @ts-ignore
      window.ga ||
      function() {
        (ga.q = ga.q || []).push(arguments);
      };
    ga.l = +new Date();
    ga('create', config.features.ga.tracking, 'auto');
    ga('send', 'pageview');
  }
}
