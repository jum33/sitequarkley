/* Pré-rendu SEO : écrit dans le HTML le contenu que sdis00.js génère au chargement,
   pour que les moteurs et les robots d'IA (qui n'exécutent pas le JavaScript) le lisent.
   Le JavaScript continue de remplacer ce contenu à l'identique dans le navigateur.
   À relancer après toute modification des données de sdis00.js :
     python3 -m http.server 8765 &   (à la racine du site)
     node outils/prerender-seo.js */
const fs = require("fs"), path = require("path");
const { chromium } = require(process.env.PW || "playwright");
const ROOT = path.join(__dirname, ".."), BASE = "http://localhost:8765/";
const PAGES = {
  "index.html": ["news", "k-hours", "k-etp", "qi-1", "qi-2", "qi-3", "qi-4"],
  "organigramme.html": ["orgchart", "seo-groupements"],
  "bons-gestes.html": ["gestes"],
  "ecole-ia.html": ["catalog", "accomp"],
  "espace-direction.html": ["pgrid", "journey", "jdetail", "di-1", "di-3"]
};
/* Version lisible des groupements (ajoutée sous l'organigramme) */
function groupements() {
  const fmt = m => m >= 60 ? (m % 60 ? `${Math.floor(m/60)} h ${m%60}` : `${m/60} h`) : `${m} min`;
  return B.map(b => {
    const h = Math.round(b.n[1] * b.f * (b.t[0] - b.t[1]) / 60).toLocaleString("fr-FR");
    return `<details class="gdet" id="g-${b.id}"><summary><span class="ic">${svg(b.ic, b.c)}</span><span><b>${b.k}</b><small>${b.g} · ${b.task}</small></span><span class="gain">+${h} h/an</span></summary>
<div class="gbody">
<p><b>Tâche :</b> ${b.task.charAt(0).toLowerCase() + b.task.slice(1)}. <b>Avant :</b> ${fmt(b.t[0])} par tâche. <b>Avec l'IA :</b> ${fmt(b.t[1])}.${b.kind === "real" && b.origin ? ` <b>Cas réel</b> (${b.origin}).` : ""}</p>
<ol>${b.s.map((s, j) => `<li>${s} <span class="who-tag">${b.ai.includes(j) ? "IA" : "AGENT"}</span></li>`).join("")}</ol>
<p><b>Exemple de demande :</b> « ${b.q} »</p>
<div class="ans"><b>Réponse du portail :</b> ${b.a} <small>Source : ${b.src}</small></div>
<p><b>Garde-fou :</b> ${b.gd}</p>
<p><b>Accompagnement :</b> ${b.acc.map(a => `${a[0]} (${a[1]}, ${a[2]})`).join(" · ")}.</p>
</div></details>`;
  }).join("\n");
}
(async () => {
  const br = await chromium.launch(process.env.PW_EXE ? { executablePath: process.env.PW_EXE } : {});
  const pg = await br.newPage();
  for (const [file, ids] of Object.entries(PAGES)) {
    await pg.goto(BASE + file);
    await pg.waitForTimeout(400);
    if (file === "organigramme.html") await pg.evaluate(`document.getElementById("seo-groupements").innerHTML = (${groupements})()`);
    let src = fs.readFileSync(path.join(ROOT, file), "utf8");
    for (const id of ids) {
      const html = await pg.evaluate(i => document.getElementById(i).innerHTML, id);
      /* le conteneur est vide dans la source, ou délimité par un commentaire de fin */
      const open = src.match(new RegExp(`<(\\w+)[^>]*\\bid="${id}"[^>]*>`));
      if (!open) throw new Error(`${file} : #${id} introuvable`);
      const start = open.index + open[0].length, endTag = `</${open[1]}>`, marker = `<!--/${id}-->`;
      const mk = src.indexOf(marker, start);
      const end = mk >= 0 ? mk : src.indexOf(endTag, start);
      if (mk < 0 && src.slice(start, end).trim()) throw new Error(`${file} : #${id} non vide sans marqueur`);
      src = src.slice(0, start) + html + (mk >= 0 ? "" : marker) + src.slice(end);
    }
    fs.writeFileSync(path.join(ROOT, file), src);
    console.log("ok", file);
  }
  await br.close();
})();
