(()=>{
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const RM=matchMedia('(prefers-reduced-motion: reduce)');
// ---------- art ----------
const hexP=(cx,cy,r)=>{const p=a=>[cx+r*Math.cos(a*Math.PI/180),cy+r*Math.sin(a*Math.PI/180)].map(v=>v.toFixed(2)).join(' ');return `M${p(-90)}L${p(30)}L${p(150)}Z M${p(90)}L${p(210)}L${p(330)}Z`;};
const MCIN=(()=>{let d='';for(let i=0;i<6;i++){const a=(i*60-90)*Math.PI/180;d+=`<circle cx="${(50+38*Math.cos(a)).toFixed(2)}" cy="${(50+38*Math.sin(a)).toFixed(2)}" r="2.2" fill="currentColor" stroke="none"/>`;}
 return `<g fill="none" stroke="currentColor"><circle cx="50" cy="50" r="48" stroke-width="1.4"/><circle cx="50" cy="50" r="45" stroke-width=".6"/><circle cx="50" cy="50" r="41.5" stroke-width="4.5" stroke-dasharray="1.2 1.6 3.5 1.2 .8 2.4 2.6 1.4" opacity=".85"/><circle cx="50" cy="50" r="38" stroke-width=".7"/><path d="${hexP(50,50,38)}" stroke-width="1"/><circle cx="50" cy="50" r="19" stroke-width=".9"/><circle cx="50" cy="50" r="15.5" stroke-width="2.4" stroke-dasharray=".8 2.2"/>${d}</g>`;})();
const MC=cls=>`<svg class="${cls}" viewBox="0 0 100 100">${MCIN}</svg>`;
const HERO=`<svg viewBox="0 0 44 60" width="44" height="60" overflow="visible"><g class="aura"><ellipse cx="22" cy="56" rx="13" ry="4.2" fill="none" stroke="#5fe0f2" stroke-width="1" stroke-dasharray="2 1.5"/><ellipse cx="22" cy="56" rx="9" ry="2.8" fill="rgba(95,224,242,.28)" stroke="#bff6ff" stroke-width=".6"/></g>
<g class="bob"><path d="M33.5 19 L16 43" stroke="#d6deec" stroke-width="2.6" stroke-linecap="round"/><path d="M33.5 19 L35.2 16.4" stroke="#6b3e1f" stroke-width="2.2" stroke-linecap="round"/><path d="M30.6 21.6 l4.8 2.8" stroke="#e2b54f" stroke-width="2" stroke-linecap="round"/><circle cx="35.6" cy="15.8" r="1.5" fill="#e2b54f"/>
<path class="cape" d="M16.5 30 C12 36 9.5 43 8.5 49 L13.5 47 L17 50 L19 33Z" fill="#c0283c" stroke="#7a1424" stroke-width=".8"/>
<g class="lg l"><rect x="17.2" y="41" width="3.8" height="9" rx="1.5" fill="#2e335f"/><path d="M16.3 49 h5.2 v2.4 a1 1 0 0 1-1 1 h-5 a1.2 1.2 0 0 1 0-2.4z" fill="#6b3e1f"/></g>
<g class="lg r"><rect x="23" y="41" width="3.8" height="9" rx="1.5" fill="#2e335f"/><path d="M22.5 49 h5.2 a1.2 1.2 0 0 1 0 2.4 h-5 a1 1 0 0 1-1-1z" fill="#6b3e1f"/></g>
<path d="M15.5 30 Q22 27.5 28.5 30 L30 43.5 Q22 46 14 43.5Z" fill="#3d5bd9" stroke="#1b2a7a" stroke-width=".9"/><path d="M14.3 42.3 Q22 44.8 29.7 42.3" stroke="#e2b54f" stroke-width="1.2" fill="none"/>
<rect x="14.8" y="37" width="14.4" height="2.6" fill="#6b3e1f"/><rect x="20.3" y="36.5" width="3.4" height="3.6" rx=".6" fill="#f2d27a" stroke="#9c6a17" stroke-width=".5"/>
<path d="M15.8 31.5 L12.5 38.5" stroke="#3d5bd9" stroke-width="3.8" stroke-linecap="round"/><circle cx="12.3" cy="39.3" r="1.9" fill="#ffd9b8"/><path d="M28.2 31.5 L31.5 38.5" stroke="#3d5bd9" stroke-width="3.8" stroke-linecap="round"/><circle cx="31.7" cy="39.3" r="1.9" fill="#ffd9b8"/>
<path d="M15.5 29.2 Q22 33 28.5 29.2 L28.2 31.6 Q22 35.2 15.8 31.6Z" fill="#d8384a"/>
<circle cx="22" cy="18.5" r="11.2" fill="#ffe0c4" stroke="#c9906a" stroke-width=".7"/>
<path d="M10.4 20.5 C8.5 10 14.5 5 22 5.2 C29.5 5 35.5 10 33.6 20.5 L31.6 15.5 L29.3 18.6 L27.4 12.8 L23.6 16.6 L20.6 12.2 L17 17.2 L15.2 13.4 L12.8 18.2Z" fill="#7a4a24" stroke="#4d2c12" stroke-width=".7" stroke-linejoin="round"/>
<path d="M22 5.4 C23 2 26 1.5 27 2.6 C25 2.8 23.6 3.8 23.2 5.6" fill="#7a4a24" stroke="#4d2c12" stroke-width=".6"/>
<path d="M11.4 14.6 Q22 10.8 32.6 14.6" stroke="#e2b54f" stroke-width="1.3" fill="none"/><circle cx="22" cy="12.4" r="1.5" fill="#5fe0f2" stroke="#fff" stroke-width=".4"/>
<ellipse cx="17.8" cy="21" rx="1.9" ry="2.6" fill="#2b1d4a"/><ellipse cx="26.2" cy="21" rx="1.9" ry="2.6" fill="#2b1d4a"/><circle cx="18.4" cy="20" r=".8" fill="#fff"/><circle cx="26.8" cy="20" r=".8" fill="#fff"/>
<ellipse cx="15" cy="24.3" rx="1.8" ry="1" fill="#ff8a8a" opacity=".55"/><ellipse cx="29" cy="24.3" rx="1.8" ry="1" fill="#ff8a8a" opacity=".55"/><path d="M20.6 25.6 q1.4 1.3 2.8 0" stroke="#7a3a2a" stroke-width=".8" fill="none" stroke-linecap="round"/></g></svg>`;
const CRY='<polygon class="f1" points="10,1 4,9 10,12 16,9"/><polygon class="f2" points="4,9 10,12 10,24 7,21"/><polygon class="f3" points="16,9 10,12 10,24 13,21"/><polygon class="ed" points="10,1 16,9 13,21 10,24 7,21 4,9"/><path d="M7 8.5 L9.5 4" stroke="#fff" stroke-width=".8" stroke-linecap="round" opacity=".8"/>';
const cityIcon=d=>L.divIcon({className:'',iconSize:[18,27],iconAnchor:[9,26],html:`<div class="cr${d?' done':''}"><svg viewBox="0 0 20 30">${d?'<ellipse class="halo" cx="10" cy="13" rx="10" ry="12"/>':''}<ellipse class="base" cx="10" cy="27.5" rx="5.5" ry="1.8"/>${CRY}</svg></div>`});
const seal=(c,d,col='#b3243a')=>{const u='s'+Math.random().toString(36).slice(2,8);const dt=new Date(d||Date.now());const ds=`${dt.getFullYear()}·${String(dt.getMonth()+1).padStart(2,'0')}·${String(dt.getDate()).padStart(2,'0')}`;
 return `<svg viewBox="0 0 120 120"><defs><path id="${u}" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"/></defs><g filter="url(#ink)" fill="none" stroke="${col}"><circle cx="60" cy="60" r="56" stroke-width="3.5"/><circle cx="60" cy="60" r="51.5" stroke-width="1.2"/><circle cx="60" cy="60" r="38" stroke-width="1.2"/><path d="${hexP(60,60,36)}" stroke-width="1" opacity=".5"/>
 <text font-family="Cinzel,serif" font-weight="700" font-size="8.4" fill="${col}" stroke="none"><textPath href="#${u}" textLength="274" lengthAdjust="spacingAndGlyphs">✦ GUILD OF WANDERERS ✦ ${esc(c.n.toUpperCase()).slice(0,24)} ✦</textPath></text>
 <text x="60" y="65" text-anchor="middle" font-family="Cinzel,serif" font-weight="900" font-size="24" fill="${col}" stroke="none">${esc(c.cc)}</text><path d="M42 71 h36" stroke-width="1"/><text x="60" y="81" text-anchor="middle" font-family="Cinzel,serif" font-weight="700" font-size="7.5" fill="${col}" stroke="none">${ds}</text></g></svg>`;};
const badge=(kind,label)=>{const g=kind==='gold'||kind==='done'?['#fff3c4','#e9b949','#a8670c']:['#dfe4ff','#8a98e0','#3b40a8'];const id='g'+Math.random().toString(36).slice(2,7);
 return `<svg class="bd" viewBox="0 0 64 64"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${g[0]}"/><stop offset=".55" stop-color="${g[1]}"/><stop offset="1" stop-color="${g[2]}"/></linearGradient></defs><path d="M20 40 L14 62 L24 56 L32 62 L30 42Z M44 40 L50 62 L40 56 L32 62 L34 42Z" fill="${kind==='gold'?'#c0283c':'#3b40a8'}" opacity=".9"/><polygon points="32,2 40,8 50,8 53,18 60,24 56,33 58,43 48,46 42,54 32,50 22,54 16,46 6,43 8,33 4,24 11,18 14,8 24,8" fill="url(#${id})" stroke="${g[2]}" stroke-width="1.5"/><circle cx="32" cy="27" r="15" fill="#1b1d5c" fill-opacity=".18" stroke="#fff" stroke-opacity=".7" stroke-width="2"/><text x="32" y="33" text-anchor="middle" font-size="17">${label}</text></svg>`;};
// ---------- state ----------
const S=(()=>{const D={start:null,pos:null,dist:0,trail:[],checks:{}};const raw=localStorage.getItem('fogmap');let o=null;try{o=JSON.parse(raw||'null');}catch(e){try{localStorage.setItem('fogmap_bak',raw);}catch(_){}console.warn('fogmap: corrupt saved state, backed up to fogmap_bak');}
 if(!o||typeof o!=='object'||Array.isArray(o))o={};o=Object.assign(D,o);if(!Array.isArray(o.trail))o.trail=[];if(!o.checks||typeof o.checks!=='object')o.checks={};if(typeof o.dist!=='number'||!isFinite(o.dist))o.dist=0;
 if(!o.opt||typeof o.opt!=='object')o.opt={};if(typeof o.opt.mute!=='boolean')o.opt.mute=false;if(typeof o.opt.hap!=='boolean')o.opt.hap=true;
 if(typeof o.since!=='number'){const ds=Object.values(o.checks).map(c=>c&&c.d).filter(Number.isFinite);o.since=ds.length?Math.min(...ds):Date.now();}return o;})();
const save=()=>localStorage.setItem('fogmap',JSON.stringify(S));
const _ids={};const cities=window.CITIES.map(c=>{let id=c.cc+'-'+c.n;if(_ids[id])id+='@'+c.lat+','+c.lng;_ids[id]=1;return {...c,id};});
const cById={};cities.forEach(c=>cById[c.id]=c);
const byCountry={};cities.forEach(c=>(byCountry[c.cc]=byCountry[c.cc]||{name:c.co,list:[]}).list.push(c));
// ---------- sound & haptics ----------
const sfx=(()=>{let ac=null,mg=null,nb=null;const AC=window.AudioContext||window.webkitAudioContext;
 const init=()=>{if(!AC)return null;if(!ac){ac=new AC();mg=ac.createGain();mg.gain.value=.6;mg.connect(ac.destination);}if(ac.state==='suspended')ac.resume();return ac;};
 ['pointerdown','touchend'].forEach(e=>addEventListener(e,()=>{if(!S.opt.mute)try{init();}catch(_){}},{passive:true,capture:true}));
 const tone=(f,t,d,{type='sine',g=.3,f2=null,a=.005}={})=>{const o=ac.createOscillator(),v=ac.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);v.gain.setValueAtTime(.0001,t);v.gain.exponentialRampToValueAtTime(g,t+a);v.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(v);v.connect(mg);o.start(t);o.stop(t+d+.05);};
 const noise=(t,d,{g=.3,type='bandpass',f=1000,f2=null,q=1}={})=>{if(!nb){nb=ac.createBuffer(1,ac.sampleRate,ac.sampleRate);const a=nb.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;}const s=ac.createBufferSource();s.buffer=nb;s.loop=true;const fl=ac.createBiquadFilter();fl.type=type;fl.Q.value=q;fl.frequency.setValueAtTime(f,t);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t+d);const v=ac.createGain();v.gain.setValueAtTime(.0001,t);v.gain.exponentialRampToValueAtTime(g,t+Math.min(.05,d/3));v.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(v);v.connect(mg);s.start(t);s.stop(t+d+.05);};
 const run=fn=>{if(S.opt.mute)return;try{if(!init())return;fn(ac.currentTime+.02);}catch(e){}};
 return {
  stamp:()=>run(t=>{noise(t,.3,{g:.18,f:500,f2:3000,q:.8});const h=t+.3;tone(150,h,.4,{g:.9,f2:42});tone(80,h,.25,{type:'triangle',g:.4,f2:40});noise(h,.14,{g:.5,type:'lowpass',f:1200,f2:200});[1047,1319,1568,2093].forEach((f,i)=>tone(f,h+.18+i*.07,.7,{type:'triangle',g:.12}));noise(h+.18,.6,{g:.05,type:'highpass',f:6000});}),
  level:()=>run(t=>{[523,659,784,1047].forEach((f,i)=>{tone(f,t+i*.11,.35,{type:'square',g:.06});tone(f*2,t+i*.11,.3,{type:'triangle',g:.06});});const e=t+.48;[523,659,784,1047,1319].forEach(f=>tone(f,e,1.4,{type:'triangle',g:.1,a:.02}));tone(130.8,e,1.3,{g:.25});noise(e,1.2,{g:.06,type:'highpass',f:5000,f2:9000});}),
  title:()=>run(t=>{tone(1319,t,.5,{type:'triangle',g:.15});tone(1976,t+.1,.7,{type:'triangle',g:.13});tone(2637,t+.2,.8,{g:.08});}),
  arrive:()=>run(t=>{tone(1568,t,.6,{g:.12});tone(2349,t+.08,.8,{g:.09});}),
  quill:()=>run(t=>{noise(t,.25,{g:.08,f:3000,f2:6000,q:2});tone(1760,t+.15,.4,{type:'triangle',g:.08});}),
  tap:()=>run(t=>tone(880,t,.12,{type:'triangle',g:.05,f2:1320}))};})();
