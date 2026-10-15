// FogMap service worker. Version is stamped by tools/build.py — bump it on every deploy.
const V='15',C='fogmap-v15',T='tiles2',TMAX=2000;let tn=0;
const SHELL=['./','app.min.js','app.min.css','vendor/leaflet.js','config.js','cities.js','data/regions.js','vendor/leaflet.markercluster.js'].map(u=>u==='./'?u:u+'?v='+V).concat(['manifest.webmanifest','icon.svg','icons/apple-touch-icon.png','icons/icon-512.png']);
const trim=c=>c.keys().then(k=>k.length>TMAX&&Promise.all(k.slice(0,k.length-TMAX).map(r=>c.delete(r)))).catch(()=>{});
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).catch(()=>{}));});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const ks=await caches.keys();const upgrade=ks.some(k=>/^fogmap-v/.test(k)&&k!==C);
 await Promise.all(ks.filter(k=>k!==C&&k!==T).map(k=>caches.delete(k)));await self.clients.claim();
 if(upgrade){const cs=await self.clients.matchAll({type:'window'});cs.forEach(c=>{try{c.navigate&&c.navigate(c.url).catch(()=>{});}catch(_){}});}})());});
const put=(c,req,res)=>{if(res&&res.ok)c.put(req,res.clone()).catch(()=>{});return res;};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(/cartocdn|arcgisonline|openstreetmap/.test(u.host)){e.respondWith(caches.open(T).then(c=>c.match(r).then(h=>h||fetch(r).then(n=>{if(n.ok){c.put(r,n.clone()).catch(()=>{});if(++tn%50===0)trim(c);}return n;}))));return;}
 if(u.origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(caches.open(C).then(c=>{const net=fetch(r).then(n=>put(c,'./',n));const to=new Promise(res=>setTimeout(()=>res(null),4000));
  return Promise.race([net.catch(()=>null),to]).then(n=>n||c.match('./').then(h=>h||net));}));return;}
 if(u.searchParams.has('v')){e.respondWith(caches.open(C).then(c=>c.match(r).then(h=>h||fetch(r).then(n=>put(c,r,n)))));return;}
 if(u.pathname.endsWith('/sw.js'))return;
 e.respondWith(caches.open(C).then(c=>c.match(r).then(h=>{const net=fetch(r).then(n=>put(c,r,n)).catch(()=>h);return h||net;})));});
