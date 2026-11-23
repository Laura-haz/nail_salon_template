# Nail salon website template / Modèle de site pour salon d'ongles

## For a new client / Pour un nouveau client
1. Copy this whole folder. / Copier tout le dossier.
2. Edit **only `salon-config.js`**: name, colours, logo, services and prices, photos, reviews, address, phone, hours, booking link.
   Modifier **seulement `salon-config.js`** : nom, couleurs, logo, services et prix, photos, avis, adresse, téléphone, heures, lien de réservation.
3. Put photos in an `images/` folder and set `image: "images/xxx.jpg"` in the gallery. / Mettre les photos dans `images/`.
4. Set `demoBanner: false` before going live. / Mettre `demoBanner: false` avant la mise en ligne.
5. Optional: paste a Google Maps embed link in `location.mapEmbedUrl` to show a live map.

Text can be one string or `{ en: "...", fr: "..." }`. Remove a language from `languages` for a single-language site.
Open `index.html` in a browser to preview. Upload the folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## Files
- `salon-config.js` client content (the only file to edit)
- `index.html` page structure
- `styles.css` design (brand colour and fonts come from the config)
- `script.js` fills the page from the config, handles FR/EN and "open now"
