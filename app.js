(()=>{
const $=id=>document.getElementById(id);
const S=JSON.parse(localStorage.getItem('fogmap')||'null')||{start:null,pos:null,dist:0,trail:[],checks:{}};
const save=()=>localStorage.setItem('fogmap',JSON.stringify(S));
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
g.fillStyle='rgba(60,70,90,.55)';g.fillRect(0,0,s.x,s.y);g.globalCompositeOperation='destination-out';
const hole=(ll,km)=>{const p=m.latLngToContainerPoint(ll),p2=m.latLngToContainerPoint([ll[0]+km/111,ll[1]]);const r=Math.max(8,Math.abs(p.y-p2.y));const gr=g.createRadialGradient(p.x,p.y,r*.4,p.x,p.y,r);gr.addColorStop(0,'#000');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(p.x,p.y,r,0,7);g.fill();};
S.trail.forEach(t=>hole(t,3));if(S.start)hole(S.start,30);if(S.pos)hole(S.pos,10);cities.forEach(c=>S.checks[c.id]&&hole([c.lat,c.lng],60));g.globalCompositeOperation='source-over';}});
const fog=new Fog().addTo(map);window.fogmap=map;
// Pegman avatar
const peg=L.divIcon({className:'',iconSize:[28,44],iconAnchor:[14,42],html:'<svg width="28" height="44" viewBox="0 0 28 44"><ellipse cx="14" cy="42" rx="7" ry="2" fill="#0004"/><circle cx="14" cy="7" r="6" fill="#ffc531" stroke="#c88a00"/><path d="M6 15h16l-2 13h-3l-1 12h-4l-1-12H8z" fill="#ffc531" stroke="#c88a00"/></svg>'});
let me=null;const startMk=L.circleMarker([0,0],{radius:7,color:'#fff',fillColor:'#3b6ea5',fillOpacity:1,weight:2});
const trailLine=L.polyline(S.trail,{color:'#3b6ea5',weight:3,opacity:.7}).addTo(map);
const cityLayer=L.markerClusterGroup({chunkedLoading:true,disableClusteringAtZoom:10,maxClusterRadius:60,showCoverageOnHover:false,removeOutsideVisibleBounds:true}).addTo(map);const cMk={};
cities.forEach(c=>{cMk[c.id]=L.marker([c.lat,c.lng],{title:c.n,icon:L.divIcon({className:'',iconSize:[12,12],html:`<div class="city${S.checks[c.id]?' done':''}"></div>`})}).on('click',()=>openCity(c));});cityLayer.addLayers(Object.values(cMk));
const refreshCity=c=>cMk[c.id].setIcon(L.divIcon({className:'',iconSize:[12,12],html:'<div class="city done"></div>'}));
const hav=(a,b)=>{const R=6371e3,r=Math.PI/180,dl=(b[0]-a[0])*r,dn=(b[1]-a[1])*r,x=Math.sin(dl/2)**2+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(x));};
const doneCountries=()=>Object.keys(byCountry).filter(cc=>byCountry[cc].list.every(c=>S.checks[c.id]));
function hud(){$('steps').textContent=Math.round(S.dist/0.75).toLocaleString();$('km').textContent=(S.dist/1000).toFixed(2);$('cnt').textContent=Object.keys(S.checks).length+'/'+cities.length;$('ms').textContent=doneCountries().length;}
function toast(t){const e=$('toast');e.innerHTML=t;e.style.display='block';clearTimeout(e._t);e._t=setTimeout(()=>e.style.display='none',2500);}
function hint(t){$('hint').textContent=t||'';$('hint').style.display=t?'block':'none';}
function setPos(ll,move){if(S.pos&&move){const d=hav(S.pos,ll);if(d<500000)S.dist+=d;}S.pos=ll;S.trail.push(ll);if(S.trail.length>3000)S.trail.shift();trailLine.setLatLngs(S.trail);
 if(!me)me=L.marker(ll,{icon:peg,zIndexOffset:1000}).addTo(map);else me.setLatLng(ll);save();hud();fog.draw();
 const near=cities.find(c=>!S.checks[c.id]&&hav(ll,[c.lat,c.lng])<25000);if(near)toast(`📍 你抵達了 ${near.n}！<br>點城市即可打卡`);}
let mode=null;
function setMode(m){mode=mode===m?null:m;$('bStart').classList.toggle('on',mode==='start');$('bDemo').classList.toggle('on',mode==='demo');hint(mode==='start'?'點地圖設定出發點':mode==='demo'?'模擬模式：點地圖讓小人走過去':'');}
map.on('click',e=>{const ll=[e.latlng.lat,e.latlng.lng];if(mode==='start'){S.start=ll;startMk.setLatLng(ll).addTo(map);S.trail=[];S.pos=null;setPos(ll,false);setMode(null);toast('🚩 出發點已設定');}
 else if(mode==='demo'){walkTo(ll);}});
