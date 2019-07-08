import * as config from '@/config.json';

if (config.features.ga) {
  const googleAnalyticsMeta = document.getElementById('google-analytics');
  if (googleAnalyticsMeta) {
    googleAnalyticsMeta.setAttribute('content', config.features.ga.verification);

    // @ts-ignore
    window.ga = window.ga || function() {
      (ga.q = ga.q || []).push(arguments);
    };
    ga.l = +new Date;
    ga('create', config.features.ga.tracking, 'auto');
    ga('send', 'pageview');
  }
}
