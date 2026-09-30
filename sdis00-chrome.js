/* En-tête SDIS 00 : menu mobile, page courante, compteur de prestations sélectionnées. */
(function () {
  var nav = document.getElementById("q-nav"), btn = document.getElementById("q-menu");
  if (btn && nav) btn.onclick = function () {
    var o = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", o);
  };
  var path = location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/") || "/";
  document.querySelectorAll("#q-nav a, #nav-contact").forEach(function (a) {
    if (a.getAttribute("href") === path) a.setAttribute("aria-current", "page");
  });
  var n = 0;
  try { n = JSON.parse(localStorage.getItem("sdis00-sel") || "[]").length; } catch (_) {}
  var badge = document.getElementById("nav-n");
  if (badge && n) { badge.hidden = false; badge.textContent = n; }
})();
