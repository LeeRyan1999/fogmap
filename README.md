# 迷霧地圖 FogMap

A mobile-first PWA for exploring the world, built like an RPG map. Set a starting point, walk, check in at cities (GeoNames, 6,371 cities), leave memory notes, and earn achievements and country milestones.

- Run locally: `python3 -m http.server 8765`, then open http://localhost:8765/
- Deploy: any static HTTPS host (GitHub Pages / Netlify). On iPhone Safari, use Share → 加入主畫面 (Add to Home Screen).
- Basemaps: OpenStreetMap (default) / CARTO Voyager (needs `config.js` key, sent as `?key=`) / Esri satellite.
- Note: the key in `config.js` is visible to anyone who opens the site; restrict its allowed domains in the CARTO dashboard.
- Data: GeoNames (CC BY 4.0), © OpenStreetMap contributors, CARTO, Esri.