function walkTo(to){if(!S.pos){setPos(to,false);return;}const from=S.pos,n=20;let i=0;const t=setInterval(()=>{i++;setPos([from[0]+(to[0]-from[0])*i/n,from[1]+(to[1]-from[1])*i/n],true);if(i>=n)clearInterval(t);},40);}
$('bStart').onclick=()=>{if(!navigator.geolocation){setMode('start');return;}setMode('start');
 if(confirm('要使用目前 GPS 位置作為出發點嗎？\n（取消則點地圖手動設定）'))navigator.geolocation.getCurrentPosition(p=>{const ll=[p.coords.latitude,p.coords.longitude];S.start=ll;startMk.setLatLng(ll).addTo(map);S.trail=[];S.pos=null;setPos(ll,false);map.setView(ll,13);setMode(null);toast('🚩 出發點已設定');},()=>toast('無法取得定位，請點地圖設定'));};
let watch=null;
$('bGps').onclick=()=>{if(watch!==null){navigator.geolocation.clearWatch(watch);watch=null;$('bGps').classList.remove('on');toast('已停止追蹤');return;}
 if(!navigator.geolocation)return toast('此裝置不支援定位');watch=navigator.geolocation.watchPosition(p=>{if(p.coords.accuracy>50)return;const ll=[p.coords.latitude,p.coords.longitude];if(S.pos&&hav(S.pos,ll)<3)return;setPos(ll,true);},e=>toast('定位錯誤：'+e.message),{enableHighAccuracy:true,maximumAge:2000});$('bGps').classList.add('on');toast('開始追蹤步數 🚶');};
$('bDemo').onclick=()=>setMode('demo');
const BASES=[{l:osm,t:'🗺️ 細節'},{l:carto,t:'🧭 CARTO'},{l:sat,t:'🛰️ 衛星'}].filter(b=>b.l!==carto||window.CARTO_API_KEY);let bi=0;$('bLayer').textContent=BASES[1].t;$('bLayer').onclick=()=>{map.removeLayer(BASES[bi].l);bi=(bi+1)%BASES.length;BASES[bi].l.addTo(map);$('bLayer').textContent=BASES[(bi+1)%BASES.length].t;};
function panel(t,h){$('ptitle').textContent=t;$('pbody').innerHTML=h;$('panel').classList.remove('hide');}
$('pclose').onclick=()=>$('panel').classList.add('hide');
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function openCity(c){const ck=S.checks[c.id];const cn=byCountry[c.cc],got=cn.list.filter(x=>S.checks[x.id]).length;
 panel(`${ck?'🏅':'📍'} ${c.n}`,`<div style="color:#666;font-size:13px">${esc(c.co)}・國家進度 ${got}/${cn.list.length}</div>
 ${(ck?ck.notes:[]).map(m=>`<div class="memo">${esc(m.t)}<small>${new Date(m.d).toLocaleString('zh-TW')}</small></div>`).join('')}
 <textarea id="note" placeholder="寫下這裡的美好回憶…"></textarea><button class="btn" id="ckBtn">${ck?'新增回憶':'打卡 ✔'}</button>`);
 $('ckBtn').onclick=()=>{const t=$('note').value.trim();const first=!S.checks[c.id];const before=doneCountries().length;S.checks[c.id]=S.checks[c.id]||{d:Date.now(),notes:[]};if(t)S.checks[c.id].notes.push({t,d:Date.now()});save();refreshCity(c);hud();fog.draw();
  if(first){const all=byCountry[c.cc].list.every(x=>S.checks[x.id]);toast(all?`🎉 里程碑達成！<br>完成探索「${esc(c.co)}」`:`🏅 成就解鎖：${esc(c.n)}`);}openCity(c);};}
$('bAch').onclick=()=>{const rows=Object.entries(byCountry).map(([cc,v])=>({cc,v,g:v.list.filter(x=>S.checks[x.id]).length})).sort((a,b)=>b.g/b.v.list.length-a.g/a.v.list.length||b.g-a.g||a.v.name.localeCompare(b.v.name));
 const done=rows.filter(r=>r.g===r.v.list.length);
 panel('🏆 成就與里程碑',`<div class="row">🚶 ${Math.round(S.dist/0.75).toLocaleString()} 步・${(S.dist/1000).toFixed(2)} 公里<br>🏅 城市成就 ${Object.keys(S.checks).length}/${cities.length}・🎉 國家里程碑 ${done.length}/${rows.length}</div>`+
 rows.map(r=>`<div class="row">${r.g===r.v.list.length?'🎉':'🌐'} ${esc(r.v.name)} <span style="float:right;color:#888">${r.g}/${r.v.list.length}</span><div class="pb"><i style="width:${100*r.g/r.v.list.length}%"></i></div></div>`).join('')+
 `<button class="btn" style="background:#c33" id="reset">重設所有資料</button>`);
 $('reset').onclick=()=>{if(confirm('確定要清除所有進度？')){localStorage.removeItem('fogmap');location.reload();}};};
if(S.start)startMk.setLatLng(S.start).addTo(map);if(S.pos)me=L.marker(S.pos,{icon:peg,zIndexOffset:1000}).addTo(map);
hud();if(!S.start)hint('先點「📍 出發點」設定你的起點');
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
