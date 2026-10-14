// 原生（Capacitor iOS）整合：背景定位 + 計步器/健康 App。網頁版不會執行任何動作。
(()=>{
const Cap=window.Capacitor;if(!Cap||!Cap.isNativePlatform||!Cap.isNativePlatform())return;
const A=window.FogApp;if(!A)return;const {S,save,setPos,hud,toast,hav,$}=A;
const BG=Cap.registerPlugin('BackgroundGeolocation'),Pedo=Cap.registerPlugin('CapacitorPedometer'),Health=Cap.registerPlugin('Health');
document.body.classList.add('native');const isAndroid=Cap.getPlatform()==='android';
let watcherId=null,pedoBase=null,pedoOn=false;
// ---- 步數：優先使用 CoreMotion 計步器，否則用 HealthKit ----
async function stepsBetween(start,end){
 try{const av=await Pedo.isAvailable();if(av&&(av.stepCounting??av.available??true)){const m=await Pedo.getMeasurement({start,end});return m.numberOfSteps||0;}}catch(e){}
 if(!isAndroid)try{const r=await Health.queryAggregated({dataType:'steps',startDate:new Date(start).toISOString(),endDate:new Date(end).toISOString(),bucket:'day',aggregation:'sum'});return (r.samples||[]).reduce((s,x)=>s+(x.value||0),0);}catch(e){}
 return null;}
async function catchUp(){if(S.stepSrc!=='native'||!S.stepTs)return;const now=Date.now();const n=await stepsBetween(S.stepTs,now);if(n!=null){S.nsteps=(S.nsteps||0)+n;S.stepTs=now;pedoBase=null;save();hud();}}
async function startSteps(){
 try{await Pedo.requestPermissions();}catch(e){}
 if(isAndroid){try{await Cap.registerPlugin('LocalNotifications').requestPermissions();}catch(e){}}
 if(!isAndroid)try{await Health.requestAuthorization({read:['steps','distance']});}catch(e){}
 if(S.stepSrc!=='native'){S.stepSrc='native';S.nsteps=Math.round(S.dist/0.75);S.stepTs=Date.now();save();}
 await catchUp();
 try{await Pedo.removeAllListeners();await Pedo.addListener('measurement',m=>{const n=m.numberOfSteps||0;if(pedoBase===null){pedoBase=n;return;}const d=n-pedoBase;if(d>0){S.nsteps=(S.nsteps||0)+d;pedoBase=n;S.stepTs=Date.now();save();hud();}});await Pedo.startMeasurementUpdates();pedoOn=true;}catch(e){console.warn('pedometer',e);}
}
// ---- 背景定位 ----
async function startTracking(){
 watcherId=await BG.addWatcher({backgroundTitle:'迷霧地圖正在記錄你的冒險',backgroundMessage:'持續累積步數與公里數',requestPermissions:true,stale:false,distanceFilter:5},(loc,err)=>{
  if(err){if(err.code==='NOT_AUTHORIZED'){toast(isAndroid?'需要定位權限（建議選「一律允許」）':'需要「永遠」定位權限才能在背景記錄',{kicker:'⚠️ 定位'});if(confirm('前往設定開啟定位權限？'))BG.openSettings();}return;}
  if(!loc||loc.accuracy>50)return;const ll=[loc.latitude,loc.longitude];if(S.pos&&hav(S.pos,ll)<3)return;setPos(ll,true);});
 S.tracking=true;save();$('bGps').classList.add('on');toast('背景追蹤已開啟，鎖屏也會記錄',{kicker:'📡 追蹤'});startSteps();}
async function stopTracking(){if(watcherId)await BG.removeWatcher({id:watcherId});watcherId=null;if(pedoOn){try{await Pedo.stopMeasurementUpdates();}catch(e){}pedoOn=false;}await catchUp();S.tracking=false;save();$('bGps').classList.remove('on');toast('已停止追蹤',{kicker:'📡 追蹤'});}
$('bGps').onclick=()=>watcherId?stopTracking():startTracking();
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){pedoBase=null;catchUp();}});
if(S.tracking)startTracking();
})();
