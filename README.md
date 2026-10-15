# 迷霧地圖 FogMap

A mobile-first PWA for exploring the world, built like an RPG map. Set a starting point, walk, check in at cities (GeoNames, 6,371 cities), leave memory notes, and earn achievements and country milestones.

- Run locally: `python3 -m http.server 8765`, then open http://localhost:8765/
- Deploy: any static HTTPS host (GitHub Pages / Netlify). On iPhone Safari, use Share → 加入主畫面 (Add to Home Screen).
- Basemaps: OpenStreetMap (default) / CARTO Voyager (needs `config.js` key, sent as `?key=`) / Esri satellite.
- Note: the key in `config.js` is visible to anyone who opens the site; restrict its allowed domains in the CARTO dashboard.
- Data: GeoNames (CC BY 4.0), © OpenStreetMap contributors, CARTO, Esri.

## Build (v15+)

`index.html` loads the minified bundle `app.min.js` / `app.min.css`. After editing `app.js` or `style.css`, run:

    python3 tools/build.py <version>   # e.g. 16

That minifies the JS (terser) and the CSS (leaflet + markercluster + style), and stamps `?v=<version>` into index.html plus `fogmap-v<version>` into sw.js. Commit the generated files too.

- `cities.js` uses a compact layout: `CITY_DATA = {CC: [[name, lat, lng, pop], ...]}`, which is expanded into `window.CITIES` at load time. City ids and order are unchanged.
- Service worker: index is network-first, `?v=` assets are cache-first, and tiles go to the `tiles2` cache. The new SW calls skipWaiting + clients.claim, and the page reloads once when it takes over.
- Default basemap is OSM, because it shows street names and POIs at z16–18. CARTO Voyager (@2x, CDN-backed) is available in the layer toggle.
