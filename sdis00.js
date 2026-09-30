/* SDIS 00 : organigramme IA, bons gestes, école IA, espace direction, contact.
   Chaque bloc ne s'exécute que sur la page qui contient ses éléments. */

const I = {
  star:'<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  pen:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  mega:'<path d="M4 10v4h3l7 4V6L7 10z"/><path d="M18 9a4 4 0 010 6"/>',
  scale:'<path d="M12 4v16M7 20h10M5 8h14"/><path d="M5 8l-2.5 6a3 3 0 005 0zM19 8l-2.5 6a3 3 0 005 0z"/>',
  users:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.6c2.8.2 5 2 5 5"/>',
  euro:'<path d="M17 6.5A6.5 6.5 0 007 12a6.5 6.5 0 0010 5.5"/><path d="M4 10.5h9M4 13.5h9"/>',
  server:'<rect x="4" y="4" width="16" height="7" rx="2"/><rect x="4" y="13" width="16" height="7" rx="2"/><path d="M8 7.5h.01M8 16.5h.01"/>',
  truck:'<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  flame:'<path d="M12 3c1 4 5 5.5 5 10a5 5 0 01-10 0c0-2.5 1.5-3.5 2-5 1 1 1.5 2 1.5 3 1-2 1.5-5 1.5-8z"/>',
  map:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  headset:'<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19c0 1.5-2 2-5 2"/>',
  grad:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>'
};
const svg = (k, c) => `<svg viewBox="0 0 24 24" fill="none" stroke="${c || 'currentColor'}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${I[k]}</svg>`;

/* kind = "real" (cas en production dans un vrai SDIS, anonymisé) ou "type" (cas non déployé, à valider en test)
   origin = provenance anonymisée d'un cas réel, ex. "SDIS de catégorie B · Nouvelle-Aquitaine"
   n = agents du bureau par catégorie [A,B,C]; f = occurrences par agent et par an; t = minutes [avant, après]
   s = étapes avant ; ai = index des étapes prises en charge par l'IA. Tous chiffres illustratifs. */
