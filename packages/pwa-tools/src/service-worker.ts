import * as workbox from 'workbox-build';

export const buildServiceWorker = async (dest: string) => {
  await workbox.generateSW({
    globDirectory: dest,
    globPatterns: ['**/*.{js,json,css}', '**/*.{jpg,jpeg,png}', '**/*.{ttf,woff,woff2,eot}', 'index.html'],
    importWorkboxFrom: 'local',
    swDest: `${dest}/service-worker.js`
  });
};
