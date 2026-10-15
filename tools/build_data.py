#!/usr/bin/env python3
"""Build FogMap region/POI data. Inputs (download to /tmp/rd):
 m49.csv      https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.csv (UN M49 regions)
 ne50.geojson https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson (public domain)
 airports.csv https://davidmegginson.github.io/ourairports-data/airports.csv (OurAirports, public domain)
 wpi.csv      https://msi.nga.mil/api/publications/download?key=16920959/SFH00000/UpdatedPub150.csv&type=view (NGA World Port Index, Pub 150, public domain)
Outputs: data/regions.js, data/countries.json, data/poi/<CC>.json"""
import csv,json,os,re,sys,collections,math
SRC=sys.argv[1] if len(sys.argv)>1 else '/tmp/rd'
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','data')
os.makedirs(OUT+'/poi',exist_ok=True)
src=open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','cities.js'),encoding='utf-8').read()
COUNTRIES=json.loads(re.search(r'window\.COUNTRIES=(\{.*?\});',src,re.S).group(1))
CITY_DATA=json.loads(re.search(r'window\.CITY_DATA=(\{.*?\});\n',src,re.S).group(1))
CCS=sorted(set(CITY_DATA)|{'AQ'})  # AQ: no cities, but outline + ports
# ---- regions ----
CONT=[('AS','亞洲','Asia'),('EU','歐洲','Europe'),('AF','非洲','Africa'),('NA','北美洲','North America'),('SA','南美洲','South America'),('OC','大洋洲','Oceania'),('AN','南極洲','Antarctica')]
SUBZH={'Eastern Asia':'東亞','South-eastern Asia':'東南亞','Southern Asia':'南亞','Central Asia':'中亞','Western Asia':'西亞',
 'Northern Europe':'北歐','Western Europe':'西歐','Southern Europe':'南歐','Eastern Europe':'東歐',
 'Northern Africa':'北非','Eastern Africa':'東非','Middle Africa':'中非','Southern Africa':'南部非洲','Western Africa':'西非',
 'Northern America':'北美','Central America':'中美洲','Caribbean':'加勒比海','South America':'南美',
 'Australia and New Zealand':'澳洲與紐西蘭','Melanesia':'美拉尼西亞','Micronesia':'密克羅尼西亞','Polynesia':'玻里尼西亞','Antarctica':'南極'}
m49={x['alpha-2']:x for x in csv.DictReader(open(f'{SRC}/m49.csv',encoding='utf-8'))}
reg={}
for cc in CCS:
  x=m49.get(cc)
  if cc=='XK': reg[cc]=('EU','Southern Europe');continue
  if cc=='TW': reg[cc]=('AS','Eastern Asia');continue
  if not x or not x['region']: reg[cc]=('AN','Antarctica');continue
  r,s,i=x['region'],x['sub-region'],x['intermediate-region']
  if r=='Americas':
    if i=='South America': reg[cc]=('SA','South America')
    elif i: reg[cc]=('NA',i)
    else: reg[cc]=('NA',s)
  elif r=='Africa': reg[cc]=('AF',i or s)
  else: reg[cc]=({'Asia':'AS','Europe':'EU','Oceania':'OC'}[r],s)
  assert reg[cc][1] in SUBZH,(cc,reg[cc])
UN193='AF AL DZ AD AO AG AR AM AU AT AZ BS BH BD BB BY BE BZ BJ BT BO BA BW BR BN BG BF BI CV KH CM CA CF TD CL CN CO KM CG CD CR CI HR CU CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FJ FI FR GA GM GE DE GH GR GD GT GN GW GY HT HN HU IS IN ID IR IQ IE IL IT JM JP JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MG MW MY MV ML MT MH MR MU MX FM MD MC MN ME MA MZ MM NA NR NP NL NZ NI NE NG MK NO OM PK PW PA PG PY PE PH PL PT QA RO RU RW KN LC VC WS SM ST SA SN RS SC SL SG SK SI SB SO ZA SS ES LK SD SR SE CH SY TJ TZ TH TL TG TO TT TN TR TM TV UG UA AE GB US UY UZ VU VE VN YE ZM ZW'.split()
assert len(set(UN193))==193,len(set(UN193))
SOV=UN193+['VA','PS','TW','XK']  # 197 countries
assert len(set(SOV))==197
# ---- airports ----
poi=collections.defaultdict(lambda:{'a':[],'p':[]})
for x in csv.DictReader(open(f'{SRC}/airports.csv',encoding='utf-8')):
  if x['type'] in('large_airport','medium_airport') and x['scheduled_service']=='yes' and x['iata_code'].strip() and x['iso_country'] in reg:
    poi[x['iso_country']]['a'].append([x['iata_code'].strip(),x['name'].strip(),x['municipality'].strip(),round(float(x['latitude_deg']),4),round(float(x['longitude_deg']),4),1 if x['type']=='large_airport' else 0])
