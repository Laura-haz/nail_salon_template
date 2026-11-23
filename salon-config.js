/* ==========================================================================
   SALON CONFIG — the only file you edit for a new client.
   FICHIER CLIENT — le seul fichier à modifier pour un nouveau client.

   Any text can be one string ("Hello") or a bilingual pair:
   { en: "Hello", fr: "Bonjour" }
   ========================================================================== */

window.SALON = {
  /* --- Languages / Langues ------------------------------------------------ */
  languages: ["fr", "en"],      // remove one to make the site single-language
  defaultLang: "fr",

  /* Shows a "sample content" strip at the top. Set to false for a live site. */
  demoBanner: true,

  /* --- Brand / Marque ----------------------------------------------------- */
  name: "Maison Lacque",
  tagline: { en: "Nail studio", fr: "Studio d'ongles" },
  logo: "",                     // e.g. "images/logo.svg". Empty = text logo.
  colors: {
    accent: "#8E1B3A",          // main brand color (light mode)
    accentDark: "#E58AA6"       // same color, lighter, for dark mode
  },
  fonts: {
    display: "'Instrument Serif', Georgia, serif",
    body: "'Manrope', system-ui, sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap"
  },

  /* --- Hero / Accueil ------------------------------------------------------ */
  hero: {
    eyebrow: { en: "Queen West · Toronto", fr: "Queen Ouest · Toronto" },
    title: {
      en: "Clean, careful nails that last <em>three weeks</em>.",
      fr: "Des ongles soignés qui tiennent <em>trois semaines</em>."
    },
    text: {
      en: "Gel, BIAB and Gel-X by appointment, with sterilized tools for every client and a shade wall of more than 300 colours.",
      fr: "Gel, BIAB et Gel-X sur rendez-vous, avec des outils stérilisés pour chaque cliente et un mur de plus de 300 couleurs."
    },
    badges: [
      { en: "Walk-ins welcome on weekdays", fr: "Sans rendez-vous en semaine" },
      { en: "Hospital-grade sterilization", fr: "Stérilisation de grade médical" }
    ],
    // colours used for the nail fan in the hero
    swatches: ["#8E1B3A", "#E9B7C2", "#F4E9E4", "#3B2A4A", "#C9A27A"]
  },

  /* --- Booking / Réservation ---------------------------------------------- */
  booking: {
    url: "https://example.com/booking",   // Fresha, Square, Vagaro, etc.
    label: { en: "Book an appointment", fr: "Prendre rendez-vous" },
    note: {
      en: "Booking online takes about a minute. A card holds your spot; you pay at the salon.",
      fr: "La réservation en ligne prend environ une minute. Une carte garantit votre place; vous payez au salon."
    }
  },

  /* --- Services & prices / Services et prix -------------------------------- */
  currency: "CAD",
  priceNote: { en: "Prices before tax (HST 13%).", fr: "Prix avant taxes (TVH 13 %)." },
  services: [
    {
      category: { en: "Manicures", fr: "Manucures" },
      items: [
        { name: { en: "Classic manicure", fr: "Manucure classique" },
          desc: { en: "Shape, cuticle care and regular polish.", fr: "Forme, soin des cuticules et vernis régulier." },
          minutes: 30, price: 35 },
        { name: { en: "Gel manicure", fr: "Manucure gel" },
          desc: { en: "Long-wear gel colour, cured under LED.", fr: "Couleur gel longue tenue, séchée sous DEL." },
          minutes: 45, price: 50 },
        { name: { en: "Gel removal + new set", fr: "Retrait gel + nouvelle pose" },
          desc: { en: "Gentle soak-off, then a fresh gel manicure.", fr: "Retrait en douceur, puis une nouvelle manucure gel." },
          minutes: 60, price: 60 }
      ]
    },
    {
      category: { en: "Pedicures", fr: "Pédicures" },
      items: [
        { name: { en: "Classic pedicure", fr: "Pédicure classique" },
          desc: { en: "Soak, exfoliation, callus care and polish.", fr: "Bain, exfoliation, soin des callosités et vernis." },
          minutes: 45, price: 50 },
        { name: { en: "Spa pedicure", fr: "Pédicure spa" },
          desc: { en: "Classic pedicure plus mask and hot-towel massage.", fr: "Pédicure classique avec masque et massage aux serviettes chaudes." },
          minutes: 60, price: 65 },
        { name: { en: "Gel pedicure", fr: "Pédicure gel" },
          desc: { en: "Full pedicure finished with gel colour.", fr: "Pédicure complète avec finition gel." },
          minutes: 60, price: 65 }
      ]
    },
    {
      category: { en: "Extensions & art", fr: "Rallonges et nail art" },
      items: [
        { name: { en: "Gel-X full set", fr: "Pose complète Gel-X" },
          desc: { en: "Soft-gel tips in any length and shape.", fr: "Capsules en gel souple, toutes longueurs et formes." },
          minutes: 90, price: 85 },
        { name: { en: "Builder gel (BIAB)", fr: "Gel de construction (BIAB)" },
          desc: { en: "Strengthens natural nails while they grow.", fr: "Renforce l'ongle naturel pendant la pousse." },
          minutes: 75, price: 70 },
        { name: { en: "Nail art", fr: "Nail art" },
          desc: { en: "Chrome, French, dots and hand-painted designs.", fr: "Chrome, french, pois et motifs peints à la main." },
          minutes: 15, price: 5, priceFrom: true, priceUnit: { en: "per nail", fr: "par ongle" } }
      ]
    }
  ],

  /* --- Gallery / Galerie ----------------------------------------------------
     image: path to a photo (e.g. "images/gallery-1.jpg").
     Leave image empty to show a drawn colour sample instead.
     style (for drawn samples): solid | french | ombre | chrome | dots      */
  gallery: [
    { image: "", color: "#8E1B3A", style: "solid",  label: { en: "Cherry lacquer", fr: "Laque cerise" } },
    { image: "", color: "#F1D6DC", style: "french", label: { en: "Soft French", fr: "French douce" } },
    { image: "", color: "#3B2A4A", style: "chrome", label: { en: "Plum chrome", fr: "Chrome prune" } },
    { image: "", color: "#E9B7C2", style: "ombre",  label: { en: "Blush ombré", fr: "Ombré rosé" } },
    { image: "", color: "#C9A27A", style: "dots",   label: { en: "Caramel dots", fr: "Pois caramel" } },
    { image: "", color: "#1F3A3A", style: "solid",  label: { en: "Forest gel", fr: "Gel forêt" } }
  ],
  instagram: "https://instagram.com/example",

  /* --- Reviews / Avis ------------------------------------------------------ */
  rating: { value: 4.9, count: 212, source: "Google" },
  testimonials: [
    { name: "Camille R.",
      text: { en: "My gel lasted almost four weeks without a single chip. The studio is spotless.",
              fr: "Mon gel a tenu presque quatre semaines sans un éclat. Le studio est impeccable." } },
    { name: "Priya S.",
      text: { en: "They took the time to fix my nails after a bad set elsewhere. Gentle and very precise.",
              fr: "Elles ont pris le temps de réparer mes ongles après une mauvaise pose ailleurs. Douces et très précises." } },
    { name: "Jordan M.",
      text: { en: "Booked online at lunch, in a chair by 6. Best pedicure I've had in Toronto.",
              fr: "Réservé en ligne le midi, assise à 18 h. Meilleure pédicure à Toronto." } }
  ],

  /* --- Visit / Nous trouver ------------------------------------------------ */
  timezone: "America/Toronto",
  location: {
    address: "123 Rue Example, Toronto, ON M6J 0A0",
    note: { en: "Street parking on Queen; 501 streetcar stops at the door.",
            fr: "Stationnement sur Queen; le tramway 501 s'arrête devant la porte." },
    // Paste a Google Maps "Embed a map" src here to show a live map.
    mapEmbedUrl: ""
  },
  phone: "416-555-0142",
  email: "bonjour@maisonlacque.example",

  // 0 = Sunday ... 6 = Saturday. null = closed.
  hours: {
    1: ["10:00", "19:00"],
    2: ["10:00", "19:00"],
    3: ["10:00", "20:00"],
    4: ["10:00", "20:00"],
    5: ["10:00", "20:00"],
    6: ["09:00", "18:00"],
    0: null
  },

  /* --- Interface text (rarely changed) / Textes de l'interface ------------- */
  ui: {
    navServices: { en: "Services", fr: "Services" },
    navGallery: { en: "Gallery", fr: "Galerie" },
    navReviews: { en: "Reviews", fr: "Avis" },
    navVisit: { en: "Visit", fr: "Nous trouver" },
    bookShort: { en: "Book", fr: "Réserver" },
    seePrices: { en: "See prices", fr: "Voir les prix" },
    servicesTitle: { en: "Services & prices", fr: "Services et prix" },
    galleryTitle: { en: "Recent sets", fr: "Poses récentes" },
    galleryMore: { en: "More on Instagram", fr: "Plus sur Instagram" },
    reviewsTitle: { en: "What clients say", fr: "Ce que disent nos clientes" },
    reviewsOn: { en: "reviews on", fr: "avis sur" },
    visitTitle: { en: "Visit the studio", fr: "Venir au studio" },
    hoursTitle: { en: "Hours", fr: "Heures d'ouverture" },
    closed: { en: "Closed", fr: "Fermé" },
    openNow: { en: "Open now", fr: "Ouvert" },
    closedNow: { en: "Closed now", fr: "Fermé" },
    until: { en: "until", fr: "jusqu'à" },
    today: { en: "Today", fr: "Aujourd'hui" },
    directions: { en: "Get directions", fr: "Itinéraire" },
    contactTitle: { en: "Contact", fr: "Contact" },
    from: { en: "from", fr: "dès" },
    min: { en: "min", fr: "min" },
    bookTitle: { en: "Ready for fresh nails?", fr: "Envie de nouveaux ongles?" },
    demo: { en: "Template preview with sample content", fr: "Aperçu du modèle, contenu fictif" }
  }
};
