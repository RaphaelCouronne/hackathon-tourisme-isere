# Boussole des flux — pitch

POC pour le Hackathon 2026 « Données touristiques » (DGE / Isère Attractivité, 9–10 nov. 2026).

**Concept** : un cockpit d'aide à la décision qui répond chaque semaine à une seule question —
*quels sites pousser, lesquels arrêter de pousser, et où envoyer les visiteurs à la place ?*

Il calcule un **indice de pression par site et par week-end** en croisant quatre familles de
signaux, puis classe chaque site en *pousser / surveiller / retenir* et propose une
**substitution** vers un site comparable et sous-fréquenté.

| Signal | Sources |
|---|---|
| Attractivité | DATAtourisme, Apidae (POI, événements, itinéraires) |
| Accessibilité | OSRM / distances routières, GTFS Loopi |
| Contexte | Météo-France, vacances scolaires, jour de semaine, événements |
| Vulnérabilité | Biodiv'Sports, zones protégées, capacité OSM |

Les comptages Eco-compteur / Affluences servent uniquement de **calibration optionnelle** :
le POC fonctionne sans vérité terrain.

## Contenu

- `pitch-boussole-des-flux.pptx` — deck de 7 slides (5–7 min), avec notes de présentation.
- `build-pitch.js` — générateur du deck (`pptxgenjs`), modifiable puis relancé.
- `icons.js` — génère les pictogrammes PNG (`react-icons` + `sharp`) dans `icons/`.
- `icons/` — pictogrammes utilisés par le générateur.

Régénérer le deck :

```bash
cd docs
node icons.js         # seulement si les pictogrammes changent
node build-pitch.js   # nécessite pptxgenjs dans le NODE_PATH
```

## Structure du deck

1. Couverture — positionnement en une phrase.
2. Constat — on mesure, on ne pilote pas.
3. Solution — l'indice de pression, quatre signaux.
4. Démo — le cockpit en 3 clics + substitution (valeurs illustratives).
5. Adéquation à la grille du jury + le chiffre à sortir.
6. Les six questions à trancher avant de coder.
7. Plan des 36 h et demandes concrètes aux experts.

## Six questions ouvertes

1. Périmètre du livrable : concept d'abord, code ensuite ?
2. Utilisateur cible : cockpit B2B plutôt qu'appli visiteur ?
3. Réalité de l'équipe : 4–6 personnes, 2 devs, 1 data, 1 profil tourisme ?
4. Emprise : toute l'Isère + zoom Oisans / Grésivaudan ?
5. Données : tout en open data, comptages en bonus ?
6. Ambition : démo 5 min / 3 clics / 1 chiffre ?

## Avertissements

- Les valeurs de la slide 4 et le « −30 % » de la slide 5 sont **illustratifs** ; ils doivent être
  remplacés par les sorties du pipeline avant le pitch final.
- Licence prévue pour le code : MIT (exigence du règlement, article 3.1).
