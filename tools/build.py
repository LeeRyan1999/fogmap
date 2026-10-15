#!/usr/bin/env python3
"""Build step for FogMap. Edit app.js / style.css (sources), then run:  python3 tools/build.py <version>
 - app.min.js  : terser-minified app.js (falls back to a plain copy if terser is unavailable)
 - app.min.css : vendor/leaflet.css + vendor/MarkerCluster.css + style.css, minified
 - stamps ?v=<version> on assets in index.html and the cache name fogmap-v<version> in sw.js
Bump the version on every deploy so phones pick up the new service worker and assets."""
import os,re,shutil,subprocess,sys
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..');os.chdir(R)
v=sys.argv[1] if len(sys.argv)>1 else re.search(r"fogmap-v(\d+)",open('sw.js').read()).group(1)
t=shutil.which('terser')
if t: subprocess.run([t,'app.js','-c','passes=2','-m','--ecma','2020','-o','app.min.js'],check=True)
else: shutil.copy('app.js','app.min.js');print('terser not found: app.min.js is unminified')
css=''
for f in ['vendor/leaflet.css','vendor/MarkerCluster.css','style.css']:
  s=open(f,encoding='utf-8').read()
  if f.startswith('vendor/'): s=re.sub(r'url\((?!["\']?(?:data:|#|https?:))(["\']?)',r'url(\1vendor/',s)
  css+=s+'\n'
css=re.sub(r'/\*.*?\*/','',css,flags=re.S);css=re.sub(r'\s+',' ',css);css=re.sub(r'\s*([{};,>])\s*',r'\1',css);css=re.sub(r';}','}',css)
open('app.min.css','w',encoding='utf-8').write(css.strip()+'\n')
h=open('index.html',encoding='utf-8').read();h=re.sub(r'\?v=\d+',f'?v={v}',h);open('index.html','w',encoding='utf-8').write(h)
s=open('sw.js',encoding='utf-8').read();s=re.sub(r"fogmap-v\d+",f"fogmap-v{v}",s);s=re.sub(r"const V='\d+'",f"const V='{v}'",s);open('sw.js','w',encoding='utf-8').write(s)
print('built v'+v,{f:os.path.getsize(f) for f in ['app.min.js','app.min.css']})