const Hap=(()=>{try{const C=window.Capacitor;return C&&C.isNativePlatform&&C.isNativePlatform()?C.registerPlugin('Haptics'):null;}catch(e){return null;}})();
let gest=false;addEventListener('pointerdown',()=>gest=true,{once:true,capture:true});
const buzz=k=>{if(!S.opt.hap)return;if(Hap){try{Promise.resolve(k==='success'?Hap.notification({type:'SUCCESS'}):Hap.impact({style:k==='heavy'?'HEAVY':'LIGHT'})).catch(()=>{});}catch(e){}return;}
 if(gest&&navigator.vibrate)try{navigator.vibrate(k==='heavy'?[15,30,70]:k==='success'?[30,60,30,60,90]:20);}catch(e){}};
// ---------- map ----------
const map=L.map('map',{zoomControl:false,worldCopyJump:true,minZoom:2,maxZoom:20}).setView(S.pos||[23.7,121],S.pos?8:3);
const k=window.CARTO_API_KEY?('?key='+encodeURIComponent(window.CARTO_API_KEY)):'';
const attr='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';
const osmAttr='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const osm=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:osmAttr,maxNativeZoom:19,maxZoom:20});
const carto=L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'+k,{attribution:attr,subdomains:'abcd',maxNativeZoom:20,maxZoom:20});
osm.addTo(map);
const esriSat=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{attribution:'Tiles &copy; Esri, Maxar, Earthstar Geographics',maxNativeZoom:19,maxZoom:20});
const satLabels=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',{maxNativeZoom:19,maxZoom:20});
const satRoads=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',{maxNativeZoom:19,maxZoom:20});
const sat=L.layerGroup([esriSat,satRoads,satLabels]);
// ---------- drifting cloud fog ----------
const DK=matchMedia('(prefers-color-scheme: dark)');
const cloudTex=(()=>{const cache={};return dark=>{if(cache[dark])return cache[dark];const N=256;let sd=dark?7:3;const rnd=()=>{sd|=0;sd=sd+0x6D2B79F5|0;let t=Math.imul(sd^sd>>>15,1|sd);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};
 const oct=[[4,.5],[8,.27],[16,.15],[32,.08]].map(([f,a])=>{const g=new Float32Array(f*f);for(let i=0;i<g.length;i++)g[i]=rnd();return {f,a,g};});
 const c=document.createElement('canvas');c.width=c.height=N;const x2=c.getContext('2d');const im=x2.createImageData(N,N),D=im.data;const col=dark?[118,126,190]:[252,250,255];
 for(let y=0;y<N;y++)for(let x=0;x<N;x++){let v=0;for(const o of oct){const fx=x*o.f/N,fy=y*o.f/N,x0=fx|0,y0=fy|0,tx=fx-x0,ty=fy-y0,sx=tx*tx*(3-2*tx),sy=ty*ty*(3-2*ty),x1=(x0+1)%o.f,y1=(y0+1)%o.f,G=o.g,F=o.f;
  const a=G[y0*F+x0]+(G[y0*F+x1]-G[y0*F+x0])*sx,b=G[y1*F+x0]+(G[y1*F+x1]-G[y1*F+x0])*sx;v+=(a+(b-a)*sy)*o.a;}
  const al=Math.max(0,Math.min(1,(v-.36)*2.1));const i=(y*N+x)*4;D[i]=col[0];D[i+1]=col[1];D[i+2]=col[2];D[i+3]=Math.pow(al,1.25)*255;}
 x2.putImageData(im,0,0);return cache[dark]=c;};})();
