// GODecide — o app de teste foi retirado deste endereço.
// Este service worker substitui o antigo: apaga a cópia guardada do app,
// se desregistra e recarrega a página, para que apareça só a página "Em breve".
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil((async function () {
    var chaves = await caches.keys();
    await Promise.all(chaves.map(function (k) { return caches.delete(k); }));
    await self.registration.unregister();
    var janelas = await self.clients.matchAll({ type: 'window' });
    janelas.forEach(function (c) { try { c.navigate(c.url); } catch (err) {} });
  })());
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request, { cache: 'no-store' }).catch(function () { return fetch(e.request); }));
});
