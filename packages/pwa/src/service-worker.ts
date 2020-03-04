import * as workbox from 'workbox-build';

export const buildServiceWorker = async (dest: string) => {
  await workbox.generateSW({
    globDirectory: dest,
    globPatterns: [
      '**/*.{js,json,css}',
      '**/*.{jpg,jpeg,png,webp}',
      '**/*.{ttf,woff,woff2,eot}',
      '**/*.html',
      'index.html'
    ],
    importWorkboxFrom: 'local',
    swDest: `${dest}/service-worker.js`,
    skipWaiting: true,
    clientsClaim: true
  });
};
