(()=>{
const $=id=>document.getElementById(id);
const badge=(kind,label)=>{const g=kind==='gold'?['#fff3c4','#e9b949','#a8670c']:kind==='done'?['#fff3c4','#e9b949','#a8670c']:['#f3efe6','#cfc4ad','#8b7f69'];const id='g'+Math.random().toString(36).slice(2,7);
 return `<svg class="bd" viewBox="0 0 64 64"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${g[0]}"/><stop offset=".55" stop-color="${g[1]}"/><stop offset="1" stop-color="${g[2]}"/></linearGradient></defs><path d="M20 40 L14 62 L24 56 L32 62 L30 42Z M44 40 L50 62 L40 56 L32 62 L34 42Z" fill="${kind==='gold'?'#c0392b':'#7f8c8d'}" opacity=".85"/><polygon points="32,2 40,8 50,8 53,18 60,24 56,33 58,43 48,46 42,54 32,50 22,54 16,46 6,43 8,33 4,24 11,18 14,8 24,8" fill="url(#${id})" stroke="${g[2]}" stroke-width="1.5"/><circle cx="32" cy="27" r="15" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2"/><text x="32" y="33" text-anchor="middle" font-size="17">${label}</text></svg>`;};
const S=(()=>{const D={start:null,pos:null,dist:0,trail:[],checks:{}};const raw=localStorage.getItem('fogmap');let o=null;try{o=JSON.parse(raw||'null');}catch(e){try{localStorage.setItem('fogmap_bak',raw);}catch(_){}console.warn('fogmap: corrupt saved state, backed up to fogmap_bak');}
 if(!o||typeof o!=='object'||Array.isArray(o))o={};o=Object.assign(D,o);if(!Array.isArray(o.trail))o.trail=[];if(!o.checks||typeof o.checks!=='object')o.checks={};if(typeof o.dist!=='number'||!isFinite(o.dist))o.dist=0;return o;})();
const save=()=>localStorage.setItem('fogmap',JSON.stringify(S));
const PIN='<svg viewBox="0 0 24 32"><path d="M12 1C6 1 1.5 5.5 1.5 11.2 1.5 19 12 31 12 31s10.5-12 10.5-19.8C22.5 5.5 18 1 12 1z"/><circle cx="12" cy="11" r="4"/></svg>';
const cityIcon=d=>L.divIcon({className:'',iconSize:[16,21],iconAnchor:[8,20],html:`<div class="pin city${d?' done':''}">${PIN}</div>`});
const _ids={};const cities=window.CITIES.map(c=>{let id=c.cc+'-'+c.n;if(_ids[id])id+='@'+c.lat+','+c.lng;_ids[id]=1;return {...c,id};});
const byCountry={};cities.forEach(c=>(byCountry[c.cc]=byCountry[c.cc]||{name:c.co,list:[]}).list.push(c));
const map=L.map('map',{zoomControl:false,worldCopyJump:true,minZoom:2,maxZoom:20}).setView(S.pos||[23.7,121],S.pos?8:3);
const k=window.CARTO_API_KEY?('?key='+encodeURIComponent(window.CARTO_API_KEY)):'';
const attr='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';
const osmAttr='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
// 有可用的 CARTO 金鑰時用 CARTO Voyager（含街道與標籤）；否則用 OpenStreetMap 標準圖層（最詳細的免費選項，含 POI）
const osm=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:osmAttr,maxNativeZoom:19,maxZoom:20});
const carto=L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'+k,{attribution:attr,subdomains:'abcd',maxNativeZoom:20,maxZoom:20});
osm.addTo(map);
const esriSat=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{attribution:'Tiles &copy; Esri, Maxar, Earthstar Geographics',maxNativeZoom:19,maxZoom:20});
const satLabels=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',{maxNativeZoom:19,maxZoom:20});
const satRoads=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',{maxNativeZoom:19,maxZoom:20});
const sat=L.layerGroup([esriSat,satRoads,satLabels]);
// Fog of war
const Fog=L.Layer.extend({onAdd(m){this.c=L.DomUtil.create('canvas');Object.assign(this.c.style,{position:'absolute',pointerEvents:'none'});m.getPane('overlayPane').appendChild(this.c);m.on('moveend zoomend resize viewreset',this.draw,this);this.draw();},
draw(){const m=map,s=m.getSize(),tl=m.containerPointToLayerPoint([0,0]);L.DomUtil.setPosition(this.c,tl);this.c.width=s.x;this.c.height=s.y;const g=this.c.getContext('2d');
const dk=matchMedia('(prefers-color-scheme: dark)').matches;const fg=g.createLinearGradient(0,0,0,s.y);fg.addColorStop(0,dk?'rgba(10,12,20,.62)':'rgba(70,78,96,.5)');fg.addColorStop(1,dk?'rgba(20,16,30,.68)':'rgba(92,84,110,.56)');g.fillStyle=fg;g.fillRect(0,0,s.x,s.y);g.globalCompositeOperation='destination-out';
const hole=(ll,km)=>{const p=m.latLngToContainerPoint(ll),p2=m.latLngToContainerPoint([ll[0]+km/111,ll[1]]);const r=1.3*Math.max(10,Math.abs(p.y-p2.y));const gr=g.createRadialGradient(p.x,p.y,0,p.x,p.y,r);gr.addColorStop(0,'#000');gr.addColorStop(.45,'rgba(0,0,0,.95)');gr.addColorStop(.7,'rgba(0,0,0,.6)');gr.addColorStop(.88,'rgba(0,0,0,.2)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(p.x,p.y,r,0,7);g.fill();};
S.trail.forEach(t=>hole(t,3));if(S.start)hole(S.start,30);if(S.pos)hole(S.pos,10);cities.forEach(c=>S.checks[c.id]&&hole([c.lat,c.lng],60));g.globalCompositeOperation='source-over';}});
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
const refreshCity=c=>{const m=cMk[c.id];m.options.done=true;m.setIcon(cityIcon(true));cityLayer.refreshClusters(m);};
const hav=(a,b)=>{const R=6371e3,r=Math.PI/180,dl=(b[0]-a[0])*r,dn=(b[1]-a[1])*r,x=Math.sin(dl/2)**2+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(x));};
const doneCountries=()=>Object.keys(byCountry).filter(cc=>byCountry[cc].list.every(c=>S.checks[c.id]));
const shown={};function anim(id,v,fmt){const el=$(id),from=shown[id]??0;if(from===v){el.textContent=fmt(v);return;}shown[id]=v;if(Math.abs(v-from)>0&&id!=='steps'&&id!=='km'){el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop');}
 cancelAnimationFrame(el._r);const t0=performance.now(),D=600;const f=t=>{const k=Math.min(1,(t-t0)/D),e=1-Math.pow(1-k,3);el.textContent=fmt(from+(v-from)*e);if(k<1)el._r=requestAnimationFrame(f);};el._r=requestAnimationFrame(f);}
const kfmt=v=>v>=10000?(v/1000).toFixed(1)+'k':Math.round(v).toLocaleString();
function hud(){anim('steps',S.stepSrc==='native'?(S.nsteps||0):Math.round(S.dist/0.75),kfmt);anim('km',S.dist/1000,v=>v>=1000?Math.round(v).toLocaleString():v.toFixed(2));anim('cnt',Object.keys(S.checks).length,v=>Math.round(v)+'');anim('ms',doneCountries().length,v=>Math.round(v)+'');}
function toast(t,o={}){const e=$('toast');e.className='glass'+(o.big?' big':'');e.innerHTML=(o.badge||'')+'<div>'+(o.kicker?'<small>'+o.kicker+'</small>':'')+t+'</div>';void e.offsetWidth;e.classList.add('show');if(navigator.vibrate&&o.badge)navigator.vibrate(30);clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),o.big?3600:2600);}
function hint(t){if(t)$('hint').textContent=t;$('hint').classList.toggle('show',!!t);}
function setPos(ll,move){if(S.pos&&move){const d=hav(S.pos,ll);if(d<500000)S.dist+=d;}S.pos=ll;S.trail.push(ll);if(S.trail.length>3000)S.trail.shift();trailLine.setLatLngs(S.trail);
 if(!me)me=L.marker(ll,{icon:peg,zIndexOffset:1000}).addTo(map);else me.setLatLng(ll);save();hud();fog.draw();
 const near=cities.find(c=>!S.checks[c.id]&&hav(ll,[c.lat,c.lng])<25000);if(near)toast(`你抵達了 ${esc(near.n)}！點城市即可打卡`,{kicker:'📍 新地點'});}
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
function panel(t,h){$('ptitle').textContent=t;$('pbody').innerHTML=h;$('panel').style.transform='';$('panel').classList.add('open');$('scrim').classList.add('show');}
const closeP=()=>{$('panel').style.transform='';$('panel').classList.remove('open');$('scrim').classList.remove('show');};$('pclose').onclick=closeP;$('scrim').onclick=closeP;
(()=>{let y0=null,dy=0;const P=$('panel');const st=e=>{y0=e.touches[0].clientY;dy=0;P.style.transition='none';},mv=e=>{if(y0===null)return;dy=Math.max(0,e.touches[0].clientY-y0);P.style.transform=`translateY(${dy}px)`;},en=()=>{if(y0===null)return;P.style.transition='';y0=null;if(dy>90)closeP();else P.style.transform='';};
 [$('handle'),P.querySelector('.ph')].forEach(h=>{h.addEventListener('touchstart',st,{passive:true});h.addEventListener('touchmove',mv,{passive:true});h.addEventListener('touchend',en);});})();
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function openCity(c){const ck=S.checks[c.id];const cn=byCountry[c.cc],got=cn.list.filter(x=>S.checks[x.id]).length;
 panel(`${ck?'🏅':'📍'} ${c.n}`,`<div class="sub">${esc(c.co)}${c.pop?'・人口 '+c.pop.toLocaleString():''}</div><div class="card" style="margin-bottom:10px"><small>國家探索進度</small><b style="font-size:16px">${got} / ${cn.list.length}</b><div class="pb"><i style="width:${100*got/cn.list.length}%"></i></div></div>${ck?'<div class="sec">我的回憶</div>':''}
 ${(ck?ck.notes:[]).map(m=>`<div class="memo">${esc(m.t)}<small>${new Date(m.d).toLocaleString('zh-TW')}</small></div>`).join('')}
 <textarea id="note" placeholder="寫下這裡的美好回憶…"></textarea><button class="btn" id="ckBtn">${ck?'✍️ 新增回憶':'🏰 打卡並留下回憶'}</button>`);
 $('ckBtn').onclick=()=>{const t=$('note').value.trim();const first=!S.checks[c.id];const before=doneCountries().length;S.checks[c.id]=S.checks[c.id]||{d:Date.now(),notes:[]};if(t)S.checks[c.id].notes.push({t,d:Date.now()});save();refreshCity(c);hud();fog.draw();
  if(first){const all=byCountry[c.cc].list.every(x=>S.checks[x.id]);all?toast(`完成探索「${esc(c.co)}」`,{kicker:'👑 里程碑達成',badge:badge('gold','👑'),big:true}):toast(esc(c.n),{kicker:'🏅 成就解鎖',badge:badge('done','🏰')});}openCity(c);};}
