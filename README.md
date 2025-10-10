Westlake Talent Bridge UG — Website
===================================

Ein professioneller Unternehmensauftritt zur Vermittlung vietnamesischer Fachkräfte nach Deutschland.

Technik: HTML, SCSS, JavaScript (ohne Frameworks)

Struktur
--------
- index.html
- ueber-uns.html
- hotline.html
- kontakt.html
- css/styles.scss → Quelle (SCSS)
- css/styles.css → kompilierte CSS-Datei
- js/scripts.js
- img/logo-top.jpeg, img/logo-monogram.jpeg (Platzhalter)

SCSS kompilieren
-----------------
Verwenden Sie dart-sass oder ein beliebiges SCSS-Tool:

```
sass css/styles.scss css/styles.css --watch
```

Lokale Nutzung
--------------
1. SCSS kompilieren (siehe oben)
2. Öffnen Sie `index.html` im Browser

Inhalte
-------
Die Seiten enthalten deutsche Inhalte basierend auf dem bereitgestellten Prompt (Positionspapiere/Hotline). Animationen per IntersectionObserver (fade-in/slide-up), responsives Layout, Sticky-Header mit Burger-Menü.