const B = [
 {id:"ddsis", kind:"type", origin:"", g:"Direction", k:"Directeur (DDSIS)", ic:"star", c:"var(--red)", p:"Col. Antoine Morel", n:[1,1,1], f:24, t:[180,30],
  task:"Préparer une note au président du conseil d'administration",
  s:["Demander les chiffres aux groupements","Relancer ceux qui n'ont pas répondu","Compiler les tableaux","Rédiger la note","Relire et arbitrer"], ai:[0,1,2,3],
  q:"Prépare ma note au président sur l'activité du trimestre.", a:"Note prête en 1 page :<ul><li>Activité opérationnelle +4 %</li><li>Budget tenu</li><li>2 points d'arbitrage</li></ul>", src:"Tableaux de bord des groupements · T3",
  gd:"La note est relue et signée par le directeur.",
  acc:[["Piloter l'IA","Atelier direction","½ jour"],["Charte IA du SDIS","Rédigée avec vous","livrable"],["Tableau de bord","Usages et coûts","mensuel"]]},
 {id:"dda", kind:"type", origin:"", g:"Direction", k:"Directeur adjoint (DDA)", ic:"compass", c:"var(--blue)", p:"Lcl Claire Martin", n:[2,1,1], f:48, t:[240,30],
  task:"Préparer le comité de direction",
  s:["Lire les rapports des groupements","Repérer les sujets à arbitrer","Construire l'ordre du jour","Rédiger la synthèse","Diffuser le relevé de décisions"], ai:[0,1,3,4],
  q:"Synthétise les remontées des groupements pour le CODIR de lundi.", a:"3 enjeux à arbitrer :<ul><li>Effectifs de garde été</li><li>Disponibilité du parc VSAV</li><li>Retards de formation</li></ul>", src:"5 rapports de groupement",
  gd:"L'ordre du jour reste fixé par le DDA.",
  acc:[["Piloter l'IA","Atelier direction","½ jour"],["Assistant CODIR","Construit avec vous","1 séance"],["Suivi","Point mensuel","30 min"]]},
 {id:"secr", kind:"real", origin:"SDIS de catégorie B · Nouvelle-Aquitaine", g:"Services de direction", k:"Secrétariat de direction", ic:"pen", c:"var(--red)", p:"Julie Garnier", n:[6,4,2], f:40, t:[240,30],
  task:"Rédiger une délibération après séance",
  s:["Réécouter l'enregistrement","Prendre des notes","Retrouver les votes","Rédiger au format","Faire relire"], ai:[0,1,2,3],
  q:"Transforme l'enregistrement du conseil en projet de délibération.", a:"Projet n° 2026-14 prêt :<ul><li>4 décisions extraites</li><li>Votes reportés</li><li>Mise en page du service</li></ul>", src:"Audio de séance · modèle de délibération",
  gd:"Relecture par le secrétariat de l'assemblée avant signature.",
  acc:[["Rédiger vite et juste","Comptes rendus, courriers","2 h"],["Assistant délibérations","Sur vos modèles","1 séance"],["Suivi","Ajustements","à la demande"]]},
 {id:"com", kind:"type", origin:"", g:"Services de direction", k:"Communication", ic:"mega", c:"var(--amber)", p:"Léa Fontaine", n:[5,3,1], f:100, t:[60,15],
  task:"Publier après une intervention marquante",
  s:["Récupérer les éléments auprès du CODIS","Vérifier ce qui est publiable","Rédiger le post","Décliner pour chaque réseau","Faire valider"], ai:[0,2,3],
  q:"Rédige un post LinkedIn et un post Facebook sur le feu d'entrepôt de cette nuit.", a:"2 versions prêtes, sans donnée personnelle, avec rappel des moyens engagés et remerciements.", src:"Synthèse CODIS · charte éditoriale",
  gd:"Aucune donnée de victime. Validation par la direction.",
  acc:[["IA et communication publique","Ce qu'on publie, ce qu'on ne publie pas","2 h"],["Assistant éditorial","À votre charte","1 séance"],["Acculturation","Équipe com","1 h"]]},
 {id:"jur", kind:"type", origin:"", g:"Services de direction", k:"Juridique & DPO", ic:"scale", c:"var(--blue)", p:"Nadia Petit", n:[4,2,1], f:30, t:[180,45],
  task:"Documenter un nouveau traitement de données",
  s:["Recenser les données traitées","Qualifier la finalité","Évaluer le risque","Rédiger la fiche registre","Valider avec le service"], ai:[0,2,3],
  q:"Prépare la fiche registre du nouvel assistant RH.", a:"Fiche générée : finalité, données, durée de conservation, niveau de risque au sens du règlement européen sur l'IA.", src:"Trame registre RGPD",
  gd:"La qualification juridique reste celle du DPO.",
  acc:[["RGPD et règlement IA","Obligations concrètes","2 h"],["Kit conformité","Registre, charte","livrable"],["Attestations","Formation des agents (art. 4)","incluses"]]},
 {id:"rh", kind:"type", origin:"", g:"Pôle ressources", k:"Ressources humaines", ic:"users", c:"var(--amber)", p:"Cne Sophie Durand", n:[40,22,10], f:200, t:[20,5],
  task:"Répondre à une question statutaire d'agent",
  s:["Lire la demande","Chercher la note de service","Vérifier le texte en vigueur","Rédiger la réponse","Archiver"], ai:[1,2,3,4],
  q:"Un SPV peut-il cumuler sa disponibilité avec un temps partiel ?", a:"Oui, sous conditions : <ul><li>Accord de l'employeur</li><li>Convention de disponibilité</li></ul>Réponse type prête à envoyer.", src:"Note de service RH-2025-11, § 3",
  gd:"Aucune donnée individuelle d'agent dans l'assistant.",
  acc:[["IA et données RH","Ce qu'on confie, ce qu'on garde","2 h"],["Assistant échéances","Aptitudes, FMPA, permis","1 séance"],["Acculturation","Toute l'équipe RH","1 h"]]},
 {id:"fin", kind:"type", origin:"", g:"Pôle ressources", k:"Finances & commande publique", ic:"euro", c:"var(--red)", p:"Émilie Faure", n:[25,14,6], f:12, t:[480,120],
  task:"Rédiger un CCTP",
  s:["Retrouver l'ancien marché","Recueillir le besoin","Adapter chaque article","Vérifier la cohérence","Faire relire"], ai:[0,2,3],
  q:"Rédige un premier jet de CCTP pour le renouvellement des tenues.", a:"CCTP en 9 articles, basé sur le marché 2022. 3 points à arbitrer signalés.", src:"Modèles internes · marché 2022",
  gd:"Relecture juridique inchangée, notation des offres humaine.",
  acc:[["Rédiger avec l'IA","Pièces de marché","2 h"],["Assistant marchés","Sur vos modèles","1 séance"],["Suivi","Ajustements","à la demande"]]},
 {id:"si", kind:"type", origin:"", g:"Pôle ressources", k:"Systèmes d'information", ic:"server", c:"var(--blue)", p:"Thomas Roux", n:[30,15,6], f:300, t:[15,8],
  task:"Traiter une demande de support",
  s:["Lire le ticket","Chercher la procédure","Rédiger la réponse","Clore le ticket"], ai:[1,2],
  q:"Comment réinitialiser l'accès d'un agent à la messagerie ?", a:"Procédure en 4 étapes, avec lien vers la fiche interne.", src:"Base de procédures SI",
  gd:"Le portail tourne sur l'hébergement que vous choisissez.",
  acc:[["Dossier technique","Architecture, sécurité","livrable"],["Installation","Accès, droits, modèles","accompagnée"],["Suivi technique","Mises à jour","continu"]]},
 {id:"log", kind:"type", origin:"", g:"Pôle ressources", k:"Logistique & technique", ic:"truck", c:"var(--amber)", p:"Cdt Paul Girard", n:[45,25,10], f:150, t:[20,8],
  task:"Traiter une demande de matériel d'un centre",
  s:["Lire la demande","Vérifier le stock","Vérifier le règlement d'habillement","Répondre au centre"], ai:[2,3],
  q:"Le CIS Nord demande 4 vestes textiles : ont-ils droit au renouvellement ?", a:"2 vestes renouvelables (dotation de plus de 5 ans), 2 à justifier. Réponse prête.", src:"Règlement d'habillement · stock",
  gd:"La décision d'attribution reste au magasin.",
  acc:[["Acculturation IA","Équipes techniques","1 h"],["Assistant dotations","Sur vos règles","1 séance"],["Suivi","Ajustements","à la demande"]]},
 {id:"prev", kind:"type", origin:"", g:"Pôle opérations", k:"Prévention", ic:"flame", c:"var(--red)", p:"Cdt Marc Leroy", n:[35,18,8], f:80, t:[120,60],
  task:"Préparer un avis sur dossier ERP",
  s:["Lire les pièces du dossier","Identifier le type et la catégorie","Rechercher les articles applicables","Rédiger l'avis","Signer"], ai:[0,2,3],
  q:"Quels articles du règlement s'appliquent à ce dossier de salle polyvalente ?", a:"Type L, 3e catégorie. <ul><li>12 articles applicables</li><li>2 points de vigilance : dégagements, désenfumage</li></ul>", src:"Dossier PC-2026-081 · règlement de sécurité",
  gd:"L'avis reste celui du préventionniste, qui le relit et le signe.",
  acc:[["Rédiger avec l'IA","Sans lui déléguer l'avis","2 h"],["Veille réglementaire","Automatisée","1 séance"],["Acculturation","Préventionnistes","1 h"]]},
 {id:"prevision", kind:"type", origin:"", g:"Pôle opérations", k:"Prévision", ic:"map", c:"var(--blue)", p:"Cne Hugo Lambert", n:[15,8,4], f:40, t:[240,120],
  task:"Mettre à jour un plan d'établissement répertorié",
  s:["Collecter les plans et documents","Extraire les informations utiles","Rédiger la fiche","Vérifier sur place","Diffuser aux centres"], ai:[1,2],
  q:"Extrais les informations opérationnelles de ce dossier d'usine.", a:"Fiche pré-remplie : accès, points d'eau, coupures, risques particuliers.", src:"Dossier exploitant · modèle de fiche",
  gd:"La visite sur place reste indispensable.",
  acc:[["Acculturation IA","Prévisionnistes","1 h"],["Assistant fiches","Sur votre modèle","1 séance"],["Suivi","Ajustements","à la demande"]]},
 {id:"cta", kind:"type", origin:"", g:"Pôle opérations", k:"CTA-CODIS", ic:"headset", c:"var(--amber)", p:"Ltn Sarah Blanc", n:[60,35,18], f:50, t:[45,10],
  task:"Rédiger la synthèse de fin de garde",
  s:["Relire la main courante","Sélectionner les faits marquants","Rédiger la synthèse","Transmettre à la direction"], ai:[0,1,2],
  q:"Fais la synthèse de la garde de cette nuit pour la direction.", a:"<ul><li>47 interventions</li><li>1 feu d'entrepôt, 3 FPT engagés</li><li>Aucun blessé parmi les personnels</li></ul>", src:"Main courante · garde du 30/09",
  gd:"Aucune IA dans le traitement de l'alerte.",
  acc:[["Acculturation IA","Opérateurs et chefs de salle","1 h"],["Assistant synthèse","Sur votre main courante","1 séance"],["Suivi","Ajustements","à la demande"]]},
 {id:"form", kind:"type", origin:"", g:"Pôle opérations", k:"Formation", ic:"grad", c:"var(--red)", p:"Cne Karim Benali", n:[20,12,6], f:30, t:[300,90],
  task:"Construire une séquence de formation",
  s:["Rassembler les référentiels","Écrire le déroulé","Créer les supports","Rédiger le QCM","Préparer les mises en situation"], ai:[1,2,3],
  q:"Crée un QCM de 20 questions sur le module secours routier.", a:"QCM prêt, corrigé inclus, niveaux de difficulté répartis.", src:"Référentiel de formation · module SR",
  gd:"Le contenu est validé par le formateur.",
  acc:[["Former avec l'IA","Concevoir plus vite","½ jour"],["Assistant pédagogique","Sur vos référentiels","1 séance"],["Acculturation","Tous les formateurs","1 h"]]}
];

