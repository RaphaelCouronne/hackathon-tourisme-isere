const pptxgen = require("pptxgenjs");
const path = require("path");

const ICON = (n, c = "dark") => path.join(__dirname, "icons", `${n}-${c}.png`);

// Palette — alpine forest + trail marker
const DARK = "0E2B24";
const DARK2 = "153A31";
const MOSS = "2F6B57";
const SAGE = "7FA893";
const MINT = "EAF1ED";
const MINT2 = "DCE8E2";
const ACCENT = "E39A3B";
const ACCENT_SOFT = "FBEFDC";
const WHITE = "FFFFFF";
const INK = "12211D";
const MUTED = "5C7268";
const RED = "B5533C";

const H = "Cambria";
const B = "Calibri";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "Équipe Boussole des flux";
pres.title = "Boussole des flux — Hackathon données touristiques 2026";

let pageNo = 0;
function chrome(slide, dark = false) {
  pageNo++;
  slide.addText("Boussole des flux", {
    x: 0.62, y: 6.95, w: 4, h: 0.3, fontFace: B, fontSize: 9,
    color: dark ? "6E8C80" : "93A79E", margin: 0, charSpacing: 0.6,
  });
  slide.addText(String(pageNo).padStart(2, "0"), {
    x: 12.1, y: 6.95, w: 0.6, h: 0.3, fontFace: B, fontSize: 9,
    color: dark ? "6E8C80" : "93A79E", align: "right", margin: 0,
  });
}

function kicker(slide, text, color = MOSS) {
  slide.addText(text, {
    x: 0.65, y: 0.5, w: 11, h: 0.3, fontFace: B, fontSize: 10.5,
    bold: true, color, charSpacing: 1.8, margin: 0,
  });
}

function title(slide, text, color = INK, y = 0.82) {
  slide.addText(text, {
    x: 0.62, y, w: 12.1, h: 0.95, fontFace: H, fontSize: 33,
    bold: true, color, margin: 0, lineSpacing: 34,
  });
}

function deck(slide, y, text, color = INK, size = 14) {
  slide.addText(text, {
    x: 0.65, y, w: 11.6, h: 0.4, fontFace: B, fontSize: size,
    color, margin: 0, italic: true,
  });
}

function iconBadge(slide, name, x, y, size = 0.62, circle = MINT, tint = "dark") {
  slide.addShape(pres.ShapeType.ellipse, {
    x, y, w: size, h: size, fill: { color: circle }, line: { color: circle, width: 0 },
  });
  const pad = size * 0.26;
  slide.addImage({ path: ICON(name, tint), x: x + pad, y: y + pad, w: size - 2 * pad, h: size - 2 * pad });
}

function card(slide, x, y, w, h, fill = WHITE, line = null) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.06, fill: { color: fill },
    line: line ? { color: line, width: 1 } : { color: fill, width: 0 },
  });
}

// ============================ 1 — COVER ============================
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addShape(pres.ShapeType.ellipse, {
    x: 9.4, y: -2.1, w: 6.4, h: 6.4, fill: { color: DARK2 }, line: { color: DARK2, width: 0 },
  });
  s.addShape(pres.ShapeType.ellipse, {
    x: 10.9, y: 3.5, w: 3.4, h: 3.4, fill: { color: "12332B" }, line: { color: "1D4A3E", width: 1 },
  });
  s.addImage({ path: ICON("mountain", "accent"), x: 11.42, y: 4.02, w: 2.36, h: 2.36 });

  s.addText("HACKATHON  ·  DONNÉES TOURISTIQUES  ·  ISÈRE 2026", {
    x: 0.9, y: 1.02, w: 8.4, h: 0.3, fontFace: B, fontSize: 11, bold: true,
    color: SAGE, charSpacing: 2.2, margin: 0,
  });
  s.addText("Boussole\ndes flux", {
    x: 0.85, y: 1.62, w: 8.0, h: 2.1, fontFace: H, fontSize: 60, bold: true,
    color: WHITE, margin: 0, lineSpacing: 62,
  });
  s.addText("Le cockpit qui dit à une destination quels sites pousser — et lesquels arrêter de pousser — chaque jeudi.", {
    x: 0.9, y: 3.95, w: 7.7, h: 1.0, fontFace: B, fontSize: 19, color: "C6DCD3",
    margin: 0, lineSpacing: 26,
  });

  const pills = ["4 familles de données croisées", "1 décision par semaine", "aucune vérité terrain requise"];
  pills.forEach((t, i) => {
    s.addShape(pres.ShapeType.roundRect, {
      x: 0.9, y: 5.32 + i * 0.44, w: 0.16, h: 0.16, rectRadius: 0.08,
      fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
    });
    s.addText(t, {
      x: 1.22, y: 5.24 + i * 0.44, w: 6.0, h: 0.3, fontFace: B, fontSize: 13,
      color: "DCEAE4", margin: 0,
    });
  });

  s.addText("POC open source · Python + carte web · données ouvertes", {
    x: 0.9, y: 6.86, w: 6.5, h: 0.3, fontFace: B, fontSize: 10, color: "6E8C80", margin: 0,
  });
}