const LAYERS=[{sc:3.2,a:.85,vx:6,vy:1.5},{sc:1.9,a:.55,vx:-10,vy:3.5},{sc:1.1,a:.3,vx:14,vy:-2}];
const Fog=L.Layer.extend({onAdd(m){this.m=m;this.c=L.DomUtil.create('canvas','fogc');this.k=document.createElement('canvas');m.getPane('overlayPane').appendChild(this.c);m.on('moveend zoomend resize viewreset',this.draw,this);this.draw();this.loop();},
 draw(){const m=this.m,s=m.getSize(),q=this.q=.5,w=Math.max(1,Math.ceil(s.x*q)),h=Math.max(1,Math.ceil(s.y*q));const tl=m.containerPointToLayerPoint([0,0]);L.DomUtil.setPosition(this.c,tl);this.o=tl.add(m.getPixelOrigin());
  if(this.c.width!==w||this.c.height!==h){this.c.width=this.k.width=w;this.c.height=this.k.height=h;this.c.style.width=s.x+'px';this.c.style.height=s.y+'px';this.pats=null;}
  const g=this.k.getContext('2d');g.clearRect(0,0,w,h);
  const hole=(ll,km)=>{const p=m.latLngToContainerPoint(ll),p2=m.latLngToContainerPoint([ll[0]+km/111,ll[1]]);const r=1.3*Math.max(10,Math.abs(p.y-p2.y))*q,x=p.x*q,y=p.y*q;if(x+r<0||y+r<0||x-r>w||y-r>h)return;const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'#000');gr.addColorStop(.45,'rgba(0,0,0,.95)');gr.addColorStop(.7,'rgba(0,0,0,.6)');gr.addColorStop(.88,'rgba(0,0,0,.2)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,7);g.fill();};
  S.trail.forEach(t=>hole(t,3));if(S.start)hole(S.start,30);if(S.pos)hole(S.pos,10);Object.keys(S.checks).forEach(id=>{const c=cById[id];c&&hole([c.lat,c.lng],60);});
  this.render(performance.now());},
 render(t){const c=this.c,w=c.width,h=c.height,q=this.q,g=c.getContext('2d'),dk=DK.matches;if(!w)return;
  if(!this.pats||this.pdk!==dk){const tx=cloudTex(dk);this.pats=g.createPattern(tx,'repeat');this.pdk=dk;}
  g.globalCompositeOperation='source-over';g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,w,h);
  const bg=g.createLinearGradient(0,0,0,h);bg.addColorStop(0,dk?'rgba(12,13,40,.66)':'rgba(176,170,206,.55)');bg.addColorStop(1,dk?'rgba(24,16,48,.72)':'rgba(150,140,186,.6)');g.fillStyle=bg;g.fillRect(0,0,w,h);
  const sec=RM.matches?0:t/1000;
  for(const Ly of LAYERS){const P=256*Ly.sc;const ox=(((-this.o.x+sec*Ly.vx)%P)+P)%P-P,oy=(((-this.o.y+sec*Ly.vy)%P)+P)%P-P;
   g.setTransform(q*Ly.sc,0,0,q*Ly.sc,ox*q,oy*q);g.globalAlpha=Ly.a;g.fillStyle=this.pats;g.fillRect(0,0,(w/q+2*P)/Ly.sc,(h/q+2*P)/Ly.sc);}
  g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='destination-out';g.drawImage(this.k,0,0);g.globalCompositeOperation='source-over';},
 loop(){let last=0;const f=t=>{requestAnimationFrame(f);if(RM.matches||t-last<40||this.m._animatingZoom)return;last=t;this.render(t);};requestAnimationFrame(f);}});
