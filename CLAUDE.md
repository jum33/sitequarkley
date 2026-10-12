# Dépôt « site Quarkley » : consignes pour Claude

Ce dépôt est le site vitrine quarkley.com : un site statique HTML/CSS/JS, sans étape de génération, présenté comme le site d'un SDIS fictif de démonstration, le **SDIS 00**. Il est publié par Netlify à partir de la racine du dépôt : ce fichier est donc lisible en ligne, comme tout le reste. N'y écris rien de confidentiel.

Le skill `quarkley-sdis00-site` contient les règles complètes (charte, composants, architecture, formulation, livraison). Charge-le avant toute modification ; en cas d'écart, c'est lui qui fait foi.

## Rappels essentiels

- Public : sapeurs-pompiers et directions de SDIS, non informaticiens. Pas de jargon technique sans explication. Principe à répéter : « l'IA prépare, l'agent décide ».
- Quarkley est la seule marque du portail citée sur le site. Ne nomme jamais la plateforme technique sous-jacente, ni dans les pages ni dans ce dépôt.
- Charte : chaque page charge `sdis00-chrome.css` et `sdis00.css`. Aucun `<style>` en ligne, aucune couleur codée en dur dans le HTML.
- Personnages, SDIS 00 et chiffres sont fictifs et doivent être signalés comme tels. Aucun montant de prix publié.
- Liens internes sans extension (`/terrain` → `terrain.html`). Une page supprimée est redirigée dans `_redirects`. Une nouvelle page est ajoutée à `sitemap.xml` et `llms.txt`.
- Après une modification des données de `sdis00.js`, relance `outils/prerender-seo.js`.
- Avant livraison : aucun lien interne cassé, captures à 1280 px et 390 px des pages modifiées, aucun défilement horizontal.
- Toute réorganisation (menu, fusion ou suppression de pages) se décide avec Jean-Marc avant d'être faite.
- Pull request vers `main` seulement à la demande de Jean-Marc. Vérifie l'aperçu Netlify, puis fusionne avec la méthode « merge ».
- Écris en français.
