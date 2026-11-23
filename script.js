/* Renders the page from window.SALON (salon-config.js).
   No need to edit this file for a new client. */
(function () {
  "use strict";
  var S = window.SALON;
  var root = document.documentElement;
  var langs = S.languages && S.languages.length ? S.languages : ["en"];
  var lang = S.defaultLang || langs[0];
  try {
    var saved = localStorage.getItem("salon-lang");
    if (saved && langs.indexOf(saved) > -1) lang = saved;
  } catch (e) {}

  /* ---------- helpers ---------- */
  function t(v) {
    if (v == null) return "";
    if (typeof v === "object") return v[lang] != null ? v[lang] : (v[S.defaultLang] != null ? v[S.defaultLang] : v[Object.keys(v)[0]]);
    return v;
  }
  function ui(k) { return t(S.ui[k]); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(id) { return document.getElementById(id); }
  function locale() { return lang === "fr" ? "fr-CA" : "en-CA"; }
  function money(n) {
    return new Intl.NumberFormat(locale(), {
      style: "currency", currency: S.currency || "CAD",
      minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2
    }).format(n);
  }
  function fmtTime(hhmm) {
    var p = hhmm.split(":");
    var d = new Date(2024, 0, 1, +p[0], +p[1]);
    return new Intl.DateTimeFormat(locale(), { hour: "numeric", minute: "2-digit" }).format(d);
  }
  function dayName(i) {
    // 2024-01-07 was a Sunday
    return new Intl.DateTimeFormat(locale(), { weekday: "long" }).format(new Date(2024, 0, 7 + i));
  }
  function nowInSalon() {
    try {
      var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: S.timezone || undefined, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
      }).formatToParts(new Date());
      var o = {};
      parts.forEach(function (p) { o[p.type] = p.value; });
      var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return { day: days.indexOf(o.weekday), minutes: (+o.hour % 24) * 60 + +o.minute };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
    }
  }
  function toMin(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }
  function mapsLink() {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.name + ", " + S.location.address);
  }

  /* ---------- one-time setup ---------- */
  if (S.colors) {
    if (S.colors.accent) root.style.setProperty("--brand-light", S.colors.accent);
    if (S.colors.accentDark) root.style.setProperty("--brand-dark", S.colors.accentDark);
  }
  if (S.fonts) {
    if (S.fonts.display) root.style.setProperty("--font-display", S.fonts.display);
    if (S.fonts.body) root.style.setProperty("--font-body", S.fonts.body);
    if (S.fonts.googleFontsUrl && !document.querySelector('link[data-salon-fonts]')) {
      var l = document.createElement("link");
      l.rel = "stylesheet"; l.href = S.fonts.googleFontsUrl; l.setAttribute("data-salon-fonts", "");
      document.head.appendChild(l);
    }
  }

  /* ---------- render ---------- */
  function render() {
    root.lang = lang;
    document.title = S.name + " · " + t(S.tagline);

    document.querySelectorAll("[data-ui]").forEach(function (el) { el.textContent = ui(el.getAttribute("data-ui")); });
    document.querySelectorAll("[data-book]").forEach(function (el) {
      el.textContent = el.hasAttribute("data-short") ? ui("bookShort") : t(S.booking.label);
      el.href = S.booking.url || "#visit";
      if (S.booking.url && /^https?:/.test(S.booking.url)) { el.target = "_blank"; el.rel = "noopener"; }
    });

    var banner = $("demo-banner");
    banner.hidden = !S.demoBanner;
    banner.textContent = ui("demo");

    // brand
    $("brand").innerHTML = S.logo
      ? '<img src="' + esc(S.logo) + '" alt="' + esc(S.name) + '">'
      : '<span class="brand-name">' + esc(S.name) + '</span><span class="brand-tag">' + esc(t(S.tagline)) + "</span>";

    // language switch
    $("lang").hidden = langs.length < 2;
    $("lang").innerHTML = langs.map(function (l) {
      return '<button type="button" data-lang="' + l + '" aria-pressed="' + (l === lang) + '">' + l.toUpperCase() + "</button>";
    }).join("");

    // hero
    $("hero-eyebrow").textContent = t(S.hero.eyebrow);
    $("hero-title").innerHTML = t(S.hero.title); // allows <em>
    $("hero-text").textContent = t(S.hero.text);
    $("hero-facts").innerHTML = (S.hero.badges || []).map(function (b) {
      return "<li>" + esc(t(b)) + "</li>";
    }).join("");
    var sw = S.hero.swatches || [];
    $("fan").innerHTML = sw.map(function (c, i) {
      var mid = (sw.length - 1) / 2;
      return '<span class="nail" style="--c:' + esc(c) + ";--r:" + (i - mid) * 11 + "deg;--y:" + Math.abs(i - mid) * 14 + 'px"></span>';
    }).join("");

    // services
    $("price-note").textContent = t(S.priceNote);
    $("menu").innerHTML = S.services.map(function (cat) {
      return '<div class="menu-cat"><h3>' + esc(t(cat.category)) + "</h3><ul>" +
        cat.items.map(function (it) {
          var price = (it.priceFrom ? ui("from") + " " : "") + money(it.price) + (it.priceUnit ? " " + t(it.priceUnit) : "");
          return '<li class="menu-item"><div class="mi-main"><span class="mi-name">' + esc(t(it.name)) +
            '</span><span class="mi-dots" aria-hidden="true"></span><span class="mi-price">' + esc(price) + "</span></div>" +
            '<div class="mi-sub"><span>' + esc(t(it.desc)) + "</span>" +
            (it.minutes ? '<span class="mi-time">' + it.minutes + " " + ui("min") + "</span>" : "") + "</div></li>";
        }).join("") + "</ul></div>";
    }).join("");

    // gallery
    $("gallery-grid").innerHTML = S.gallery.map(function (g) {
      var inner = g.image
        ? '<img src="' + esc(g.image) + '" alt="' + esc(t(g.label)) + '" loading="lazy">'
        : '<div class="sample sample-' + esc(g.style || "solid") + '" style="--c:' + esc(g.color || "#999") + '"><span class="sample-nail"></span><span class="sample-nail"></span><span class="sample-nail"></span></div>';
      return "<figure>" + inner + "<figcaption>" + esc(t(g.label)) + "</figcaption></figure>";
    }).join("");
    var insta = $("insta");
    insta.hidden = !S.instagram;
    if (S.instagram) insta.href = S.instagram;

    // reviews
    var r = S.rating;
    $("rating").innerHTML = r
      ? '<span class="stars" aria-hidden="true">★★★★★</span> <strong>' +
        r.value.toLocaleString(locale(), { minimumFractionDigits: 1 }) + "</strong> · " + r.count + " " + esc(ui("reviewsOn")) + " " + esc(r.source)
      : "";
    $("quotes").innerHTML = S.testimonials.map(function (q) {
      return '<figure class="quote"><blockquote>' + esc(t(q.text)) + "</blockquote><figcaption>" + esc(q.name) + "</figcaption></figure>";
    }).join("");

    // visit
    $("address").textContent = S.location.address;
    $("location-note").textContent = t(S.location.note);
    $("directions").href = mapsLink();
    var contact = [];
    if (S.phone) contact.push('<li><span class="muted small">' + (lang === "fr" ? "Tél." : "Phone") + '</span><a href="tel:' + esc(S.phone.replace(/[^\d+]/g, "")) + '">' + esc(S.phone) + "</a></li>");
    if (S.email) contact.push('<li><span class="muted small">' + (lang === "fr" ? "Courriel" : "Email") + '</span><a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a></li>");
    if (S.instagram) contact.push('<li><span class="muted small">Instagram</span><a href="' + esc(S.instagram) + '" target="_blank" rel="noopener">@' + esc(S.instagram.replace(/\/$/, "").split("/").pop()) + "</a></li>");
    $("contact").innerHTML = contact.join("");

    var now = nowInSalon();
    var order = [1, 2, 3, 4, 5, 6, 0];
    $("hours").innerHTML = order.map(function (d) {
      var h = S.hours[d];
      var isToday = d === now.day;
      return '<tr class="' + (isToday ? "is-today" : "") + '"><th scope="row">' + esc(dayName(d)) +
        (isToday ? ' <span class="today">' + esc(ui("today")) + "</span>" : "") + "</th><td>" +
        (h ? esc(fmtTime(h[0])) + " – " + esc(fmtTime(h[1])) : '<span class="muted">' + esc(ui("closed")) + "</span>") + "</td></tr>";
    }).join("");
    var today = S.hours[now.day];
    var open = today && now.minutes >= toMin(today[0]) && now.minutes < toMin(today[1]);
    var st = $("status");
    st.className = "status " + (open ? "is-open" : "is-closed");
    st.textContent = open ? ui("openNow") + " · " + ui("until") + " " + fmtTime(today[1]) : ui("closedNow");

    $("map").innerHTML = S.location.mapEmbedUrl
      ? '<iframe src="' + esc(S.location.mapEmbedUrl) + '" title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
      : '<a class="map-card" href="' + esc(mapsLink()) + '" target="_blank" rel="noopener"><span class="pin" aria-hidden="true"></span><span class="map-name">' +
        esc(S.name) + '</span><span class="map-addr">' + esc(S.location.address) + "</span></a>";

    // booking band + footer
    $("book-note").textContent = t(S.booking.note);
    $("footer").innerHTML = '<span class="brand-name">' + esc(S.name) + "</span><span>" + esc(S.location.address) + "</span>" +
      (S.phone ? "<span>" + esc(S.phone) + "</span>" : "") + "<span>© " + new Date().getFullYear() + " " + esc(S.name) + "</span>";
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lang]");
    if (!b) return;
    lang = b.getAttribute("data-lang");
    try { localStorage.setItem("salon-lang", lang); } catch (err) {}
    render();
  });

  render();
})();