const fog=new Fog().addTo(map);window.fogmap=map;
DK.addEventListener&&DK.addEventListener('change',()=>fog.draw());
// ---------- markers ----------
const peg=L.divIcon({className:'peg',iconSize:[44,60],iconAnchor:[22,56],html:HERO});
let me=null;const startMk=L.marker([0,0],{icon:L.divIcon({className:'',iconSize:[30,34],iconAnchor:[6,32],html:'<svg width="30" height="34" viewBox="0 0 30 34"><path d="M5 2v30" stroke="#5a3a10" stroke-width="3" stroke-linecap="round"/><path d="M6 3h20l-5 6 5 6H6z" fill="#3d5bd9" stroke="#e2b54f" stroke-width="1.2"/><circle cx="14" cy="9" r="2.4" fill="#f2d27a"/><circle cx="5" cy="2.5" r="2.2" fill="#e2b54f"/></svg>'})});
const trailLine=L.polyline(S.trail,{color:'#5fe0f2',weight:4,opacity:.9,dashArray:'1 8',lineCap:'round'}).addTo(map);
const cityLayer=L.markerClusterGroup({chunkedLoading:true,disableClusteringAtZoom:10,maxClusterRadius:60,showCoverageOnHover:false,removeOutsideVisibleBounds:true,iconCreateFunction:cl=>{const n=cl.getChildCount(),has=cl.getAllChildMarkers().some(m=>m.options.done);
 return L.divIcon({className:'',iconSize:[30,34],iconAnchor:[15,31],html:`<div class="cr clu${has?' done':''}"><svg viewBox="0 0 30 32">${has?'<ellipse class="halo" cx="15" cy="15" rx="15" ry="15"/>':''}<ellipse class="base" cx="15" cy="29.5" rx="11" ry="2.4"/><g transform="translate(-.5 9) scale(.62)">${CRY}</g><g transform="translate(18 9) scale(.62)">${CRY}</g><g transform="translate(5 3) scale(1.05)">${CRY}</g></svg><span class="cnt">${n>999?(n/1000).toFixed(1)+'k':n}</span></div>`});}}).addTo(map);const cMk={};