const $ = id => document.getElementById(id);
const nf = n => Math.round(n).toLocaleString("fr-FR");
const fmtT = m => m >= 60 ? (m % 60 ? `${Math.floor(m/60)} h ${m%60}` : `${m/60} h`) : `${m} min`;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let cat = "B", seen = new Set(), cur = -1, timers = [], shownTotal = 0;
const ci = () => ({A:0,B:1,C:2})[cat];
const hours = b => b.n[ci()] * b.f * (b.t[0] - b.t[1]) / 60;

I.shield = '<path d="M12 3l7 3v5c0 5-3.2 8.4-7 10-3.8-1.6-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>';
I.lock = '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/>';
I.eye = '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>';
I.link = '<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>';
I.flag = '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>';
I.play = '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z"/>';
I.doc = '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>';
I.route = '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 000-6H9a3 3 0 010-6h6.5"/>';

/* ---------- organigramme ---------- */
if ($("orgchart")) {
  /* build org chart */
  function boxHTML(b, i){
    return `<button class="box" type="button" id="box-${b.id}" data-i="${i}">
      <span class="ic">${svg(b.ic, b.c)}</span>
      <span><b>${b.k}</b><span class="meta"><small class="staff"></small></span></span>
      <span class="gain"></span></button>`;
  }
  const byG = g => B.map((b, i) => [b, i]).filter(([b]) => b.g === g);
  $("orgchart").innerHTML =
    `<div class="lvl1">${boxHTML(B[0], 0)}</div><div class="stem"></div>
     <div class="lvl2">${boxHTML(B[1], 1)}</div><div class="stem"></div>
     <div class="group direction"><p class="kicker">Services de direction</p>${byG("Services de direction").map(([b, i]) => boxHTML(b, i)).join("")}</div>
     <div class="stem"></div>
     <div class="poles">
       <div class="group"><p class="kicker">Pôle ressources</p>${byG("Pôle ressources").map(([b, i]) => boxHTML(b, i)).join("")}</div>
       <div class="group"><p class="kicker">Pôle opérations</p>${byG("Pôle opérations").map(([b, i]) => boxHTML(b, i)).join("")}</div>
     </div>`;
  document.querySelectorAll(".box").forEach(el => el.onclick = () => open(+el.dataset.i));

  function refreshChart(){
    B.forEach(b => {
      const el = $("box-" + b.id), n = b.n[ci()];
      el.querySelector(".staff").textContent = n + (n > 1 ? " agents" : " agent");
      el.classList.toggle("done", seen.has(b.id));
      el.querySelector(".gain").textContent = seen.has(b.id) ? "+" + nf(hours(b)) + " h" : "";
    });
    const total = B.filter(b => seen.has(b.id)).reduce((s, b) => s + hours(b), 0);
    countTo(total);
    $("explored").textContent = `${seen.size} / ${B.length} bureaux`;
    $("progbar").style.width = (seen.size / B.length * 100) + "%";
    if (seen.size === B.length) {
      const all = B.reduce((s, b) => s + hours(b), 0);
      $("donebox").innerHTML = `<div class="done-msg">Tout le SDIS 00 exploré : <b>${nf(all)} heures</b> rendues chaque année, soit <b>${(all/1607).toLocaleString("fr-FR",{maximumFractionDigits:1})} équivalents temps plein</b>. <a href="/contact" style="color:inherit;font-weight:600">Mesurons-le chez vous →</a></div>`;
    } else $("donebox").innerHTML = "";
  }
  function countTo(target){
    const from = shownTotal, t0 = performance.now(), d = reduce ? 1 : 700;
    (function step(t){ const k = Math.min(1, (t - t0) / d), v = from + (target - from) * (1 - Math.pow(1 - k, 3));
      $("total").textContent = nf(v) + " h"; if (k < 1) requestAnimationFrame(step); else shownTotal = target; })(t0);
  }
  document.querySelectorAll("#cat button").forEach(bt => bt.onclick = () => {
    cat = bt.dataset.c;
    document.querySelectorAll("#cat button").forEach(x => x.setAttribute("aria-pressed", x === bt));
    refreshChart(); if (cur >= 0 && $("drawer").classList.contains("on")) fill(cur, false);
  });

  /* drawer */
  function later(fn, ms){ timers.push(setTimeout(fn, reduce ? 0 : ms)); }
  function setMode(after){
    const b = B[cur];
    $("t-before").setAttribute("aria-pressed", !after); $("t-after").setAttribute("aria-pressed", after);
    $("d-state").textContent = after ? "Avec l'IA" : "Avant";
    $("d-time").textContent = (after ? fmtT(b.t[1]) : fmtT(b.t[0])) + " par tâche";
    [...$("d-steps").children].forEach((li, j) => {
      const isAi = b.ai.includes(j);
      li.classList.toggle("ai", after && isAi); li.classList.toggle("keep", after && !isAi);
    });
  }
  function chat(){
    const b = B[cur], c = $("chat"); c.innerHTML = "";
    const me = document.createElement("div"); me.className = "bubble me"; c.appendChild(me);
    let n = 0;
    (function type(){ me.textContent = b.q.slice(0, ++n); if (n < b.q.length) later(type, 12); else later(() => {
      const t = document.createElement("div"); t.className = "typing"; t.innerHTML = "<i></i><i></i><i></i>"; c.appendChild(t);
      later(() => { t.remove(); const a = document.createElement("div"); a.className = "bubble ai"; a.innerHTML = b.a + `<span class="src">↳ ${b.src}</span>`; c.appendChild(a); }, 800);
    }, 200); })();
  }
  function fill(i, animate = true){
    const b = B[i]; cur = i;
    timers.forEach(clearTimeout); timers = [];
    $("d-group").textContent = b.g;
    $("d-ic").innerHTML = svg(b.ic, b.c);
    $("d-title").textContent = b.k;
    $("d-person").innerHTML = b.p + '<span class="fict">PERSONNAGE FICTIF</span>';
    $("d-hours").textContent = nf(hours(b)) + " h";
    const n = b.n[ci()];
    $("d-staff").textContent = `${n} ${n > 1 ? "agents" : "agent"} · cat. ${cat}`;
    $("d-task").textContent = b.task;
    $("d-steps").innerHTML = b.s.map((s, j) => `<li><span class="k">${j+1}</span><span class="txt">${s}</span><span class="who-tag">${b.ai.includes(j) ? "IA" : "AGENT"}</span></li>`).join("");
    $("d-guard").textContent = b.gd;
    const cols = ["var(--red)","var(--blue)","var(--amber)"];
    $("d-acc").innerHTML = b.acc.map((a, j) => `<div class="step"><span class="c" style="background:${cols[j]}">${j+1}</span><div><b>${a[0]}</b><small>${a[1]}</small></div><span class="fmt">${a[2]}</span></div>`).join("");
    setMode(false);
    if (animate) { later(() => setMode(true), 1100); chat(); } else { setMode(true); chat(); }
  }
  let lastFocus = null;
  function open(i){
    lastFocus = document.activeElement;
    fill(i);
    $("drawer").classList.add("on"); $("scrim").classList.add("on"); $("drawer").setAttribute("aria-hidden","false");
    $("drawer").scrollTop = 0;
    if (!seen.has(B[i].id)) { seen.add(B[i].id); refreshChart(); }
    setTimeout(() => $("d-close").focus(), 50);
  }
  function close(){
    timers.forEach(clearTimeout);
    $("drawer").classList.remove("on"); $("scrim").classList.remove("on"); $("drawer").setAttribute("aria-hidden","true");
    if (lastFocus) lastFocus.focus();
  }
  $("d-close").onclick = close; $("scrim").onclick = close;
  document.addEventListener("keydown", e => { if (e.key === "Escape" && $("drawer").classList.contains("on")) close(); });
  $("t-before").onclick = () => setMode(false); $("t-after").onclick = () => setMode(true);
  $("d-next").onclick = () => { const nx = B.findIndex((b, j) => j > cur && !seen.has(b.id)); open(nx >= 0 ? nx : (cur + 1) % B.length); };
  $("d-prev").onclick = () => open((cur - 1 + B.length) % B.length);
  refreshChart();
  const hb = location.hash.match(/^#bureau-([\w-]+)$/);
  if (hb) { const i = B.findIndex(b => b.id === hb[1]); if (i >= 0) open(i); }
}

/* ---------- accueil ---------- */
if ($("news")) {
  $("qi-1").innerHTML = svg("users", "var(--red)");
  $("qi-2").innerHTML = svg("shield", "var(--amber)");
  $("qi-3").innerHTML = svg("grad", "var(--blue)");
  $("qi-4").innerHTML = svg("star", "var(--blue)");
  (function kpis(){
    const hB = B.reduce((s, b) => s + b.n[1] * b.f * (b.t[0] - b.t[1]) / 60, 0);
    $("k-hours").textContent = nf(hB);
    $("k-etp").textContent = (hB / 1607).toLocaleString("fr-FR", {maximumFractionDigits:1});
  })();
  const NEWS = [
    {d:"24 septembre 2026", id:"rh", t:"Groupement RH : les échéances d'aptitude suivies automatiquement", s:"Chaque lundi, un rapport par centre, classé par urgence."},
    {d:"12 septembre 2026", id:"secr", t:"Les délibérations rédigées dans l'heure qui suit la séance", s:"De l'enregistrement au projet de délibération, au format du service."},
    {d:"29 août 2026", id:"cta", t:"CTA-CODIS : la synthèse de garde prête au changement d'équipe", s:"Les faits marquants de la nuit, remis à la direction."},
    {d:"8 août 2026", id:"prev", t:"Prévention : une veille réglementaire chaque vendredi", s:"Les textes utiles au SDIS, résumés et classés par impact."}
  ];
  $("news").innerHTML = NEWS.map((n, i) => `<button class="nitem" type="button" id="news-${i}" data-id="${n.id}"><time>${n.d}</time><b>${n.t}</b><small>${n.s}</small><span class="more">Voir le bureau →</span></button>`).join("");
  $("news").querySelectorAll(".nitem").forEach(el => el.onclick = () => {
    location.href = "/organigramme#bureau-" + el.dataset.id;
  });
}

/* ---------- bons gestes ---------- */
if ($("gestes")) {
  const G = [
    ["lock","var(--red)","Rien de nominatif en dehors du portail","Noms, bilans, données RH : jamais dans une IA grand public."],
    ["shield","var(--blue)","Le portail du service, et lui seul","Vos documents restent sur un hébergement maîtrisé."],
    ["link","var(--amber)","Toujours demander la source","Une réponse sans référence n'est pas une réponse."],
    ["eye","var(--red)","Relire avant de signer","L'IA prépare. L'agent vérifie, corrige et signe."],
    ["scale","var(--blue)","L'IA ne décide pas","Avis, aptitude, sanction : la décision reste humaine."],
    ["flag","var(--amber)","Signaler une erreur","Chaque erreur signalée améliore l'assistant du service."]
  ];
  $("gestes").innerHTML = G.map(g => `<div class="geste"><span class="ic">${svg(g[0], g[1])}</span><b>${g[2]}</b><small>${g[3]}</small></div>`).join("");

  const OPTS = ["IA grand public", "Portail du SDIS", "Jamais"];
  const Q = [
    ["Un arrêté publié au Journal officiel", [0,1], "Texte public : les deux conviennent. Le portail garde la source et la trace."],
    ["Le compte rendu du dernier comité de direction", [1], "Document interne : uniquement dans le portail, jamais dans une IA grand public."],
    ["La liste des agents et de leurs dates d'aptitude", [1], "Données RH : dans le portail, avec un accès limité au groupement RH."],
    ["Les identifiants de connexion au logiciel RH", [2], "Un mot de passe ne se donne à aucune IA."],
    ["Le bilan d'une victime, avec son nom", [2], "Données de santé : aucune IA sans cadre validé par votre DPO et un hébergement adapté."]
  ];
  let qi = 0, score = [];
  function qrender(){
    $("qprog").innerHTML = Q.map((_, i) => `<i class="${score[i] === true ? "ok" : score[i] === false ? "ko" : ""}"></i>`).join("");
    $("qfb").textContent = ""; $("qnext").hidden = true;
    if (qi >= Q.length){
      const n = score.filter(Boolean).length;
      $("qitem").textContent = `${n} / ${Q.length} bonnes réponses`;
      $("qopts").innerHTML = `<a class="btn" href="/ecole-ia">Former mes agents</a><button type="button" id="qagain">Recommencer</button>`;
      $("qfb").textContent = "Ces réflexes sont au programme de l'acculturation IA, suivie par tous les agents du SDIS 00.";
      $("qagain").onclick = () => { qi = 0; score = []; qrender(); };
      return;
    }
    $("qitem").textContent = Q[qi][0];
    $("qopts").innerHTML = OPTS.map((o, j) => `<button type="button" id="qo-${j}" data-j="${j}">${o}</button>`).join("");
    $("qopts").querySelectorAll("button").forEach(b => b.onclick = () => {
      const j = +b.dataset.j, good = Q[qi][1].includes(j);
      score[qi] = good;
      $("qopts").querySelectorAll("button").forEach(x => { x.disabled = true; if (Q[qi][1].includes(+x.dataset.j)) x.classList.add("right"); });
      if (!good) b.classList.add("wrong");
      $("qfb").textContent = (good ? "Bonne réponse. " : "Pas tout à fait. ") + Q[qi][2];
      $("qprog").children[qi].className = good ? "ok" : "ko";
      $("qnext").hidden = false; $("qnext").textContent = qi === Q.length - 1 ? "Voir mon score" : "Suivant";
    });
  }
  $("qnext").onclick = () => { qi++; qrender(); };
  qrender();
}

/* ---------- école IA : catalogue + sélection ---------- */
const F = [
  {id:"acc", pub:"agents", who:"Tous les agents", t:"Acculturation IA", d:"1 h", f:["In portail","Hors portail"], o:["Ce que fait une IA générative, et ses limites","Ce qu'on n'y met jamais","Utiliser le portail au quotidien"]},
  {id:"ref", pub:"referents", who:"Référents IA de chaque service", t:"Construire ses assistants", d:"1 jour", f:["In portail"], o:["Transformer une tâche répétitive en assistant","Le tester sur des cas réels du service","Le maintenir dans le temps"]},
  {id:"pil", pub:"direction", who:"Direction et encadrement supérieur", t:"Piloter l'IA", d:"½ journée", f:["Hors portail"], o:["Choisir les usages prioritaires","Fixer les règles : charte, périmètres, modèles","Lire les indicateurs d'usage et de coût"]},
  {id:"rgpd", pub:"direction", who:"DPO, juristes, direction", t:"RGPD et règlement européen sur l'IA", d:"2 h", f:["Hors portail"], o:["Les obligations concrètes d'un SDIS","Tenir le registre des traitements IA","Former et attester (article 4)"]},
  {id:"red", pub:"metiers", who:"Secrétariats et assistants", t:"Rédiger vite et juste", d:"2 h", f:["In portail"], o:["Comptes rendus, courriers, délibérations","Partir de vos modèles","Relire efficacement"]},
  {id:"rh", pub:"metiers", who:"Groupement RH", t:"IA et données RH", d:"2 h", f:["In portail"], o:["Ce qu'on confie à l'IA, ce qu'on garde","Suivre les échéances automatiquement","Répondre aux questions statutaires"]},
  {id:"prv", pub:"metiers", who:"Prévention et prévision", t:"Rédiger avec l'IA sans lui déléguer l'avis", d:"2 h", f:["In portail"], o:["Structurer un avis à partir des pièces","Retrouver les articles applicables","Garder la main sur la décision"]},
  {id:"fmt", pub:"metiers", who:"Formateurs", t:"Former avec l'IA", d:"½ journée", f:["In portail"], o:["Concevoir une séquence plus vite","Générer QCM et mises en situation","Valider les contenus"]},
  {id:"com", pub:"metiers", who:"Communication", t:"IA et communication publique", d:"2 h", f:["In portail","Hors portail"], o:["Ce qu'on publie, ce qu'on ne publie jamais","Décliner un message par réseau","Respecter votre charte"]}
];
const A = [
  {id:"cad", t:"Cadrage des usages", who:"Accompagnement", d:"Ateliers", o:["Analyse de vos processus réels, service par service","Arbitrage valeur, faisabilité, risque","Compte rendu : ce que vous avez demandé, ce qu'on a analysé, ce qu'on recommande"]},
  {id:"dep", t:"Construction et déploiement", who:"Accompagnement", d:"Sur mesure", o:["Assistants construits avec vos référents","Testés sur vos cas avant ouverture","Formation des premiers utilisateurs"]},
  {id:"sui", t:"Suivi mensuel", who:"Accompagnement", d:"Mensuel", o:["Usages et coûts par service","Nouveaux besoins, nouveaux assistants","Ajustements"]}
];
const ALL = [...F, ...A];
let sel = new Set();
try { sel = new Set(JSON.parse(localStorage.getItem("sdis00-sel") || "[]").filter(id => ALL.some(x => x.id === id))); } catch (_) {}
const card = (x, pills) => `<article class="fcard" id="fc-${x.id}" data-pub="${x.pub || ""}">
  <span class="who">${x.who}</span><h3>${x.t}</h3>
  <div class="pills"><span class="dur">${x.d}</span>${pills}</div>
  <ul>${x.o.map(o => `<li>${o}</li>`).join("")}</ul>
  <button class="add" type="button" id="add-${x.id}" data-id="${x.id}" aria-pressed="false">+ Ajouter à ma demande</button></article>`;
if ($("catalog")) {
  $("catalog").innerHTML = F.map(x => card(x, x.f.map(f => `<span>${f}</span>`).join("") + "<span>Attestation</span>")).join("");
  $("accomp").innerHTML = A.map(x => card(x, "")).join("");
}
document.querySelectorAll(".add").forEach(b => b.onclick = () => { const id = b.dataset.id; sel.has(id) ? sel.delete(id) : sel.add(id); syncSel(); });
function syncSel(){
  document.querySelectorAll(".add").forEach(b => { const on = sel.has(b.dataset.id); b.setAttribute("aria-pressed", on); b.textContent = on ? "✓ Dans ma demande" : "+ Ajouter à ma demande"; $("fc-" + b.dataset.id).classList.toggle("sel", on); });
  const n = sel.size;
  try { localStorage.setItem("sdis00-sel", JSON.stringify([...sel])); } catch (_) {}
  if ($("nav-n")) { $("nav-n").hidden = !n; $("nav-n").textContent = n; }
  if ($("selbar")) {
    $("selbar").classList.toggle("on", n > 0);
    $("selbar-t").textContent = `${n} ${n > 1 ? "prestations sélectionnées" : "prestation sélectionnée"}`;
  }
  if ($("f-prest")) $("f-prest").value = [...sel].map(id => ALL.find(x => x.id === id).t).join(" ; ");
  if (!$("chips")) return;
  $("chips").innerHTML = n ? [...sel].map(id => `<span class="chip">${ALL.find(x => x.id === id).t}<button type="button" data-id="${id}" aria-label="Retirer">×</button></span>`).join("")
    : `<span class="empty">Aucune pour l'instant. <a href="/ecole-ia">Parcourir l'École IA</a></span>`;
  $("chips").querySelectorAll("button").forEach(b => b.onclick = () => { sel.delete(b.dataset.id); syncSel(); });
}

document.querySelectorAll("#ffilter button").forEach(bt => bt.onclick = () => {
  document.querySelectorAll("#ffilter button").forEach(x => x.setAttribute("aria-pressed", x === bt));
  F.forEach(x => $("fc-" + x.id).hidden = bt.dataset.f !== "all" && x.pub !== bt.dataset.f);
});
syncSel();

/* ---------- espace direction ---------- */
if ($("pgrid")) {
  $("di-1").innerHTML = svg("play", "var(--red)");
  $("di-2").innerHTML = svg("doc", "var(--blue)");
  $("di-3").innerHTML = svg("route", "var(--amber)");
  const P = [
   ["Sécurisé","var(--red)","Accès par agent et par service. Chaque assistant ne voit que son périmètre."],
   ["Souverain","var(--blue)","Hébergé en France sur une offre SecNumCloud, ou chez l'hébergeur de votre choix."],
   ["Multi-modèles","var(--amber)","Le bon modèle pour chaque usage. Les données sensibles restent sur des modèles hébergés en France."],
   ["Coûts pilotés","var(--ink)","Forfait fixe. Usages suivis par service, chaque mois, pour la direction."]
  ];
  $("pgrid").innerHTML = P.map((p, i) => `<button class="p" type="button" id="p-${i}" aria-expanded="false"><span class="dot" style="background:${p[1]}"></span><h3>${p[0]}</h3><p>${p[2]}</p></button>`).join("");
  $("pgrid").querySelectorAll(".p").forEach(b => b.onclick = () => b.setAttribute("aria-expanded", b.getAttribute("aria-expanded") !== "true"));
  const J = [
   ["Démo","<b>45 min en visio.</b> Le SDIS 00 en fonctionnement, sur les bureaux qui vous intéressent."],
   ["Test","<b>Un groupe pilote, vos documents.</b> On mesure le temps gagné chez vous."],
   ["Installation","<b>Accès, assistants par bureau, formation</b> des premiers utilisateurs."],
   ["Suivi","<b>Point régulier</b> sur les usages et les coûts, nouveaux assistants au fil de l'eau."]
  ];
  $("journey").innerHTML = J.map((j, i) => `<button class="jstep" type="button" id="j-${i}"><span class="n">0${i+1}</span><b>${j[0]}</b></button>`).join("");
  const jb = [...$("journey").children];
  const jsel = i => { jb.forEach((b, k) => b.setAttribute("aria-pressed", k === i)); $("jdetail").innerHTML = J[i][1]; };
  jb.forEach((b, i) => b.onclick = () => jsel(i)); jsel(0);
  const D = [
    ["server","Fiche d'architecture et d'hébergement"],
    ["doc","Trame de fiche registre pour chaque usage"],
    ["pen","Projet de charte d'usage de l'IA pour les agents"],
    ["scale","Cartographie des usages au regard du règlement européen sur l'IA"],
    ["grad","Attestations de formation des agents (article 4)"]
  ];
  $("docs").innerHTML = D.map(d => `<div><span class="ic">${svg(d[0], "var(--blue)")}</span>${d[1]}<span class="r">INCLUS</span></div>`).join("");
}

/* ---------- contact ---------- */
const form = $("form");
if (form) {
  form.onsubmit = e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const bt = form.querySelector('button[type="submit"]'), label = bt.textContent;
    bt.disabled = true; bt.textContent = "Envoi en cours…";
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString() })
      .then(r => {
        if (!r.ok) throw new Error(r.status);
        $("ok").hidden = false; $("ko").hidden = true;
        form.reset(); sel.clear(); syncSel();
      })
      .catch(() => { $("ko").hidden = false; })
      .finally(() => { bt.disabled = false; bt.textContent = label; });
  };
  $("copy").onclick = () => {
    const t = $("mail").textContent;
    const done = () => { $("copy").textContent = "Copié"; setTimeout(() => $("copy").textContent = "Copier", 1500); };
    try { navigator.clipboard.writeText(t).then(done, () => { getSelection().selectAllChildren($("mail")); }); }
    catch (_) { getSelection().selectAllChildren($("mail")); }
  };
}
