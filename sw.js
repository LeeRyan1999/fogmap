const C='fogmap-v13';const TMAX=2000;let tn=0;
const trim=c=>c.keys().then(k=>k.length>TMAX&&Promise.all(k.slice(0,k.length-TMAX).map(r=>c.delete(r)))).catch(()=>{});const A=['./','index.html','app.js','native.js','style.css','config.js','cities.js','vendor/leaflet.js','vendor/leaflet.css','vendor/leaflet.markercluster.js','vendor/MarkerCluster.css','vendor/MarkerCluster.Default.css','manifest.webmanifest','icon.svg','icons/apple-touch-icon.png','icons/icon-512.png','data/regions.js','data/countries.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!=='tiles').map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const u=e.request.url;if(e.request.method!=='GET')return;
 if(/cartocdn|arcgisonline|openstreetmap/.test(u)){e.respondWith(caches.open('tiles').then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok||n.type==='opaque'){c.put(e.request,n.clone()).catch(()=>{});if(++tn%50===0)trim(c);}return n;}))));return;}
 if(u.includes('/data/poi/')){e.respondWith(caches.open(C).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok)c.put(e.request,n.clone()).catch(()=>{});return n;}))));return;}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