cities.forEach(c=>{cMk[c.id]=L.marker([c.lat,c.lng],{title:c.n,done:!!S.checks[c.id],icon:cityIcon(S.checks[c.id])}).on('click',()=>openCity(c));});cityLayer.addLayers(Object.values(cMk));
const refreshCity=c=>{const m=cMk[c.id];m.options.done=true;m.setIcon(cityIcon(true));cityLayer.refreshClusters(m);};
const hav=(a,b)=>{const R=6371e3,r=Math.PI/180,dl=(b[0]-a[0])*r,dn=(b[1]-a[1])*r,x=Math.sin(dl/2)**2+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(x));};
let dcK=-1,dcV=[];const doneCountries=()=>{const n=Object.keys(S.checks).length;if(n!==dcK){dcK=n;dcV=Object.keys(byCountry).filter(cc=>byCountry[cc].list.every(c=>S.checks[c.id]));}return dcV;};
// ---------- XP / levels / titles ----------
const stepsN=()=>S.stepSrc==='native'?(S.nsteps||0):Math.round(S.dist/0.75);
const TITLES=[
 {id:'start',n:'召喚之日',d:'立下冒險的起點',ic:'🚩',f:s=>s.start},
 {id:'c1',n:'初次打卡',d:'在第一座城市蓋下印記',ic:'🔮',f:s=>s.cities>=1},
 {id:'km1',n:'初出茅廬',d:'累積行走 1 公里',ic:'👢',f:s=>s.km>=1},
 {id:'x2',n:'初次跨國',d:'在 2 個國家留下印記',ic:'🌍',f:s=>s.vis>=2},
 {id:'c10',n:'十城探訪者',d:'打卡 10 座城市',ic:'🏰',f:s=>s.cities>=10},
 {id:'km10',n:'迷霧行者',d:'累積行走 10 公里',ic:'🌫️',f:s=>s.km>=10},
 {id:'eq',n:'赤道越境者',d:'在南北半球都留下印記',ic:'🧭',f:s=>s.ns},
 {id:'s10k',n:'萬步勇者',d:'累積 10,000 步',ic:'⚔️',f:s=>s.steps>=10000},
 {id:'memo',n:'吟遊詩人',d:'留下 10 則旅途回憶',ic:'📜',f:s=>s.notes>=10},
 {id:'k1',n:'國度征服者',d:'完成探索 1 個國家',ic:'👑',f:s=>s.done>=1},
 {id:'mara',n:'馬拉松勇者',d:'累積行走 42.195 公里',ic:'🏃',f:s=>s.km>=42.195},
 {id:'x10',n:'十國漫遊者',d:'在 10 個國家留下印記',ic:'🗺️',f:s=>s.vis>=10},
 {id:'c100',n:'百城旅人',d:'打卡 100 座城市',ic:'💎',f:s=>s.cities>=100},
 {id:'km100',n:'百里遠征者',d:'累積行走 100 公里',ic:'🐉',f:s=>s.km>=100},
 {id:'k10',n:'王國收藏家',d:'完成探索 10 個國家',ic:'🏆',f:s=>s.done>=10},
 {id:'km1000',n:'千里之行',d:'累積行走 1,000 公里',ic:'🌌',f:s=>s.km>=1000},
 {id:'c1000',n:'千城傳說',d:'打卡 1,000 座城市',ic:'✨',f:s=>s.cities>=1000}];
function stats(){const ids=Object.keys(S.checks);let notes=0,n=0,so=0;const vis=new Set();ids.forEach(id=>{const k=S.checks[id];if(k&&Array.isArray(k.notes))notes+=k.notes.length;const c=cById[id];if(!c)return;vis.add(c.cc);if(c.lat>0)n=1;else if(c.lat<0)so=1;});
 return {km:S.dist/1000,steps:stepsN(),cities:ids.length,vis:vis.size,done:doneCountries().length,notes,ns:!!(n&&so),start:!!S.start};}
const need=l=>Math.round(80*Math.pow(l,1.5));
const xpOf=(st,nt)=>Math.floor(st.km*10)+st.cities*60+st.done*150+st.notes*5+nt*40;
const lvOf=x=>{let l=1,r=x;while(r>=need(l)&&l<999){r-=need(l);l++;}return {l,cur:r,need:need(l),xp:x};};
const rank=l=>l>=60?'S':l>=40?'A':l>=25?'B':l>=15?'C':l>=10?'D':l>=5?'E':'F';
const curTitle=un=>{const e=un.find(t=>t.id===S.eq);return e?e.n:un.length?un[un.length-1].n:'見習冒險者';};
let Q=Promise.resolve();const enq=f=>{Q=Q.then(f).catch(e=>console.warn(e));};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let lastLv=null;
function progress(){const st=stats(),un=TITLES.filter(t=>t.f(st)),L0=lvOf(xpOf(st,un.length));
 $('lv').textContent=L0.l;$('xpbar').style.width=(100*L0.cur/L0.need).toFixed(1)+'%';$('xptxt').textContent=`${L0.cur.toLocaleString()} / ${L0.need.toLocaleString()} XP`;$('hrank').textContent=rank(L0.l);$('hname').textContent=S.name||'旅人';$('htitle').textContent='《'+curTitle(un)+'》';
 if(!Array.isArray(S.tl)){const old=S.dist>0||Object.keys(S.checks).length>0;S.tl=un.map(t=>t.id);S.lv=L0.l;save();if(old)setTimeout(()=>toast(`Lv ${L0.l}・${un.length} 個稱號`,{kicker:'📖 冒險紀錄已繼承'}),1200);return;}
 const nw=un.filter(t=>!S.tl.includes(t.id));let ch=false;
 if(nw.length){S.tl.push(...nw.map(t=>t.id));ch=true;nw.forEach(t=>enq(async()=>{toast(`「${esc(t.n)}」`,{kicker:'✨ 獲得稱號',badge:badge('gold',t.ic)});sfx.title();buzz('light');await sleep(2500);}));}
 if(L0.l>(S.lv||1)){const from=S.lv||1;S.lv=L0.l;ch=true;enq(()=>lvFx(from,L0.l,L0.need));}
 if(ch)save();}