$('bAch').onclick=()=>{const rows=Object.entries(byCountry).map(([cc,v])=>({cc,v,g:v.list.filter(x=>S.checks[x.id]).length})).sort((a,b)=>b.g/b.v.list.length-a.g/a.v.list.length||b.g-a.g||a.v.name.localeCompare(b.v.name));
 const done=rows.filter(r=>r.g===r.v.list.length),nc=Object.keys(S.checks).length;
 const recent=Object.entries(S.checks).sort((a,b)=>b[1].d-a[1].d).slice(0,6).map(([id])=>cities.find(c=>c.id===id)).filter(Boolean);
 panel('🏆 冒險日誌',`<div class="cards"><div class="card"><small>👣 步數</small><b>${(S.stepSrc==='native'?(S.nsteps||0):Math.round(S.dist/0.75)).toLocaleString()}</b></div><div class="card"><small>🧭 公里</small><b>${(S.dist/1000).toFixed(2)}</b></div><div class="card"><small>🏰 城市成就</small><b>${nc}<small> / ${cities.length}</small></b></div><div class="card"><small>👑 國家里程碑</small><b>${done.length}<small> / ${rows.length}</small></b></div></div>`+
 (recent.length?`<div class="sec">最近解鎖</div>`+recent.map(c=>`<div class="row">${badge('done','🏰')}<div class="nm"><div><b>${esc(c.n)}</b></div><small style="color:var(--mut)">${esc(c.co)}</small></div></div>`).join(''):'')+
 `<div class="sec">各國進度</div>`+rows.slice(0,80).map(r=>{const f=r.g===r.v.list.length;return `<div class="row">${badge(f?'gold':r.g?'done':'grey',f?'👑':'🌐')}<div class="nm"><div>${esc(r.v.name)}</div><div class="pb"><i style="width:${100*r.g/r.v.list.length}%"></i></div></div><span class="ct">${r.g}/${r.v.list.length}</span></div>`;}).join('')+
 (rows.length>80?`<div class="sub" style="margin-top:8px">還有 ${rows.length-80} 個國家等你探索…</div>`:'')+
 `<button class="btn danger" id="reset">重設所有資料</button>`);
 $('reset').onclick=()=>{if(confirm('確定要清除所有進度？')){localStorage.removeItem('fogmap');location.reload();}};};
if(S.start)startMk.setLatLng(S.start).addTo(map);if(S.pos)me=L.marker(S.pos,{icon:peg,zIndexOffset:1000}).addTo(map);
hud();if(!S.start)hint('點「🚩 出發點」開始你的冒險');
if(!localStorage.getItem('fogmap_onb')){const o=$('onb');o.classList.remove('hide');let i=0;const ss=o.querySelectorAll('.onb-s'),ds=o.querySelectorAll('.dots i');
 const fin=()=>{localStorage.setItem('fogmap_onb','1');o.classList.add('hide');};
 $('onbNext').onclick=()=>{if(i>=2)return fin();ss[i].classList.remove('on');ds[i].classList.remove('on');i++;ss[i].classList.add('on');ds[i].classList.add('on');if(i===2)$('onbNext').textContent='開始冒險';};$('onbSkip').onclick=fin;}
window.FogApp={S,save,setPos,hud,toast,hav,$};
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