# ---- ports (WPI Large/Medium; fallback up to 3 Small ports for countries with none) ----
name2cc={v.lower():k for k,v in COUNTRIES.items()}
for x in m49.values(): name2cc.setdefault(x['name'].lower(),x['alpha-2'])
ALIAS={'federated states of micronesia':'FM','saint helena, ascension, and tristan da cunha':'SH','south georgia and south sandwich islands':'GS','antarctica':'AQ','united states':'US','united kingdom':'GB','russia':'RU','south korea':'KR','north korea':'KP','iran':'IR','vietnam':'VN','syria':'SY','taiwan':'TW','tanzania':'TZ','venezuela':'VE','bolivia':'BO','turkey':'TR','turkiye':'TR','congo':'CG','democratic republic of the congo':'CD','cote d\'ivoire':'CI',"cote d'ivoire":'CI','brunei':'BN','moldova':'MD','micronesia':'FM','laos':'LA','cabo verde':'CV','cape verde':'CV','curacao':'CW','reunion':'RE','macau':'MO','hong kong':'HK','burma':'MM','the bahamas':'BS','bahamas':'BS','gambia':'GM','the gambia':'GM'}
ports=list(csv.DictReader(open(f'{SRC}/wpi.csv',encoding='utf-8-sig')))
unk=collections.Counter();small=collections.defaultdict(list)
for x in ports:
  lo=x['UN/LOCODE'].strip();cc=lo[:2] if len(lo)>=2 and lo[:2].isalpha() else None
  if not cc:
    nm=x['Country Code'].strip().lower();cc=ALIAS.get(nm) or name2cc.get(nm)
  if not cc or cc not in reg: unk[x['Country Code']]+=1;continue
  sz=x['Harbor Size'].strip();rec=['P'+x['World Port Index Number'].strip(),x['Main Port Name'].strip().title(),round(float(x['Latitude']),4),round(float(x['Longitude']),4),{'Large':2,'Medium':1}.get(sz,0)]
  if sz in('Large','Medium'): poi[cc]['p'].append(rec)
  elif sz=='Small': small[cc].append(rec)
for cc,l in small.items():
  if not poi[cc]['p']: poi[cc]['p'].extend(l[:3])
for cc,v in poi.items():
  v['a'].sort(key=lambda r:(-r[5],r[0]));v['p'].sort(key=lambda r:(-r[4],r[1]))
  json.dump(v,open(f'{OUT}/poi/{cc}.json','w',encoding='utf-8'),ensure_ascii=False,separators=(',',':'))
idx={}
for cc in CCS:
  v=poi.get(cc,{'a':[],'p':[]});pts=[(r[3],r[4]) for r in v['a']]+[(r[2],r[3]) for r in v['p']]
  idx[cc]=[len(v['a']),len(v['p'])]+([min(p[0] for p in pts),min(p[1] for p in pts),max(p[0] for p in pts),max(p[1] for p in pts)] if pts else [])
# ---- country polygons (Natural Earth 50m, Douglas-Peucker simplified) ----
def dp(pts,eps):
  if len(pts)<3: return pts
  keep=[0,len(pts)-1];st=[(0,len(pts)-1)];mark=[False]*len(pts);mark[0]=mark[-1]=True
  while st:
    a,b=st.pop();ax,ay=pts[a];bx,by=pts[b];dx,dy=bx-ax,by-ay;L=math.hypot(dx,dy) or 1e-12;md,mi=-1,-1
    for i in range(a+1,b):
      px,py=pts[i];d=abs(dy*px-dx*py+bx*ay-by*ax)/L if (dx or dy) else math.hypot(px-ax,py-ay)
      if d>md: md,mi=d,i
    if md>eps: mark[mi]=True;st+=[(a,mi),(mi,b)]
  return [p for p,k in zip(pts,mark) if k]
def area(r): return abs(sum(r[i][0]*r[i+1][1]-r[i+1][0]*r[i][1] for i in range(len(r)-1)))/2
feats=[]
for f in json.load(open(f'{SRC}/ne50.geojson',encoding='utf-8'))['features']:
  p=f['properties'];cc=p.get('ISO_A2_EH')
  if cc in(None,'-99'): cc=p.get('ISO_A2')
  if cc not in reg: continue
  g=f['geometry'];polys=g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
  out=[]
  for poly in polys:
    for eps,nd in((.04,2),(.003,3)):
      ring=[(round(x,nd),round(y,nd)) for x,y in dp([tuple(c) for c in poly[0]],eps)]
      ring=[q for i,q in enumerate(ring) if i==0 or q!=ring[i-1]]
      if len(ring)>=4: out.append((area(ring),[[list(q) for q in ring]]));break
  if not out: continue
  big=max(a for a,_ in out);out=[r for a,r in out if a>=min(.002,big*.05) and a>=big*.002]
  feats.append({'type':'Feature','properties':{'cc':cc},'geometry':{'type':'MultiPolygon','coordinates':out}})
json.dump({'type':'FeatureCollection','features':feats},open(f'{OUT}/countries.json','w'),separators=(',',':'))
R={'cont':[[k,zh,en,sorted(set(reg[c][1] for c in CCS if reg[c][0]==k),key=lambda s:list(SUBZH).index(s))] for k,zh,en in CONT],'subzh':SUBZH,'cc':{c:list(reg[c]) for c in CCS},'sov':SOV,'poi':idx}
open(f'{OUT}/regions.js','w',encoding='utf-8').write('// generated by tools/build_data.py — UN M49 regions, POI index\nwindow.REGIONS='+json.dumps(R,ensure_ascii=False,separators=(',',':'))+';\n')
print('countries',len(CCS),'polygons',len(feats),'airports',sum(len(v['a']) for v in poi.values()),'ports',sum(len(v['p']) for v in poi.values()),'poi files',len(poi),'unmatched ports',sum(unk.values()),unk.most_common(8))
print('sov in cities',len([c for c in SOV if c in reg]),'missing polys',[c for c in CCS if c not in {f['properties']['cc'] for f in feats}])