// ---------- HUD ----------
const shown={};function anim(id,v,fmt){const el=$(id),from=shown[id]??0;if(from===v){el.textContent=fmt(v);return;}shown[id]=v;if(id!=='steps'&&id!=='km'){el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop');}
 cancelAnimationFrame(el._r);const t0=performance.now(),D=600;const f=t=>{const k=Math.min(1,(t-t0)/D),e=1-Math.pow(1-k,3);el.textContent=fmt(from+(v-from)*e);if(k<1)el._r=requestAnimationFrame(f);};el._r=requestAnimationFrame(f);}
const kfmt=v=>v>=10000?(v/1000).toFixed(1)+'k':Math.round(v).toLocaleString();
function hud(){anim('steps',stepsN(),kfmt);anim('km',S.dist/1000,v=>v>=1000?Math.round(v).toLocaleString():v.toFixed(2));anim('cnt',Object.keys(S.checks).length,v=>Math.round(v)+'');anim('ms',doneCountries().length,v=>Math.round(v)+'');progress();}
function toast(t,o={}){const e=$('toast');e.className='frame sm'+(o.big?' big':'');e.innerHTML=(o.badge||'')+'<div>'+(o.kicker?'<small>'+o.kicker+'</small>':'')+t+'</div>';void e.offsetWidth;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),o.big?3600:2600);}
let startHint=false;const arrT={};function hint(t){startHint=false;if(t)$('hint').textContent=t;$('hint').classList.toggle('show',!!t);}
// ---------- fx: stamp & level up ----------
const sparks=(n,delay)=>Array.from({length:n},()=>{const a=Math.random()*6.283,r=60+Math.random()*90;return `<i class="spark" style="--x:${(Math.cos(a)*r).toFixed(0)}px;--y:${(Math.sin(a)*r).toFixed(0)}px;animation-delay:${(delay+Math.random()*.25).toFixed(2)}s"></i>`;}).join('');
function overlay(el,html,ms,onShow){return new Promise(res=>{el.innerHTML=html;el.classList.remove('hide','out');let done=false;const close=()=>{if(done)return;done=true;el.classList.add('out');setTimeout(()=>{el.classList.add('hide');el.innerHTML='';res();},350);};el.onclick=close;setTimeout(close,ms);onShow&&onShow();});}
function stampFx(c){const d=new Date(),ds=`${d.getFullYear()} 年 ${d.getMonth()+1} 月 ${d.getDate()} 日`;
 const olds=Object.entries(S.checks).filter(([id])=>id!==c.id&&cById[id]).sort((a,b)=>b[1].d-a[1].d).slice(0,3).map(([id,v],i)=>{const p=[[2,0,-20],[190,64,16],[14,78,24]][i];return `<div class="old" style="left:${p[0]}px;top:${p[1]}px;transform:rotate(${p[2]}deg)">${seal(cById[id],v.d,i%2?'#2a3a9c':'#7a2a5a')}</div>`;}).join('');
 return overlay($('stamp'),`<div class="pp" id="pp"><div class="ph1">ADVENTURER'S PASSPORT</div><div class="ph2">冒險者護照</div><dl><dt>地點</dt><dd>${esc(c.n)}</dd><dt>國度</dt><dd>${esc(c.co)}</dd><dt>日期</dt><dd>${ds}</dd></dl><div class="area">${olds}<div class="burst"></div><div class="seal">${seal(c,d)}</div>${sparks(14,.62)}</div></div><div class="cap">印記已刻下！<small>+60 XP</small></div>`,3000,()=>{
  setTimeout(()=>sfx.stamp(),300);setTimeout(()=>{const p=$('pp');p&&p.classList.add('shake');buzz('heavy');},600);});}
function lvFx(from,to,nd){const m=$('medal');m.classList.remove('pop');void m.offsetWidth;m.classList.add('pop');
 return overlay($('lvup'),`<div class="lv"><div class="rays"></div>${MC('mc1')}${MC('mc2')}<div style="position:relative"><div class="t">LEVEL UP!</div><div class="n">Lv ${from} → <b>${to}</b></div><div class="r">冒險者等級 ${rank(to)}・下一級 ${nd.toLocaleString()} XP</div></div>${sparks(18,.3)}</div>`,3400,()=>{sfx.level();buzz('success');});}
// ---------- movement ----------
function setPos(ll,move){if(move&&!mode&&startHint)hint('');if(S.pos&&move){const d=hav(S.pos,ll);if(d<500000)S.dist+=d;}S.pos=ll;S.trail.push(ll);if(S.trail.length>3000)S.trail.shift();trailLine.setLatLngs(S.trail);
 if(!me)me=L.marker(ll,{icon:peg,zIndexOffset:1000}).addTo(map);else me.setLatLng(ll);save();hud();fog.draw();
 const near=cities.find(c=>!S.checks[c.id]&&hav(ll,[c.lat,c.lng])<25000);if(near&&Date.now()-(arrT[near.id]||0)>600000&&(arrT[near.id]=Date.now())){toast(`你抵達了 ${esc(near.n)}！點水晶即可打卡`,{kicker:'🔮 發現傳送點'});sfx.arrive();}}
let mode=null;
function setMode(m){mode=mode===m?null:m;$('bStart').classList.toggle('on',mode==='start');$('bDemo').classList.toggle('on',mode==='demo');hint(mode==='start'?'點地圖立下冒險起點':mode==='demo'?'模擬模式：點地圖讓勇者前往':'');}
const setStart=ll=>{S.start=ll;startMk.setLatLng(ll).addTo(map);S.trail=[];S.pos=null;setPos(ll,false);setMode(null);toast('起點已立下，冒險開始！',{kicker:'🚩 召喚完成'});sfx.title();};
map.on('click',e=>{const ll=[e.latlng.lat,e.latlng.lng];if(mode==='start')setStart(ll);else if(mode==='demo')walkTo(ll);});
let walkT=null;
function walkTo(to){if(!S.pos){setPos(to,false);return;}clearInterval(walkT);const from=S.pos,n=20;let i=0;const pe=me&&me.getElement();pe&&pe.classList.add('walk');const t=walkT=setInterval(()=>{i++;if(i>=n&&pe)setTimeout(()=>pe.classList.remove('walk'),200);setPos([from[0]+(to[0]-from[0])*i/n,from[1]+(to[1]-from[1])*i/n],true);if(i>=n)clearInterval(t);},40);}
$('bStart').onclick=()=>{setMode('start');if(!navigator.geolocation||mode!=='start')return;
 if(confirm('要使用目前 GPS 位置作為冒險起點嗎？\n（取消則點地圖手動設定）'))navigator.geolocation.getCurrentPosition(p=>{const ll=[p.coords.latitude,p.coords.longitude];setStart(ll);map.setView(ll,13);},()=>toast('無法取得定位，請點地圖設定'));};
let watch=null;
$('bGps').onclick=()=>{if(watch!==null){navigator.geolocation.clearWatch(watch);watch=null;$('bGps').classList.remove('on');toast('已停止追蹤');return;}
 if(!navigator.geolocation)return toast('此裝置不支援定位');watch=navigator.geolocation.watchPosition(p=>{if(p.coords.accuracy>50)return;const ll=[p.coords.latitude,p.coords.longitude];if(S.pos&&hav(S.pos,ll)<3)return;setPos(ll,true);},e=>toast('定位錯誤：'+e.message),{enableHighAccuracy:true,maximumAge:2000});$('bGps').classList.add('on');toast('水晶球開始追蹤你的足跡',{kicker:'🔮 追蹤'});};
