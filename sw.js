const CACHE='bisp-shell-v4';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const LIBS=['https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js','https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(ASSETS);for(const u of LIBS){try{const r=await fetch(u,{mode:'cors'});if(r.ok)await c.put(u,r.clone());}catch(e){}}await self.skipWaiting();})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})()));
self.addEventListener('fetch',event=>{const q=event.request;if(q.method!=='GET')return;event.respondWith((async()=>{const hit=await caches.match(q);if(hit)return hit;try{const r=await fetch(q);if(r.ok&&(new URL(q.url).origin===self.location.origin||LIBS.includes(q.url))){const c=await caches.open(CACHE);c.put(q,r.clone());}return r;}catch(e){if(q.mode==='navigate')return caches.match('./index.html');throw e;}})());});
