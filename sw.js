const C='fogmap-v8';const A=['./','index.html','app.js','native.js','style.css','config.js','cities.js','vendor/leaflet.js','vendor/leaflet.css','vendor/leaflet.markercluster.js','vendor/MarkerCluster.css','vendor/MarkerCluster.Default.css','manifest.webmanifest','icon.svg','icons/apple-touch-icon.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!=='tiles').map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const u=e.request.url;if(e.request.method!=='GET')return;
 if(/cartocdn|arcgisonline|openstreetmap/.test(u)){e.respondWith(caches.open('tiles').then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{c.put(e.request,n.clone());return n;}))));return;}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