$('bDemo').onclick=()=>{setMode('demo');sfx.tap();};
$('bDemo').querySelector('.ring').innerHTML=MCIN;
const BASES=[{l:osm,i:'🗺️',t:'細節'},{l:carto,i:'🧭',t:'CARTO'},{l:sat,i:'🛰️',t:'衛星'}].filter(b=>b.l!==carto||window.CARTO_API_KEY);let bi=0;
const setLB=()=>{const n=BASES[(bi+1)%BASES.length];$('bLayer').querySelector('span').textContent=n.t;document.body.classList.toggle('sat',BASES[bi].l===sat);};setLB();
$('bLayer').onclick=()=>{map.removeLayer(BASES[bi].l);bi=(bi+1)%BASES.length;BASES[bi].l.addTo(map);setLB();toast('圖層：'+BASES[bi].t,{kicker:BASES[bi].i+' 地圖卷軸'});};
// ---------- panels ----------
function panel(t,h){$('ptitle').textContent=t;$('pbody').innerHTML=h;$('panel').style.transform='';$('panel').classList.add('open');$('scrim').classList.add('show');}
const closeP=()=>{$('panel').style.transform='';$('panel').classList.remove('open');$('scrim').classList.remove('show');};$('pclose').onclick=closeP;$('scrim').onclick=closeP;
(()=>{let y0=null,dy=0;const P=$('panel');const st=e=>{y0=e.touches[0].clientY;dy=0;P.style.transition='none';},mv=e=>{if(y0===null)return;dy=Math.max(0,e.touches[0].clientY-y0);P.style.transform=`translateY(${dy}px)`;},en=()=>{if(y0===null)return;P.style.transition='';y0=null;if(dy>90)closeP();else P.style.transform='';};
 [$('handle'),P.querySelector('.ph')].forEach(h=>{h.addEventListener('touchstart',st,{passive:true});h.addEventListener('touchmove',mv,{passive:true});h.addEventListener('touchend',en);});})();
function openCity(c){const ck=S.checks[c.id];const cn=byCountry[c.cc],got=cn.list.filter(x=>S.checks[x.id]).length;
 panel(`${c.n}`,`<div class="sub">${ck?'✦ 已刻印的傳送點':'◇ 未啟動的傳送點'}・${esc(c.co)}${c.pop?'・人口 '+c.pop.toLocaleString():''}</div><div class="card" style="margin-bottom:10px"><small>國度探索進度</small><b>${got} / ${cn.list.length}</b><div class="pb"><i style="width:${100*got/cn.list.length}%"></i></div></div>
 ${ck?`<div class="stamps" style="grid-template-columns:1fr"><div class="st">${seal(c,ck.d)}${new Date(ck.d).toLocaleDateString('zh-TW')}</div></div><div class="sec">旅途回憶</div>`:''}
 ${(ck&&Array.isArray(ck.notes)?ck.notes:[]).map(m=>`<div class="memo">${esc(m.t)}<small>${new Date(m.d).toLocaleString('zh-TW')}</small></div>`).join('')}
 <textarea id="note" placeholder="寫下這裡的美好回憶…"></textarea><button class="btn" id="ckBtn">${ck?'✍️ 記下回憶（+5 XP）':'🔮 蓋下印記並留下回憶'}</button>`);
 $('ckBtn').onclick=()=>{const t=$('note').value.trim();const first=!S.checks[c.id];if(!first&&!t){$('note').focus();return;}
  S.checks[c.id]=S.checks[c.id]||{d:Date.now(),notes:[]};if(!Array.isArray(S.checks[c.id].notes))S.checks[c.id].notes=[];if(t)S.checks[c.id].notes.push({t,d:Date.now()});save();refreshCity(c);fog.draw();
  if(first){enq(()=>stampFx(c));if(byCountry[c.cc].list.every(x=>S.checks[x.id]))enq(async()=>{toast(`完成探索「${esc(c.co)}」`,{kicker:'👑 國度征服',badge:badge('gold','👑'),big:true});sfx.title();buzz('success');await sleep(3200);});}
  else{sfx.quill();toast('回憶已寫入護照',{kicker:'✍️ +5 XP'});}
  hud();openCity(c);};}
