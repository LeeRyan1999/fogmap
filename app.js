(async()=>{
const V=(document.currentScript&&new URL(document.currentScript.src,location.href).searchParams.get('v'))||'0';
const $=id=>document.getElementById(id);
const badge=(kind,label)=>{const g=kind==='gold'?['#fff3c4','#e9b949','#a8670c']:kind==='done'?['#fff3c4','#e9b949','#a8670c']:['#f3efe6','#cfc4ad','#8b7f69'];const id='g'+Math.random().toString(36).slice(2,7);
 return `<svg class="bd" viewBox="0 0 64 64"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${g[0]}"/><stop offset=".55" stop-color="${g[1]}"/><stop offset="1" stop-color="${g[2]}"/></linearGradient></defs><path d="M20 40 L14 62 L24 56 L32 62 L30 42Z M44 40 L50 62 L40 56 L32 62 L34 42Z" fill="${kind==='gold'?'#c0392b':'#7f8c8d'}" opacity=".85"/><polygon points="32,2 40,8 50,8 53,18 60,24 56,33 58,43 48,46 42,54 32,50 22,54 16,46 6,43 8,33 4,24 11,18 14,8 24,8" fill="url(#${id})" stroke="${g[2]}" stroke-width="1.5"/><circle cx="32" cy="27" r="15" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2"/><text x="32" y="33" text-anchor="middle" font-size="17">${label}</text></svg>`;};
const S=(()=>{const D={start:null,pos:null,dist:0,trail:[],checks:{}};const raw=localStorage.getItem('fogmap');let o=null;try{o=JSON.parse(raw||'null');}catch(e){try{localStorage.setItem('fogmap_bak',raw);}catch(_){}console.warn('fogmap: corrupt saved state, backed up to fogmap_bak');}
 if(!o||typeof o!=='object'||Array.isArray(o))o={};o=Object.assign(D,o);if(!Array.isArray(o.trail))o.trail=[];if(!o.checks||typeof o.checks!=='object')o.checks={};if(typeof o.dist!=='number'||!isFinite(o.dist))o.dist=0;if(!o.poi||typeof o.poi!=='object'||Array.isArray(o.poi))o.poi={};return o;})();
const save=()=>localStorage.setItem('fogmap',JSON.stringify(S));
const PIN='<svg viewBox="0 0 24 32"><path d="M12 1C6 1 1.5 5.5 1.5 11.2 1.5 19 12 31 12 31s10.5-12 10.5-19.8C22.5 5.5 18 1 12 1z"/><circle cx="12" cy="11" r="4"/></svg>';
const cityIcon=d=>L.divIcon({className:'',iconSize:[16,21],iconAnchor:[8,20],html:`<div class="pin city${d?' done':''}">${PIN}</div>`});
const map=L.map('map',{zoomControl:false,worldCopyJump:true,minZoom:2,maxZoom:20}).setView(S.pos||[23.7,121],S.pos?8:3);
const k=window.CARTO_API_KEY?('?key='+encodeURIComponent(window.CARTO_API_KEY)):'';
const attr='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';
const osmAttr='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
// 有可用的 CARTO 金鑰時用 CARTO Voyager（含街道與標籤）；否則用 OpenStreetMap 標準圖層（最詳細的免費選項，含 POI）
const osm=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:osmAttr,maxNativeZoom:19,maxZoom:20,crossOrigin:true,keepBuffer:4,updateWhenZooming:false,updateWhenIdle:L.Browser.mobile});
const carto=L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'+k,{attribution:attr,subdomains:'abcd',maxNativeZoom:20,maxZoom:20,crossOrigin:true,keepBuffer:4,updateWhenZooming:false,updateWhenIdle:L.Browser.mobile});
osm.addTo(map);
const esriSat=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{attribution:'Tiles &copy; Esri, Maxar, Earthstar Geographics',maxNativeZoom:19,maxZoom:20,crossOrigin:true,keepBuffer:4,updateWhenZooming:false,updateWhenIdle:L.Browser.mobile});
const satLabels=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',{maxNativeZoom:19,maxZoom:20,crossOrigin:true,keepBuffer:4,updateWhenZooming:false,updateWhenIdle:L.Browser.mobile});
const satRoads=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',{maxNativeZoom:19,maxZoom:20,crossOrigin:true,keepBuffer:4,updateWhenZooming:false,updateWhenIdle:L.Browser.mobile});
const sat=L.layerGroup([esriSat,satRoads,satLabels]);
// ---- fast start: map + tiles first, then load city/region data and plugins ----
const loadScript=src=>new Promise((res,rej)=>{const s=document.createElement('script');s.src=src+(src.includes('?')?'&':'?')+'v='+V;s.async=false;s.onload=res;s.onerror=()=>rej(new Error('load '+src));document.head.appendChild(s);});
if('serviceWorker' in navigator){const hadCtl=!!navigator.serviceWorker.controller;let rl=false;
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(hadCtl&&!rl){rl=true;location.reload();}});
 navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(r=>{document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')r.update().catch(()=>{});});}).catch(()=>{});}
await new Promise(res=>{let done=false;const go=()=>{if(!done){done=true;res();}};osm.once('tileload load',go);carto.once('tileload load',go);setTimeout(go,700);});
await Promise.all(['vendor/leaflet.markercluster.js','cities.js','data/regions.js'].map(loadScript));
const _ids={};const cities=window.CITIES.map(c=>{let id=c.cc+'-'+c.n;if(_ids[id])id+='@'+c.lat+','+c.lng;_ids[id]=1;return {...c,id};});
const cById={};cities.forEach(c=>cById[c.id]=c);const byCountry={};cities.forEach(c=>(byCountry[c.cc]=byCountry[c.cc]||{name:c.co,list:[]}).list.push(c));
// Fog of war
const Fog=L.Layer.extend({onAdd(m){this.c=L.DomUtil.create('canvas');Object.assign(this.c.style,{position:'absolute',pointerEvents:'none'});m.getPane('overlayPane').appendChild(this.c);m.on('moveend zoomend resize viewreset',this.draw,this);this.draw();},
draw(){const m=map,s=m.getSize(),tl=m.containerPointToLayerPoint([0,0]);L.DomUtil.setPosition(this.c,tl);this.c.width=s.x;this.c.height=s.y;const g=this.c.getContext('2d');
const dk=matchMedia('(prefers-color-scheme: dark)').matches;const fg=g.createLinearGradient(0,0,0,s.y);fg.addColorStop(0,dk?'rgba(10,12,20,.62)':'rgba(70,78,96,.5)');fg.addColorStop(1,dk?'rgba(20,16,30,.68)':'rgba(92,84,110,.56)');g.fillStyle=fg;g.fillRect(0,0,s.x,s.y);g.globalCompositeOperation='destination-out';
const hole=(ll,km)=>{const p=m.latLngToContainerPoint(ll),p2=m.latLngToContainerPoint([ll[0]+km/111,ll[1]]);const r=1.3*Math.max(10,Math.abs(p.y-p2.y));const gr=g.createRadialGradient(p.x,p.y,0,p.x,p.y,r);gr.addColorStop(0,'#000');gr.addColorStop(.45,'rgba(0,0,0,.95)');gr.addColorStop(.7,'rgba(0,0,0,.6)');gr.addColorStop(.88,'rgba(0,0,0,.2)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(p.x,p.y,r,0,7);g.fill();};
S.trail.forEach(t=>hole(t,3));if(S.start)hole(S.start,30);if(S.pos)hole(S.pos,10);cities.forEach(c=>S.checks[c.id]&&hole([c.lat,c.lng],60));Object.values(S.poi).forEach(p=>p&&isFinite(p.lat)&&isFinite(p.lng)&&hole([p.lat,p.lng],15));g.globalCompositeOperation='source-over';}});
const fog=new Fog().addTo(map);window.fogmap=map;
const _dm=matchMedia('(prefers-color-scheme: dark)');_dm.addEventListener&&_dm.addEventListener('change',()=>fog.draw());
// Pegman avatar
const peg=L.divIcon({className:'peg',iconSize:[36,54],iconAnchor:[18,50],html:`<svg width="36" height="54" viewBox="0 0 36 54" overflow="visible"><ellipse class="shadow" cx="18" cy="50" rx="9" ry="3" fill="#000" opacity=".3"/><g class="bob">
<path d="M12 33 l-1 13 a2.5 2.5 0 0 0 5 0 l1-9 1 9 a2.5 2.5 0 0 0 5 0 l-1-13z" fill="#e0a21e" stroke="#9a6a08" stroke-width="1.2"/>
<path d="M9 19 q9-5 18 0 l1 14 q-10 4-20 0z" fill="#ffc531" stroke="#9a6a08" stroke-width="1.2"/>
<path d="M9 20 l-3 10 a2 2 0 0 0 4 1 l2-7z M27 20 l3 10 a2 2 0 0 1 -4 1 l-2-7z" fill="#f2b322" stroke="#9a6a08" stroke-width="1.2"/>
<path d="M8 22 l3 -2 l1 12 l-4 0z" fill="#b5442d" opacity=".9"/>
<circle cx="18" cy="10" r="7.5" fill="#ffc531" stroke="#9a6a08" stroke-width="1.2"/><circle cx="15.5" cy="7.5" r="2.2" fill="#fff" opacity=".6"/></g></svg>`});
let me=null;const startMk=L.marker([0,0],{icon:L.divIcon({className:'',iconSize:[30,34],iconAnchor:[6,32],html:'<svg width="30" height="34" viewBox="0 0 30 34"><path d="M5 2v30" stroke="#5a3a10" stroke-width="3" stroke-linecap="round"/><path d="M6 3h20l-5 6 5 6H6z" fill="#c0392b" stroke="#7a1f15"/></svg>'})});
const trailLine=L.polyline(S.trail,{color:'#c8871a',weight:4,opacity:.85,dashArray:'1 8',lineCap:'round'}).addTo(map);
const cityLayer=L.markerClusterGroup({chunkedLoading:true,disableClusteringAtZoom:10,maxClusterRadius:60,showCoverageOnHover:false,removeOutsideVisibleBounds:true,iconCreateFunction:cl=>{const n=cl.getChildCount(),has=cl.getAllChildMarkers().some(m=>m.options.done);return L.divIcon({className:'',iconSize:[22,28],iconAnchor:[11,27],html:`<div class="pin clu${has?' done':''}">${PIN}<span class="cnt">${n>999?(n/1000).toFixed(1)+'k':n}</span></div>`});}}).addTo(map);const cMk={};
cities.forEach(c=>{cMk[c.id]=L.marker([c.lat,c.lng],{title:c.n,done:!!S.checks[c.id],icon:cityIcon(S.checks[c.id])}).on('click',()=>openCity(c));});cityLayer.addLayers(Object.values(cMk));
const refreshCity=c=>{const m=cMk[c.id];m.options.done=true;m.setIcon(cityIcon(true));if(cityLayer.hasLayer(m))cityLayer.refreshClusters(m);};
const hav=(a,b)=>{const R=6371e3,r=Math.PI/180,dl=(b[0]-a[0])*r,dn=(b[1]-a[1])*r,x=Math.sin(dl/2)**2+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(x));};
const doneCountries=()=>Object.keys(byCountry).filter(cc=>byCountry[cc].list.every(c=>S.checks[c.id]));
const shown={};function anim(id,v,fmt){const el=$(id),from=shown[id]??0;if(from===v){el.textContent=fmt(v);return;}shown[id]=v;if(Math.abs(v-from)>0&&id!=='steps'&&id!=='km'){el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop');}
 cancelAnimationFrame(el._r);const t0=performance.now(),D=600;const f=t=>{const k=Math.min(1,(t-t0)/D),e=1-Math.pow(1-k,3);el.textContent=fmt(from+(v-from)*e);if(k<1)el._r=requestAnimationFrame(f);};el._r=requestAnimationFrame(f);}
const kfmt=v=>v>=10000?(v/1000).toFixed(1)+'k':Math.round(v).toLocaleString();
function hud(){anim('steps',S.stepSrc==='native'?(S.nsteps||0):Math.round(S.dist/0.75),kfmt);anim('km',S.dist/1000,v=>v>=1000?Math.round(v).toLocaleString():v.toFixed(2));anim('cnt',Object.keys(S.checks).length,v=>Math.round(v)+'');anim('ms',doneCountries().length,v=>Math.round(v)+'');$('vcnt').textContent=sovVisited();$('vtot').textContent=SOVN;$('ecnt').textContent=doneCountries().length;}
function toast(t,o={}){const e=$('toast');e.className='glass'+(o.big?' big':'');e.innerHTML=(o.badge||'')+'<div>'+(o.kicker?'<small>'+o.kicker+'</small>':'')+t+'</div>';void e.offsetWidth;e.classList.add('show');if(navigator.vibrate&&o.badge)navigator.vibrate(30);clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),o.big?3600:2600);}
const arrT={};function hint(t){if(t)$('hint').textContent=t;$('hint').classList.toggle('show',!!t);}
function setPos(ll,move){if(move&&!mode&&$('hint').textContent.startsWith('點「🚩'))hint('');if(S.pos&&move){const d=hav(S.pos,ll);if(d<500000)S.dist+=d;}S.pos=ll;S.trail.push(ll);if(S.trail.length>3000)S.trail.shift();trailLine.setLatLngs(S.trail);
 if(!me)me=L.marker(ll,{icon:peg,zIndexOffset:1000}).addTo(map);else me.setLatLng(ll);save();hud();fog.draw();
 const near=cities.find(c=>!S.checks[c.id]&&hav(ll,[c.lat,c.lng])<25000);if(near&&Date.now()-(arrT[near.id]||0)>600000&&(arrT[near.id]=Date.now()))toast(`你抵達了 ${esc(near.n)}！點城市即可打卡`,{kicker:'📍 新地點'});}
let mode=null;
function setMode(m){mode=mode===m?null:m;$('bStart').classList.toggle('on',mode==='start');$('bDemo').classList.toggle('on',mode==='demo');hint(mode==='start'?'點地圖設定出發點':mode==='demo'?'模擬模式：點地圖讓小人走過去':'');}
map.on('click',e=>{const ll=[e.latlng.lat,e.latlng.lng];if(mode==='start'){S.start=ll;startMk.setLatLng(ll).addTo(map);S.trail=[];S.pos=null;setPos(ll,false);setMode(null);toast('出發點已設定，冒險開始！',{kicker:'🚩 出發'});}
 else if(mode==='demo'){walkTo(ll);}});
let walkT=null;
function walkTo(to){if(!S.pos){setPos(to,false);return;}clearInterval(walkT);const from=S.pos,n=20;let i=0;const pe=me&&me.getElement();pe&&pe.classList.add('walk');const t=walkT=setInterval(()=>{i++;if(i>=n&&pe)setTimeout(()=>pe.classList.remove('walk'),200);setPos([from[0]+(to[0]-from[0])*i/n,from[1]+(to[1]-from[1])*i/n],true);if(i>=n)clearInterval(t);},40);}
$('bStart').onclick=()=>{if(!navigator.geolocation){setMode('start');return;}setMode('start');
 if(confirm('要使用目前 GPS 位置作為出發點嗎？\n（取消則點地圖手動設定）'))navigator.geolocation.getCurrentPosition(p=>{const ll=[p.coords.latitude,p.coords.longitude];S.start=ll;startMk.setLatLng(ll).addTo(map);S.trail=[];S.pos=null;setPos(ll,false);map.setView(ll,13);setMode(null);toast('出發點已設定，冒險開始！',{kicker:'🚩 出發'});},()=>toast('無法取得定位，請點地圖設定'));};
let watch=null;
$('bGps').onclick=()=>{if(watch!==null){navigator.geolocation.clearWatch(watch);watch=null;$('bGps').classList.remove('on');toast('已停止追蹤');return;}
 if(!navigator.geolocation)return toast('此裝置不支援定位');watch=navigator.geolocation.watchPosition(p=>{if(p.coords.accuracy>50)return;const ll=[p.coords.latitude,p.coords.longitude];if(S.pos&&hav(S.pos,ll)<3)return;setPos(ll,true);},e=>toast('定位錯誤：'+e.message),{enableHighAccuracy:true,maximumAge:2000});$('bGps').classList.add('on');toast('開始追蹤步數 🚶');};
$('bDemo').onclick=()=>setMode('demo');
const BASES=[{l:osm,i:'🗺️',t:'細節'},{l:carto,i:'🧭',t:'CARTO'},{l:sat,i:'🛰️',t:'衛星'}].filter(b=>b.l!==carto||window.CARTO_API_KEY);let bi=0;
const setLB=()=>{const n=BASES[(bi+1)%BASES.length];$('bLayer').innerHTML=`<i>${n.i}</i><span>${n.t}</span>`;document.body.classList.toggle('sat',BASES[bi].l===sat);};setLB();
$('bLayer').onclick=()=>{map.removeLayer(BASES[bi].l);bi=(bi+1)%BASES.length;BASES[bi].l.addTo(map);setLB();toast('圖層：'+BASES[bi].t,{kicker:BASES[bi].i+' 地圖'});};
function panel(t,h,half){$('panel').classList.toggle('half',!!half);$('ptitle').textContent=t;$('pbody').innerHTML=h;$('panel').style.transform='';$('panel').classList.add('open');$('scrim').classList.add('show');}
const closeP=()=>{$('panel').style.transform='';$('panel').classList.remove('open');$('scrim').classList.remove('show');};$('pclose').onclick=closeP;$('scrim').onclick=closeP;
(()=>{let y0=null,dy=0;const P=$('panel');const st=e=>{y0=e.touches[0].clientY;dy=0;P.style.transition='none';},mv=e=>{if(y0===null)return;dy=Math.max(0,e.touches[0].clientY-y0);P.style.transform=`translateY(${dy}px)`;},en=()=>{if(y0===null)return;P.style.transition='';y0=null;if(dy>90)closeP();else P.style.transform='';};
 [$('handle'),P.querySelector('.ph')].forEach(h=>{h.addEventListener('touchstart',st,{passive:true});h.addEventListener('touchmove',mv,{passive:true});h.addEventListener('touchend',en);});})();
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function openCity(c){const ck=S.checks[c.id];const cn=byCountry[c.cc],got=cn.list.filter(x=>S.checks[x.id]).length;
 panel(`${ck?'🏅':'📍'} ${c.n}`,`<div class="sub">${esc(c.co)}${c.pop?'・人口 '+c.pop.toLocaleString():''}</div><div class="card" style="margin-bottom:10px"><small>國家探索進度</small><b style="font-size:16px">${got} / ${cn.list.length}</b><div class="pb"><i style="width:${100*got/cn.list.length}%"></i></div></div>${ck?'<div class="sec">我的回憶</div>':''}
 ${(ck?ck.notes:[]).map(m=>`<div class="memo">${esc(m.t)}<small>${new Date(m.d).toLocaleString('zh-TW')}</small></div>`).join('')}
 <textarea id="note" placeholder="寫下這裡的美好回憶…"></textarea><button class="btn" id="ckBtn">${ck?'✍️ 新增回憶':'🏰 打卡並留下回憶'}</button>`);
 $('ckBtn').onclick=()=>{const t=$('note').value.trim();const first=!S.checks[c.id];const wasVis=visitedSet().has(c.cc),ab=achOn();S.checks[c.id]=S.checks[c.id]||{d:Date.now(),notes:[]};if(t)S.checks[c.id].notes.push({t,d:Date.now()});save();refreshCity(c);hud();fog.draw();refreshChoro();
  if(first)celebrate(c.cc,wasVis,ab,{city:1,n:c.n,k:'🏅 成就解鎖',ic:'🏰'});openCity(c);};}
$('bAch').onclick=()=>{const rows=Object.entries(byCountry).map(([cc,v])=>({cc,v,g:v.list.filter(x=>S.checks[x.id]).length})).sort((a,b)=>b.g/b.v.list.length-a.g/a.v.list.length||b.g-a.g||a.v.name.localeCompare(b.v.name));
 const done=rows.filter(r=>r.g===r.v.list.length),nc=Object.keys(S.checks).length;
 const recent=Object.entries(S.checks).sort((a,b)=>b[1].d-a[1].d).slice(0,6).map(([id])=>cById[id]).filter(Boolean);
 panel('🏆 冒險日誌',`<div class="cards"><div class="card"><small>👣 步數</small><b>${(S.stepSrc==='native'?(S.nsteps||0):Math.round(S.dist/0.75)).toLocaleString()}</b></div><div class="card"><small>🧭 公里</small><b>${(S.dist/1000).toFixed(2)}</b></div><div class="card"><small>🏰 城市成就</small><b>${nc}<small> / ${cities.length}</small></b></div><div class="card"><small>👑 國家里程碑</small><b>${done.length}<small> / ${rows.length}</small></b></div><div class="card"><small>🌍 已拜訪國家</small><b>${sovVisited()}<small> / ${SOVN}</small></b></div><div class="card"><small>✈️ 機場 ・ ⚓ 港口</small><b>${poiCnt('a')}<small> ・ </small>${poiCnt('p')}</b></div></div>`+
 `<div class="sub">「已拜訪」＝在該國任一打卡點（城市、機場或港口）打卡；「已探索」＝該國所有城市都已打卡，即國家里程碑。</div><div class="sec">探索成就</div>`+ACH.map(a=>{const v=a.v(),ok=v>=a.g;return `<div class="row">${badge(ok?'gold':'grey',a.ic)}<div class="nm"><div><b>${a.n}</b></div><small style="color:var(--mut)">${a.d}</small><div class="pb"><i style="width:${Math.min(100,100*v/a.g)}%"></i></div></div><span class="ct">${Math.min(v,a.g)}/${a.g}</span></div>`;}).join('')+
 (recent.length?`<div class="sec">最近解鎖</div>`+recent.map(c=>`<div class="row">${badge('done','🏰')}<div class="nm"><div><b>${esc(c.n)}</b></div><small style="color:var(--mut)">${esc(c.co)}</small></div></div>`).join(''):'')+
 `<div class="sec">各國進度</div>`+rows.slice(0,80).map(r=>{const f=r.g===r.v.list.length;return `<div class="row">${badge(f?'gold':r.g?'done':'grey',f?'👑':'🌐')}<div class="nm"><div>${esc(r.v.name)}</div><div class="pb"><i style="width:${100*r.g/r.v.list.length}%"></i></div></div><span class="ct">${r.g}/${r.v.list.length}</span></div>`;}).join('')+
 (rows.length>80?`<div class="sub" style="margin-top:8px">還有 ${rows.length-80} 個國家等你探索…</div>`:'')+
 `<button class="btn danger" id="reset">重設所有資料</button>`);
 $('reset').onclick=()=>{if(confirm('確定要清除所有進度？')){localStorage.removeItem('fogmap');location.reload();}};};
// ===== Regions / airports / ports / choropleth =====
const R=window.REGIONS||{cont:[],subzh:{},cc:{},sov:[],poi:{}};const CN=window.COUNTRIES||{};
const regOf=cc=>R.cc[cc]||['AN','Antarctica'];const CONT={};R.cont.forEach(([k,zh,en,subs])=>CONT[k]={zh,en,subs});
const CICON={AS:'🌏',EU:'🏰',AF:'🦁',NA:'🗽',SA:'🌎',OC:'🏝️',AN:'🧊'};
const ALLCC=Object.keys(R.cc);const ccsOf=(k,s)=>ALLCC.filter(cc=>R.cc[cc][0]===k&&(!s||R.cc[cc][1]===s));
const flag=cc=>/^[A-Z]{2}$/.test(cc)?String.fromCodePoint(...[...cc].map(ch=>127397+ch.charCodeAt(0))):'🏳️';
const cname=cc=>(byCountry[cc]&&byCountry[cc].name)||CN[cc]||cc;
let visK='',visV=new Set();
const visitedSet=()=>{const k=Object.keys(S.checks).length+':'+Object.keys(S.poi).length;if(k!==visK){visK=k;visV=new Set();Object.keys(S.checks).forEach(id=>{const c=cById[id];c&&visV.add(c.cc);});Object.values(S.poi).forEach(p=>p&&p.cc&&visV.add(p.cc));}return visV;};
const SOV=new Set(R.sov),SOVN=SOV.size;
const sovVisited=()=>[...visitedSet()].filter(c=>SOV.has(c)).length;
const poiCnt=t=>Object.values(S.poi).filter(p=>p&&p.t===t).length;
const contVisited=()=>new Set([...visitedSet()].map(cc=>regOf(cc)[0])).size;
const regStat=ccs=>{const vs=visitedSet(),ds=new Set(doneCountries());let o={n:ccs.length,vis:0,exp:0,cd:0,ct:0,pd:0,pt:0};const set=new Set(ccs);
 ccs.forEach(cc=>{if(vs.has(cc))o.vis++;if(ds.has(cc))o.exp++;const l=byCountry[cc]?byCountry[cc].list:[];o.ct+=l.length;l.forEach(c=>{if(S.checks[c.id])o.cd++;});const pi=R.poi[cc];if(pi)o.pt+=pi[0]+pi[1];});
 Object.values(S.poi).forEach(p=>{if(p&&set.has(p.cc))o.pd++;});return o;};
// achievements for new checkpoint types
const ACH=[{id:'a1',n:'首座機場',d:'在第一座機場打卡',ic:'✈️',v:()=>poiCnt('a'),g:1},{id:'a10',n:'空中飛人',d:'在 10 座機場打卡',ic:'🛫',v:()=>poiCnt('a'),g:10},
 {id:'p1',n:'首座港口',d:'在第一座港口打卡',ic:'⚓',v:()=>poiCnt('p'),g:1},{id:'p10',n:'七海航海家',d:'在 10 座港口打卡',ic:'🚢',v:()=>poiCnt('p'),g:10},
 {id:'v10',n:'環遊十國',d:'拜訪 10 個國家',ic:'🌍',v:sovVisited,g:10},{id:'c5',n:'五大洲旅人',d:'拜訪 5 個大洲',ic:'🧭',v:contVisited,g:5}];
const achOn=()=>new Set(ACH.filter(a=>a.v()>=a.g).map(a=>a.id));
// after any first check-in: milestone > new achievement > new country > default
function celebrate(cc,wasVis,achBefore,def){const all=byCountry[cc]&&byCountry[cc].list.every(x=>S.checks[x.id]);const na=ACH.filter(a=>!achBefore.has(a.id)&&a.v()>=a.g);
 if(all&&def.city)return toast(`完成探索「${esc(cname(cc))}」`,{kicker:'👑 里程碑達成',badge:badge('gold','👑'),big:true});
 if(na.length)return toast(esc(na[0].n),{kicker:'🏆 成就解鎖',badge:badge('gold',na[0].ic),big:true});
 if(!wasVis)return toast(`首次拜訪「${esc(cname(cc))}」`,{kicker:'🌍 新國家',badge:badge('done',flag(cc))});
 toast(esc(def.n),{kicker:def.k,badge:badge('done',def.ic)});}
// choropleth
map.createPane('choro');map.getPane('choro').style.zIndex=450;map.getPane('choro').style.pointerEvents='none';
let choro=null,filt=null;
const choroStyle=f=>{const cc=f.properties.cc,v=visitedSet().has(cc),e=doneCountries().includes(cc),hl=filt&&filt.has(cc);
 if(e)return {stroke:true,color:'#a8670c',weight:hl?2.2:1,opacity:.85,fill:true,fillColor:'#c8871a',fillOpacity:.5,dashArray:null};
 if(v)return {stroke:true,color:'#d9a33a',weight:hl?2.2:.9,opacity:.85,fill:true,fillColor:'#e9b949',fillOpacity:.38,dashArray:null};
 if(hl)return {stroke:true,color:'#2f6f5e',weight:1.6,opacity:.9,fill:true,fillColor:'#2f6f5e',fillOpacity:.08,dashArray:'4 4'};
 return {stroke:false,fill:false};};
const refreshChoro=()=>{choro&&choro.setStyle(choroStyle);};
(window.requestIdleCallback||(f=>setTimeout(f,1200)))(()=>fetch('data/countries.json?v='+V).then(r=>{if(!r.ok)throw new Error(r.status);return r.json();}).then(gj=>{choro=L.geoJSON(gj,{pane:'choro',interactive:false,style:choroStyle}).addTo(map);}).catch(e=>console.warn('choropleth',e)),{timeout:2500});
// airports & ports (lazy per country)
const poiCache={},poiMk={},poiRec={};
const GL={a:'✈\uFE0E',p:'⚓\uFE0E'};
const poiIcon=(t,d)=>L.divIcon({className:'',iconSize:[20,20],iconAnchor:[10,10],html:`<div class="poi ${t}${d?' done':''}">${GL[t]}</div>`});
const poiLayer=L.markerClusterGroup({disableClusteringAtZoom:9,maxClusterRadius:45,showCoverageOnHover:false,removeOutsideVisibleBounds:true,iconCreateFunction:cl=>{const n=cl.getChildCount(),d=cl.getAllChildMarkers().some(m=>m.options.done);return L.divIcon({className:'',iconSize:[26,26],iconAnchor:[13,13],html:`<div class="poi clu${d?' done':''}">${GL.a}<small>${n}</small></div>`});}});
let poiT=null;const refreshPoiLayer=()=>{clearTimeout(poiT);poiT=setTimeout(()=>{poiLayer.clearLayers();poiLayer.addLayers(Object.values(poiRec).filter(p=>!filt||filt.has(p.cc)).map(p=>poiMk[p.id]));},60);};
function loadPoi(cc){if(poiCache[cc])return poiCache[cc];const pi=R.poi[cc];if(!pi||!(pi[0]+pi[1]))return Promise.resolve({a:[],p:[]});
 return poiCache[cc]=fetch(`data/poi/${cc}.json?v=${V}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json();}).then(d=>{
  d.a.forEach(a=>{const id='A-'+a[0];if(poiRec[id])return;poiRec[id]={id,t:'a',code:a[0],n:a[1],city:a[2],lat:a[3],lng:a[4],big:a[5],cc};});
  d.p.forEach(p=>{const id='P-'+p[0].slice(1);if(poiRec[id])return;poiRec[id]={id,t:'p',n:p[1],lat:p[2],lng:p[3],big:p[4],cc};});
  Object.values(poiRec).forEach(p=>{if(p.cc===cc&&!poiMk[p.id])poiMk[p.id]=L.marker([p.lat,p.lng],{title:p.n,done:!!S.poi[p.id],icon:poiIcon(p.t,!!S.poi[p.id])}).on('click',()=>openPoi(p));});
  refreshPoiLayer();return d;}).catch(e=>{delete poiCache[cc];console.warn('poi',cc,e);return {a:[],p:[]};});}
const poiVis=()=>{const want=map.getZoom()>=5||(filt&&filt.size<=3);if(want&&!map.hasLayer(poiLayer))poiLayer.addTo(map);else if(!want&&map.hasLayer(poiLayer))map.removeLayer(poiLayer);
 if(map.getZoom()>=5){const b=map.getBounds().pad(.2);ALLCC.forEach(cc=>{const pi=R.poi[cc];if(pi&&pi.length>2&&(!filt||filt.has(cc))&&b.intersects([[pi[2],pi[3]],[pi[4],pi[5]]]))loadPoi(cc);});}};
map.on('zoomend moveend',poiVis);
// filter + fly
function setFilter(ccs,label){filt=ccs?new Set(ccs):null;cityLayer.clearLayers();cityLayer.addLayers(cities.filter(c=>!filt||filt.has(c.cc)).map(c=>cMk[c.id]));refreshPoiLayer();refreshChoro();poiVis();
 const ch=$('chip');if(filt){ch.innerHTML=`🔎 ${esc(label)}<b>✕</b>`;ch.classList.add('show');}else ch.classList.remove('show');}
$('chip').onclick=()=>setFilter(null);
function flyTo(ccs){const pts=[];ccs.forEach(cc=>{(byCountry[cc]?byCountry[cc].list:[]).forEach(c=>pts.push([c.lat,c.lng]));const pi=R.poi[cc];if(pi&&pi.length>2){pts.push([pi[2],pi[3]],[pi[4],pi[5]]);}});if(!pts.length)return;
 const span=a=>{let lo=1e9,hi=-1e9;a.forEach(p=>{lo=Math.min(lo,p[1]);hi=Math.max(hi,p[1]);});return hi-lo;};const alt=pts.map(p=>[p[0],p[1]<0?p[1]+360:p[1]]);const use=span(alt)<span(pts)?alt:pts;
 const H=innerHeight;map.flyToBounds(L.latLngBounds(use),{paddingTopLeft:[20,130],paddingBottomRight:[20,Math.round(H*.56)+10],maxZoom:ccs.length===1?7:6,duration:1.1});}
// region browser ("server select")
const stLabel=s=>s.n&&s.exp===s.n?['full','已探索']:s.vis?['on','探索中']:['off','未開拓'];
const srvRow=(key,icon,title,en,s)=>{const [c,l]=stLabel(s);return `<button class="srv" data-k="${key}"><span class="sv-ic">${icon}</span><span class="nm"><b>${title}</b> <small>${en}</small><span class="pb"><i style="width:${s.n?100*s.vis/s.n:0}%"></i></span><small>國家 ${s.vis}/${s.n}・打卡點 ${(s.cd+s.pd).toLocaleString()}/${(s.ct+s.pt).toLocaleString()}</small></span><span class="sv-st ${c}">${l}</span><span class="chev">›</span></button>`;};
const crumb=parts=>`<div class="crumb">${parts.map((p,i)=>i<parts.length-1?`<button data-nav="${p[0]}">${p[1]}</button><span>›</span>`:`<b>${p[1]}</b>`).join('')}</div>`;
let view=null;
function bindNav(){$('pbody').querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>{const [l,a,c]=b.dataset.nav.split(':');if(l==='world'){setFilter(null);map.flyTo([20,10],2,{duration:1});regionView('world');}else selectRegion(l,a,c);});}
function regionView(lvl,a,b){view=[lvl,a,b];let h='',title='🌐 世界伺服器';
 if(lvl==='world'){const s=regStat(ALLCC);h=crumb([['world','世界']])+`<div class="cards c3"><div class="card"><small>🌍 已拜訪</small><b>${sovVisited()}<small> / ${SOVN} 國</small></b></div><div class="card"><small>👑 已探索</small><b>${doneCountries().length}<small> 國</small></b></div><div class="card"><small>📍 打卡點</small><b>${(s.cd+s.pd).toLocaleString()}<small> / ${(s.ct+s.pt).toLocaleString()}</small></b></div></div><div class="sec">選擇大洲</div>`+R.cont.map(([k,zh,en])=>srvRow('cont:'+k,CICON[k],zh,en,regStat(ccsOf(k)))).join('');}
 else if(lvl==='cont'){const C=CONT[a];title=`${CICON[a]} ${C.zh}`;h=crumb([['world','世界'],['cont:'+a,C.zh]])+`<div class="sec">選擇區域</div>`+C.subs.map(s=>srvRow(`sub:${a}:${s}`,'🗺️',R.subzh[s]||s,s,regStat(ccsOf(a,s)))).join('');}
 else{const C=CONT[a];title=`🗺️ ${R.subzh[b]||b}`;h=crumb([['world','世界'],['cont:'+a,C.zh],['sub',R.subzh[b]||b]])+`<div class="sec">選擇國家</div>`+ccsOf(a,b).sort((x,y)=>cname(x).localeCompare(cname(y))).map(cc=>srvRow('cc:'+cc,flag(cc),esc(cname(cc)),cc,regStat([cc]))).join('');}
 panel(title,h,true);bindNav();$('pbody').querySelectorAll('.srv').forEach(e=>e.onclick=()=>{const [l,x,y]=e.dataset.k.split(':');selectRegion(l,x,y);});}
function selectRegion(l,a,b){if(l==='cc')return openCountry(a);const ccs=l==='cont'?ccsOf(a):ccsOf(a,b);setFilter(ccs,l==='cont'?CONT[a].zh:(R.subzh[b]||b));flyTo(ccs);regionView(l,a,b);}
function countryCard(cc){const v=visitedSet().has(cc),e=doneCountries().includes(cc);const l=byCountry[cc]?byCountry[cc].list:[];const got=l.filter(x=>S.checks[x.id]).length;
 return `<div class="chips"><span class="chip ${v?'yes':'no'}">${v?'✓':'○'} 已拜訪</span><span class="chip ${e?'yes':'no'}">${e?'👑':'○'} 已探索</span></div><div class="card" style="margin-bottom:10px"><small>國家探索進度（城市）</small><b style="font-size:16px">${got} / ${l.length}</b><div class="pb"><i style="width:${l.length?100*got/l.length:0}%"></i></div></div>`;}
function openCountry(cc,noFly){const [k,s]=regOf(cc);if(!noFly){setFilter([cc],cname(cc));flyTo([cc]);}view=['cc',cc];
 let first=true;const render=()=>{if(!view||view[0]!=='cc'||view[1]!==cc)return;const l=(byCountry[cc]?byCountry[cc].list:[]).slice().sort((a,b)=>(b.pop||0)-(a.pop||0));const pi=R.poi[cc]||[0,0];const loaded=!!poiCache[cc]&&Object.values(poiRec).some(p=>p.cc===cc)||!(pi[0]+pi[1]);
  const ap=Object.values(poiRec).filter(p=>p.cc===cc&&p.t==='a'),pp=Object.values(poiRec).filter(p=>p.cc===cc&&p.t==='p');const dn=t=>Object.values(S.poi).filter(p=>p&&p.cc===cc&&p.t===t).length;
  const row=(attr,done,ic,name,sub,right)=>`<div class="row tap" ${attr}><span class="ck${done?' on':''}">${done?'✓':ic}</span><div class="nm"><div>${name}</div>${sub?`<small style="color:var(--mut)">${sub}</small>`:''}</div><span class="ct">${right||''}</span></div>`;
  const sc=first?0:$('pbody').scrollTop;first=false;
  panel(`${flag(cc)} ${cname(cc)}`,crumb([['world','世界'],['cont:'+k,CONT[k]?CONT[k].zh:k],[`sub:${k}:${s}`,R.subzh[s]||s],['cc',esc(cname(cc))]])+countryCard(cc)+
   `<div class="cards c3"><div class="card"><small>🏰 城市</small><b>${l.filter(c=>S.checks[c.id]).length}<small> / ${l.length}</small></b></div><div class="card"><small>✈️ 機場</small><b>${dn('a')}<small> / ${pi[0]}</small></b></div><div class="card"><small>⚓ 港口</small><b>${dn('p')}<small> / ${pi[1]}</small></b></div></div>`+
   `<div class="sec">🏰 城市</div>`+l.map(c=>row(`data-city="${esc(c.id)}"`,!!S.checks[c.id],'○',esc(c.n),'',c.pop?c.pop.toLocaleString():'')).join('')+
   `<div class="sec">✈️ 機場</div>`+(loaded?(ap.length?ap.map(p=>row(`data-poi="${p.id}"`,!!S.poi[p.id],GL.a,esc(p.n),esc(p.code+(p.city?'・'+p.city:'')),p.big?'大型':'')).join(''):'<div class="sub">此國家沒有定期航班機場資料</div>'):'<div class="sub">載入中…</div>')+
   `<div class="sec">⚓ 港口</div>`+(loaded?(pp.length?pp.map(p=>row(`data-poi="${p.id}"`,!!S.poi[p.id],GL.p,esc(p.n),p.big===2?'大型港':p.big===1?'中型港':'小型港','')).join(''):'<div class="sub">此國家沒有主要港口資料</div>'):'<div class="sub">載入中…</div>'),true);
  $('pbody').scrollTop=sc;bindNav();
  $('pbody').querySelectorAll('[data-city]').forEach(e=>e.onclick=()=>{const c=cById[e.dataset.city];map.setView([c.lat,c.lng],11);openCity(c);});
  $('pbody').querySelectorAll('[data-poi]').forEach(e=>e.onclick=()=>{const p=poiRec[e.dataset.poi];map.setView([p.lat,p.lng],11);openPoi(p);});};
 render();loadPoi(cc).then(render);}
function openPoi(p){const ck=S.poi[p.id];const tn=p.t==='a'?'機場':'港口';
 panel(`${p.t==='a'?'✈️':'⚓'} ${p.n}`,`<div class="sub">${tn}${p.code?'・'+esc(p.code):''}${p.city?'・'+esc(p.city):''}${p.t==='p'?(p.big===2?'・大型港':p.big===1?'・中型港':''):''}・${esc(cname(p.cc))}</div>${countryCard(p.cc)}${ck?'<div class="sec">我的回憶</div>':''}
 ${(ck&&Array.isArray(ck.notes)?ck.notes:[]).map(m=>`<div class="memo">${esc(m.t)}<small>${new Date(m.d).toLocaleString('zh-TW')}</small></div>`).join('')}
 <textarea id="note" placeholder="寫下這裡的美好回憶…"></textarea><button class="btn" id="ckBtn">${ck?'✍️ 新增回憶':(p.t==='a'?'✈️':'⚓')+' 打卡並留下回憶'}</button>`);
 $('ckBtn').onclick=()=>{const t=$('note').value.trim();const first=!S.poi[p.id];const wasVis=visitedSet().has(p.cc),ab=achOn();
  S.poi[p.id]=S.poi[p.id]||{d:Date.now(),notes:[],t:p.t,n:p.n,cc:p.cc,lat:p.lat,lng:p.lng,code:p.code||''};if(!Array.isArray(S.poi[p.id].notes))S.poi[p.id].notes=[];if(t)S.poi[p.id].notes.push({t,d:Date.now()});save();
  const m=poiMk[p.id];if(m){m.options.done=true;m.setIcon(poiIcon(p.t,true));if(poiLayer.hasLayer(m))poiLayer.refreshClusters(m);}hud();fog.draw();refreshChoro();
  if(first)celebrate(p.cc,wasVis,ab,{n:p.n,k:p.t==='a'?'✈️ 機場打卡':'⚓ 港口打卡',ic:p.t==='a'?'✈️':'⚓'});openPoi(p);};}
$('bWorld').onclick=()=>regionView('world');$('vis').onclick=()=>regionView('world');
if(S.start)startMk.setLatLng(S.start).addTo(map);if(S.pos)me=L.marker(S.pos,{icon:peg,zIndexOffset:1000}).addTo(map);
hud();if(!S.start)hint('點「🚩 出發點」開始你的冒險');
if(!localStorage.getItem('fogmap_onb')){const o=$('onb');o.classList.remove('hide');let i=0;const ss=o.querySelectorAll('.onb-s'),ds=o.querySelectorAll('.dots i');
 const fin=()=>{localStorage.setItem('fogmap_onb','1');o.classList.add('hide');};
 $('onbNext').onclick=()=>{if(i>=2)return fin();ss[i].classList.remove('on');ds[i].classList.remove('on');i++;ss[i].classList.add('on');ds[i].classList.add('on');if(i===2)$('onbNext').textContent='開始冒險';};$('onbSkip').onclick=fin;}
window.FogApp={S,save,setPos,hud,toast,hav,$,_t:{regionView,selectRegion,openCountry,openPoi,loadPoi,poiRec,setFilter}};
if(window.Capacitor)loadScript('native.js').catch(e=>console.warn(e));
})();
