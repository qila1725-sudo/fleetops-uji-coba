/* UJI COBA: service worker "pembersih". Menghapus cache lama, mematikan dirinya sendiri,
   lalu memuat ulang halaman supaya file terbaru dipakai. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  try { const ks = await caches.keys(); await Promise.all(ks.map(k => caches.delete(k))); } catch (_) {}
  try { await self.registration.unregister(); } catch (_) {}
  try { const cs = await self.clients.matchAll({ type: 'window' }); cs.forEach(c => { try { c.navigate(c.url); } catch (_) {} }); } catch (_) {}
})()));