// ============================ 2 — PROBLÈME ============================
{
  const s = pres.addSlide();
  s.background = { color: "F7FAF8" };
  kicker(s, "LE CONSTAT");
  title(s, "On mesure les flux.\nOn ne les pilote pas.");
  deck(s, 2.42, "Les données affluent ; la décision, elle, reste manuelle et tardive.");

  const items = [
    ["clock", "Observer ≠ décider", "Compteurs, enquêtes, dashboards : beaucoup d’observation, peu de recommandations actionnables le lundi matin."],
    ["pin", "La pression se concentre", "Quelques sites iconiques absorbent les pics (Oisans, Grésivaudan) pendant que des sites équivalents restent invisibles."],
    ["database", "La donnée est éparpillée", "DATAtourisme, Apidae, OSM, météo, GTFS, zones sensibles : jamais croisées dans un même raisonnement."],
  ];
  items.forEach(([icon, h, body], i) => {
    const x = 0.65 + i * 4.13;
    card(s, x, 3.0, 3.85, 2.28, WHITE, "E2EAE5");
    iconBadge(s, icon, x + 0.34, 3.28, 0.6, ACCENT_SOFT, "dark");
    s.addText(h, {
      x: x + 0.34, y: 4.04, w: 3.2, h: 0.32, fontFace: B, fontSize: 14.5, bold: true, color: INK, margin: 0,
    });
    s.addText(body, {
      x: x + 0.34, y: 4.4, w: 3.2, h: 0.8, fontFace: B, fontSize: 11.5, color: MUTED, margin: 0, lineSpacing: 15,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: 0.65, y: 5.58, w: 12.05, h: 0.94, rectRadius: 0.06,
    fill: { color: MINT }, line: { color: MINT, width: 0 },
  });
  s.addText("Le manque n’est pas la donnée : c’est le passage\nde l’observation à l’action.", {
    x: 1.0, y: 5.72, w: 11.3, h: 0.68, fontFace: H, fontSize: 18, bold: true, color: DARK, margin: 0, lineSpacing: 22,
  });
  chrome(s);
}

// ============================ 3 — SOLUTION ============================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  kicker(s, "LA SOLUTION");
  title(s, "Un indice de pression,\nquatre signaux croisés");

  const cols = [
    ["pin", "Attractivité", "POI, événements et itinéraires DATAtourisme / Apidae, pondérés par catégorie."],
    ["route", "Accessibilité", "Temps de trajet voiture (OSRM) et accès sans voiture (GTFS Loopi)."],
    ["sun", "Contexte", "Prévisions Météo-France, vacances, jour de semaine, événements locaux."],
    ["leaf", "Vulnérabilité", "Zones sensibles Biodiv’Sports, protections, capacité routière OSM."],
  ];
  const w = 2.86;
  cols.forEach(([icon, h, body], i) => {
    const x = 0.62 + i * (w + 0.28);
    card(s, x, 2.52, w, 2.42, "F7FAF8", "E2EAE5");
    iconBadge(s, icon, x + 0.28, 2.76, 0.56, MINT, "dark");
    s.addText(h, {
      x: x + 0.28, y: 3.42, w: w - 0.5, h: 0.32, fontFace: B, fontSize: 14, bold: true, color: INK, margin: 0,
    });
    s.addText(body, {
      x: x + 0.28, y: 3.76, w: w - 0.5, h: 1.0, fontFace: B, fontSize: 11, color: MUTED, margin: 0, lineSpacing: 14.5,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: 0.62, y: 5.28, w: 12.05, h: 1.18, rectRadius: 0.06,
    fill: { color: DARK }, line: { color: DARK, width: 0 },
  });
  s.addText("INDICE DE PRESSION  ·  PAR SITE ET PAR WEEK-END", {
    x: 0.95, y: 5.46, w: 7.0, h: 0.28, fontFace: B, fontSize: 10, bold: true, color: SAGE, charSpacing: 1.4, margin: 0,
  });
  s.addText("Pousser  ·  Surveiller  ·  Retenir  ·  Substituer", {
    x: 0.95, y: 5.78, w: 7.6, h: 0.46, fontFace: H, fontSize: 20, bold: true, color: WHITE, margin: 0,
  });
  s.addText("Calculé sur données ouvertes ; calibrable sur\ncomptages Eco-compteur / Affluences si disponibles.", {
    x: 8.7, y: 5.58, w: 3.8, h: 0.66, fontFace: B, fontSize: 10, color: "B7CDC4", margin: 0, lineSpacing: 13.5,
  });
  chrome(s);
}

// ============================ 4 — LE COCKPIT ============================
{
  const s = pres.addSlide();
  s.background = { color: "F7FAF8" };
  kicker(s, "LA DÉMO EN 3 CLICS");
  title(s, "Jeudi 9 h : que pousse-t-on ce week-end ?");

  const cols = [
    ["À POUSSER", "Capacité disponible, faible pression", "9CBFAC", [["Col de Sarenne", "22"], ["Lac de la Muzelle", "26"], ["Fort Barraux", "31"]]],
    ["À SURVEILLER", "Proche du seuil de saturation", "E5B363", [["Cascade de la Sillans", "58"], ["Pont-en-Royans", "63"], ["Chamrousse", "67"]]],
    ["À RETENIR", "Pic attendu, site fragile", "C98A76", [["Alpe d’Huez", "92"], ["Grande Chartreuse", "88"], ["Lans-en-Vercors", "84"]]],
  ];
  const w = 3.05;
  cols.forEach(([head, sub, dot, list], i) => {
    const x = 0.62 + i * (w + 0.28);
    card(s, x, 2.32, w, 3.1, WHITE, "E2EAE5");
    s.addShape(pres.ShapeType.ellipse, {
      x: x + 0.3, y: 2.58, w: 0.13, h: 0.13, fill: { color: dot }, line: { color: dot, width: 0 },
    });
    s.addText(head, {
      x: x + 0.52, y: 2.5, w: w - 0.7, h: 0.28, fontFace: B, fontSize: 10.5, bold: true, color: INK, charSpacing: 1.2, margin: 0,
    });
    s.addText(sub, {
      x: x + 0.3, y: 2.84, w: w - 0.55, h: 0.4, fontFace: B, fontSize: 10, italic: true, color: MUTED, margin: 0, lineSpacing: 13,
    });
    list.forEach(([name, score], j) => {
      const y = 3.44 + j * 0.58;
      s.addShape(pres.ShapeType.roundRect, {
        x: x + 0.24, y, w: w - 0.48, h: 0.46, rectRadius: 0.04,
        fill: { color: "F4F8F6" }, line: { color: "EAF1ED", width: 0 },
      });
      s.addText(name, {
        x: x + 0.36, y: y + 0.1, w: w - 0.85, h: 0.28, fontFace: B, fontSize: 11.5, color: INK, margin: 0,
      });
      s.addText(score, {
        x: x + w - 0.62, y: y + 0.1, w: 0.36, h: 0.28, fontFace: B, fontSize: 11, bold: true,
        color: i === 0 ? MOSS : i === 1 ? "B57C24" : RED, align: "right", margin: 0,
      });
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: 0.62, y: 5.62, w: 7.55, h: 0.86, rectRadius: 0.06, fill: { color: ACCENT_SOFT }, line: { color: ACCENT_SOFT, width: 0 },
  });
  s.addImage({ path: ICON("shuffle", "dark"), x: 0.88, y: 5.83, w: 0.42, h: 0.42 });
  s.addText([
    { text: "Substitution proposée : ", options: { bold: true, color: INK } },
    { text: "Alpe d’Huez (92) → Col de Sarenne (24), même massif, 25 min, accessible en voiture.", options: { color: "4A5F55" } },
  ], { x: 1.44, y: 5.8, w: 6.6, h: 0.5, fontFace: B, fontSize: 11.5, margin: 0, lineSpacing: 14 });

  s.addText("Valeurs illustratives —\nremplacées par l’indice calculé en démo.", {
    x: 8.5, y: 5.72, w: 4.1, h: 0.66, fontFace: B, fontSize: 9.5, italic: true, color: "93A79E", margin: 0, lineSpacing: 13,
  });
  chrome(s);
}

// ============================ 5 — POURQUOI ÇA GAGNE ============================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  kicker(s, "ADÉQUATION AVEC LA GRILLE DU JURY");
  title(s, "Pourquoi ce POC peut gagner");

  const items = [
    ["database", "Pertinence des données", "Quatre familles ouvertes croisées, pas un seul jeu recyclé en dashboard."],
    ["target", "Bénéfice réel", "On agit sur la demande, pas seulement sur l’offre : dé-promotion ciblée."],
    ["map", "Mise à l’échelle", "Formule agnostique : un fichier de config par territoire."],
    ["sprout", "Originalité", "La substitution — où envoyer le visiteur — absente des observatoires."],
  ];
  items.forEach(([icon, h, body], i) => {
    const y = 2.28 + i * 0.94;
    iconBadge(s, icon, 0.62, y + 0.02, 0.5, MINT, "dark");
    s.addText(h, { x: 1.28, y, w: 3.4, h: 0.3, fontFace: B, fontSize: 13.5, bold: true, color: INK, margin: 0 });
    s.addText(body, { x: 1.28, y: y + 0.34, w: 3.35, h: 0.56, fontFace: B, fontSize: 10.5, color: MUTED, margin: 0, lineSpacing: 13.5 });
  });

  // Result panel
  s.addShape(pres.ShapeType.roundRect, {
    x: 5.0, y: 2.2, w: 7.67, h: 3.95, rectRadius: 0.08, fill: { color: DARK }, line: { color: DARK, width: 0 },
  });
  s.addText("LE CHIFFRE À SORTIR", {
    x: 5.42, y: 2.52, w: 5.0, h: 0.28, fontFace: B, fontSize: 9.5, bold: true, color: SAGE, charSpacing: 1.6, margin: 0,
  });
  s.addText("−30 %", {
    x: 5.36, y: 2.86, w: 3.6, h: 1.15, fontFace: H, fontSize: 58, bold: true, color: ACCENT, margin: 0,
  });
  s.addText("de pression attendue sur les 3 sites saturés,\nredistribuée vers des alternatives équivalentes.", {
    x: 5.42, y: 4.28, w: 4.6, h: 0.8, fontFace: B, fontSize: 13, color: "DCEAE4", margin: 0, lineSpacing: 18,
  });
  s.addText("Objectif de démonstration : la valeur exacte sera recalculée sur les données du week-end.", {
    x: 5.42, y: 5.48, w: 6.9, h: 0.4, fontFace: B, fontSize: 10, italic: true, color: "8FA89D", margin: 0, lineSpacing: 13,
  });
  chrome(s);
}

// ============================ 6 — QUESTIONS ============================
{
  const s = pres.addSlide();
  s.background = { color: "F7FAF8" };
  kicker(s, "À TRANCHER AVANT DE CODER");
  title(s, "Six questions pour approfondir");

  const qs = [
    ["01", "Périmètre du livrable", "Concept + spec + pitch, ou scaffolding du dépôt dès maintenant ?", "Concept d’abord, code ensuite."],
    ["02", "Utilisateur et décision", "Cockpit B2B pour gestionnaires, appli visiteur, observatoire élus ?", "Cockpit B2B : une décision claire."],
    ["03", "Réalité de l’équipe", "4–6 personnes avec 2 devs, 1 data, 1 profil tourisme ?", "Dimensionner pour cette équipe."],
    ["04", "Emprise territoriale", "Toute l’Isère + zoom Oisans / Grésivaudan, ou un seul massif ?", "Carte Isère + 2 EPCI partenaires."],
    ["05", "Données disponibles", "Sans comptages avant J1, clés API seulement sur place ?", "Tout en open data, comptages = bonus."],
    ["06", "Niveau d’ambition", "Démo 5 min / 3 clics / 1 chiffre, ou plateforme complète ?", "Démo d’abord, un chiffre qui marque."],
  ];
  const w = 5.86;
  qs.forEach(([num, h, q, rec], i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.62 + col * (w + 0.35), y = 2.16 + row * 1.52;
    card(s, x, y, w, 1.32, WHITE, "E2EAE5");
    s.addText(num, {
      x: x + 0.24, y: y + 0.18, w: 0.5, h: 0.3, fontFace: H, fontSize: 15, bold: true, color: ACCENT, margin: 0,
    });
    s.addText(h, {
      x: x + 0.78, y: y + 0.16, w: w - 1.0, h: 0.28, fontFace: B, fontSize: 13, bold: true, color: INK, margin: 0,
    });
    s.addText(q, {
      x: x + 0.78, y: y + 0.46, w: w - 1.0, h: 0.34, fontFace: B, fontSize: 10.5, color: MUTED, margin: 0, lineSpacing: 13,
    });
    s.addText([
      { text: "→  ", options: { bold: true, color: MOSS } },
      { text: rec, options: { color: MOSS } },
    ], { x: x + 0.78, y: y + 0.92, w: w - 1.0, h: 0.26, fontFace: B, fontSize: 10.5, bold: true, margin: 0 });
  });
  chrome(s);
}

// ============================ 7 — ROADMAP ============================
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  kicker(s, "PLAN DES DEUX JOURS", SAGE);
  title(s, "De l’open data au pitch,\nen 36 heures", WHITE);

  const steps = [
    ["J1 · matin", "Pipeline", "Clients API fournis, unification des POI, grille commune × site."],
    ["J1 · 18 h", "Prototype", "Carte de pression + premiers seuils. Livrable intermédiaire."],
    ["J2 · matin", "Substitution", "Appariement des sites, calcul de l’impact chiffré."],
    ["J2 · 15 h", "Pitch", "Démo 5 min, dépôt documenté, licence MIT."],
  ];
  const w = 2.86;
  steps.forEach(([when, h, body], i) => {
    const x = 0.62 + i * (w + 0.28);
    if (i < 3) {
      s.addShape(pres.ShapeType.line, {
        x: x + w, y: 3.18, w: 0.28, h: 0, line: { color: "3A6154", width: 1.5, dashType: "dash" },
      });
    }
    s.addShape(pres.ShapeType.ellipse, {
      x: x + 0.1, y: 2.98, w: 0.34, h: 0.34, fill: { color: i === 1 ? ACCENT : "1D4A3E" },
      line: { color: i === 1 ? ACCENT : "3A6154", width: 1 },
    });
    s.addText(when, {
      x, y: 3.5, w: w, h: 0.28, fontFace: B, fontSize: 10, bold: true, color: SAGE, charSpacing: 1.2, margin: 0,
    });
    s.addText(h, {
      x, y: 3.8, w: w, h: 0.36, fontFace: H, fontSize: 19, bold: true, color: WHITE, margin: 0,
    });
    s.addText(body, {
      x, y: 4.2, w: w - 0.25, h: 0.9, fontFace: B, fontSize: 10.5, color: "A9C1B7", margin: 0, lineSpacing: 14,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: 0.62, y: 5.36, w: 12.05, h: 1.16, rectRadius: 0.06,
    fill: { color: DARK2 }, line: { color: "2A5246", width: 1 },
  });
  s.addImage({ path: ICON("users", "accent"), x: 0.94, y: 5.63, w: 0.5, h: 0.5 });
  s.addText("Ce qu’on demande aux experts", {
    x: 1.6, y: 5.52, w: 4.4, h: 0.3, fontFace: B, fontSize: 12, bold: true, color: WHITE, margin: 0,
  });
  s.addText("Valider la liste des sites sensibles · discuter les seuils de pression · indiquer un comptage réel utilisable comme calibration.", {
    x: 1.6, y: 5.84, w: 10.6, h: 0.5, fontFace: B, fontSize: 11.5, color: "B7CDC4", margin: 0, lineSpacing: 15,
  });

  s.addText("Boussole des flux", {
    x: 0.62, y: 6.9, w: 5, h: 0.3, fontFace: H, fontSize: 11, bold: true, color: "6E8C80", margin: 0,
  });
  s.addText("07", {
    x: 12.1, y: 6.9, w: 0.6, h: 0.3, fontFace: B, fontSize: 9, color: "6E8C80", align: "right", margin: 0,
  });
}

const NOTES = [
  `Ouverture (30 s)
« On a tous vu passer un dashboard de fréquentation. La question que personne ne traite, c'est : lundi matin, qu'est-ce que je fais de ce chiffre ? »
Boussole des flux ne mesure pas les flux : elle recommande une action hebdomadaire — pousser, surveiller, retenir, substituer.
Insister : tout tourne sur données ouvertes, aucune vérité terrain nécessaire.`,
  `Constat (45 s)
Trois angles morts, pas un seul.
1) L'observation domine, la décision reste manuelle.
2) La pression se concentre sur quelques hotspots (Oisans, Grésivaudan) alors que des sites équivalents sont vides.
3) Les jeux de données existent mais ne sont jamais croisés dans un même raisonnement.
Phrase de transition : « Le problème n'est pas la donnée, c'est le passage à l'action. »`,
  `Solution (60 s)
Un indice de pression par site et par week-end, croisant quatre familles :
- attractivité (POI/événements DATAtourisme & Apidae, pondérés)
- accessibilité (temps de trajet OSRM voiture, GTFS Loopi sans voiture)
- contexte (prévisions météo, vacances, jour, événements)
- vulnérabilité (zones sensibles Biodiv'Sports, protections, capacité OSM)
Sortie : quatre statuts — pousser, surveiller, retenir, substituer.
Calibration optionnelle sur comptages Eco-compteur / Affluences si disponibles.`,
  `Démo (90 s)
Récit : jeudi 9 h, le gestionnaire ouvre l'outil.
1 clic : la carte d'Isère avec les sites colorés.
2e clic : le top « à retenir » du week-end — Alpe d'Huez, Grande Chartreuse, Lans-en-Vercors.
3e clic : la substitution proposée — Alpe d'Huez → Col de Sarenne, même massif, 25 min.
PRÉCISER À L'ORAL : les valeurs affichées sont illustratives tant que le pipeline n'est pas branché ; elles sont remplacées en direct si la démo est live.`,
  `Pourquoi ça gagne (45 s)
Reprendre la grille du jury point par point : pertinence des données, bénéfice réel (on agit sur la demande), mise à l'échelle (config par territoire), originalité (la substitution).
Le chiffre : −30 % de pression attendue sur les 3 sites saturés, redistribuée.
Si le jury challenge le chiffre : c'est un ordre de grandeur issu des pondérations, à recalculer sur les données du week-end — l'important est la méthode, pas le chiffre exact.`,
  `Questions ouvertes (60 s)
Ces six points sont les vraies inconnues du projet. Les poser au jury / aux experts plutôt que les inventer :
1) périmètre du livrable, 2) utilisateur cible, 3) taille réelle de l'équipe, 4) emprise territoriale, 5) données réellement disponibles J1, 6) niveau d'ambition.
Chaque carte porte la recommandation par défaut : si personne ne tranche, on part là-dessus.`,
  `Plan et demande aux experts (45 s)
J1 matin pipeline sur les clients API fournis, J1 18 h prototype + livrable intermédiaire, J2 matin substitution et impact chiffré, J2 15 h pitch + dépôt documenté licence MIT.
Trois demandes concrètes aux experts :
- valider la liste des sites sensibles,
- discuter les seuils de pression (est-ce que 70 est saturé en Isère ?),
- indiquer un comptage réel utilisable comme calibration.
Clôture : « On ne prédit pas la fréquentation. On décide où envoyer les gens. »`,
];
pres._slides.forEach((s, i) => s.addNotes(NOTES[i]));

pres.writeFile({ fileName: path.join(__dirname, "pitch-boussole-des-flux.pptx") }).then(() => console.log("written"));