function guild(tab){tab=tab||'card';const st=stats(),un=TITLES.filter(t=>t.f(st)),L0=lvOf(xpOf(st,un.length));
 let h=`<div class="tabs">${[['card','冒險者卡'],['titles','稱號'],['quest','任務日誌'],['set','設定']].map(([k,n])=>`<button data-t="${k}" class="${k===tab?'on':''}">${n}</button>`).join('')}</div>`;
 if(tab==='card'){const recent=Object.entries(S.checks).filter(([id])=>cById[id]).sort((a,b)=>b[1].d-a[1].d).slice(0,6);const no=String(Math.abs([...String(S.since)].reduce((a,c)=>a*31+c.charCodeAt(0)|0,7))%1e6).padStart(6,'0');
  h+=`<div class="gcard">${MC('mc')}<div class="gh"><span>ADVENTURERS' GUILD</span><span>冒險者公會</span></div><div class="gb"><div class="por">${HERO}</div><div class="gi"><div class="rk">${rank(L0.l)}<small>RANK</small></div><div class="gn"><b>${esc(S.name||'旅人')}</b><button id="ren" aria-label="改名">✎</button></div><div class="gt">《${esc(curTitle(un))}》</div><div style="font:700 13px var(--ffh)">Lv ${L0.l}</div><div class="xpb"><i style="width:${(100*L0.cur/L0.need).toFixed(1)}%"></i><span>${L0.cur.toLocaleString()} / ${L0.need.toLocaleString()} XP</span></div></div></div>
  <div class="gs"><div><small>步數</small><b>${kfmt(st.steps)}</b></div><div><small>公里</small><b>${st.km.toFixed(2)}</b></div><div><small>總經驗</small><b>${L0.xp.toLocaleString()}</b></div><div><small>城市印記</small><b>${st.cities}</b></div><div><small>征服國度</small><b>${st.done}</b></div><div><small>稱號</small><b>${un.length}/${TITLES.length}</b></div></div>
  <div class="gf"><span>No. ${no}</span><span>登錄 ${new Date(S.since).toLocaleDateString('zh-TW')}</span></div></div>
  <div class="sec">護照印記</div>`+(recent.length?`<div class="stamps">${recent.map(([id,v])=>`<div class="st">${seal(cById[id],v.d)}${esc(cById[id].n)}</div>`).join('')}</div>`:`<div class="sub">尚無印記——前往水晶傳送點蓋下你的第一枚印記吧！</div>`)+
  `<div class="sec">經驗值來源</div><div class="sub">行走每公里 +10・城市印記 +60・征服國度 +150・回憶 +5・稱號 +40</div>`;}
 else if(tab==='titles'){h+=`<div class="sub" style="margin-top:10px">已解鎖 ${un.length} / ${TITLES.length}・點選已解鎖的稱號即可裝備</div>`+TITLES.map(t=>{const ok=un.includes(t);const eq=ok&&curTitle(un)===t.n;return `<div class="row${ok?'':' lock'}" ${ok?`data-eq="${t.id}"`:''}>${badge(ok?'gold':'grey',ok?t.ic:'🔒')}<div class="nm"><div><b style="font-family:var(--ffh)">${ok?t.n:'？？？'}</b></div><small style="color:var(--mut)">${t.d}</small></div>${eq?'<span class="eq">裝備中</span>':''}</div>`;}).join('');}
 else if(tab==='quest'){const rows=Object.entries(byCountry).map(([cc,v])=>({cc,v,g:v.list.filter(x=>S.checks[x.id]).length}));
  const ip=rows.filter(r=>r.g&&r.g<r.v.list.length).sort((a,b)=>b.g/b.v.list.length-a.g/a.v.list.length||b.g-a.g),dn=rows.filter(r=>r.g===r.v.list.length).sort((a,b)=>a.v.name.localeCompare(b.v.name)),un0=rows.filter(r=>!r.g).sort((a,b)=>a.v.name.localeCompare(b.v.name));
  const q=(r,kind)=>`<div class="row${kind==='new'?' lock':''}">${badge(kind==='done'?'gold':kind==='ip'?'done':'grey',kind==='done'?'👑':'📜')}<div class="nm"><div class="quest">${kind==='done'?'QUEST CLEAR・已達成':kind==='ip'?'MAIN QUEST・進行中':'UNDISCOVERED・未踏足'}</div><div><b>探索 ${esc(r.v.name)}</b></div><div class="pb"><i style="width:${100*r.g/r.v.list.length}%"></i></div></div><span class="ct">${r.g}/${r.v.list.length}<br><small>+150 XP</small></span></div>`;
  h+=`<div class="cards"><div class="card"><small>進行中</small><b>${ip.length}</b></div><div class="card"><small>已達成</small><b>${dn.length}</b></div><div class="card"><small>未踏足</small><b>${un0.length}</b></div></div>`+
  `<div class="sec">進行中的任務</div>`+(ip.length?ip.slice(0,60).map(r=>q(r,'ip')).join(''):'<div class="sub">尚未接下任務——前往任一水晶傳送點打卡吧！</div>')+
  (dn.length?`<div class="sec">已達成</div>`+dn.map(r=>q(r,'done')).join(''):'')+`<div class="sec">未踏足的國度</div>`+un0.slice(0,30).map(r=>q(r,'new')).join('')+(un0.length>30?`<div class="sub" style="margin-top:8px">還有 ${un0.length-30} 個國度等你探索…</div>`:'');}
 else{const sw=(k,n,d,on)=>`<div class="tog"><div>${n}<small>${d}</small></div><button class="sw${on?' on':''}" data-opt="${k}" aria-label="${n}"></button></div>`;
  h+=sw('snd','音效','打卡、升級與稱號的魔法音效',!S.opt.mute)+sw('hap','震動回饋','蓋印與升級時的觸感震動',S.opt.hap)+`<button class="btn ghost" id="tSnd">🔔 試聽蓋印音效</button><button class="btn ghost" id="tOnb">📖 重新觀看導覽</button><button class="btn danger" id="reset">重設所有資料</button>`;}
 panel('冒險者公會',h);
 $('pbody').querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>guild(b.dataset.t));
 $('pbody').querySelectorAll('[data-eq]').forEach(b=>b.onclick=()=>{S.eq=b.dataset.eq;save();hud();sfx.tap();guild('titles');});
 $('pbody').querySelectorAll('[data-opt]').forEach(b=>b.onclick=()=>{if(b.dataset.opt==='snd')S.opt.mute=!S.opt.mute;else S.opt.hap=!S.opt.hap;save();if(!S.opt.mute)sfx.tap();if(b.dataset.opt==='hap')buzz('light');guild('set');});
 const r=$('ren');r&&(r.onclick=()=>{const v=prompt('冒險者名稱',S.name||'旅人');if(v&&v.trim()){S.name=v.trim().slice(0,16);save();hud();guild('card');}});
 $('tSnd')&&($('tSnd').onclick=()=>{sfx.stamp();buzz('heavy');});$('tOnb')&&($('tOnb').onclick=()=>{closeP();showOnb();});
 $('reset')&&($('reset').onclick=()=>{if(confirm('確定要清除所有進度？')){localStorage.removeItem('fogmap');location.reload();}});}
$('bAch').onclick=()=>guild('card');$('medal').onclick=()=>guild('card');
// ---------- boot ----------
if(S.start)startMk.setLatLng(S.start).addTo(map);if(S.pos)me=L.marker(S.pos,{icon:peg,zIndexOffset:1000}).addTo(map);
hud();if(!S.start&&!S.pos){hint('點「起點」立下你的冒險起點');startHint=true;}
$('onbArt').innerHTML=MC('mc')+`<div class="hero">${HERO.replace('width="44" height="60"','width="66" height="90"')}</div>`;
function showOnb(){const o=$('onb');o.classList.remove('hide');let i=0;const ss=o.querySelectorAll('.onb-s'),ds=o.querySelectorAll('.dots i'),N=ss.length;ss.forEach((s,j)=>s.classList.toggle('on',!j));ds.forEach((s,j)=>s.classList.toggle('on',!j));$('onbNext').textContent='下一步';
 const fin=()=>{localStorage.setItem('fogmap_onb','1');o.classList.add('hide');};
 $('onbNext').onclick=()=>{if(i>=N-1)return fin();ss[i].classList.remove('on');ds[i].classList.remove('on');i++;ss[i].classList.add('on');ds[i].classList.add('on');if(i===N-1)$('onbNext').textContent='踏上冒險';};$('onbSkip').onclick=fin;}
if(!localStorage.getItem('fogmap_onb'))showOnb();
window.FogApp={S,save,setPos,hud,toast,hav,$,sfx,buzz,_test:{stampFx:c=>stampFx(cById[c]||cities[0]),lvFx,guild,cities}};
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
