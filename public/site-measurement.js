/* Optional site measurement. No vendor request is made before the visitor opts in. */
(() => {
  "use strict";
  const source = document.getElementById("site-measurement-config");
  if (!source) return;
  let config;
  try { config = JSON.parse(source.textContent || "{}"); } catch { return; }
  const gaId = /^G-[A-Z0-9]+$/.test(config.ga4Id || "") ? config.ga4Id : "";
  const clarityId = /^[a-z0-9]{5,24}$/.test(config.clarityId || "") ? config.clarityId : "";
  if (!gaId && !clarityId) return;
  if (!Array.isArray(config.hosts) || !config.hosts.includes(location.hostname)) return;
  const key = `measurement-consent:${location.hostname}:v1`;
  const excluded = () => (config.excludedPaths || []).some(prefix =>
    location.pathname === prefix || location.pathname.startsWith(`${prefix}/`));
  if (excluded()) return;

  const style = document.createElement("style");
  style.textContent = `
    .site-measurement-banner{position:fixed;z-index:2147483000;bottom:1rem;left:1rem;right:1rem;max-width:37rem;margin:auto;padding:1rem 1.15rem;border:1px solid #cbd5e1;border-radius:14px;background:#fff;color:#17212f;box-shadow:0 12px 32px #0003;font:14px/1.5 system-ui,sans-serif}
    .site-measurement-banner p{margin:.3rem 0 .8rem}.site-measurement-banner strong{font-size:16px}
    .site-measurement-banner button,.site-measurement-settings button{min-height:44px;padding:.55rem .9rem;border:1px solid #334155;border-radius:8px;background:#fff;color:#17212f;cursor:pointer;font:600 14px system-ui,sans-serif}
    .site-measurement-banner button[data-accept],.site-measurement-settings button[data-save]{background:#17212f;color:#fff}
    .site-measurement-actions{display:flex;flex-wrap:wrap;gap:.5rem}
    .site-measurement-settings{position:fixed;z-index:2147483001;inset:0;align-items:center;justify-content:center;padding:1rem;background:#0009}
    .site-measurement-settings[hidden],.site-measurement-banner[hidden]{display:none}
    .site-measurement-panel{width:min(100%,35rem);max-height:90vh;overflow:auto;padding:1.2rem;border-radius:14px;background:#fff;color:#17212f;font:14px/1.5 system-ui,sans-serif}
    .site-measurement-panel h2{margin:0 0 .5rem;font-size:20px}.site-measurement-panel label{display:flex;gap:.65rem;margin:.8rem 0;align-items:flex-start}
    .site-measurement-panel input{width:20px;height:20px;flex:none}.site-measurement-panel small{display:block;color:#475569}
    .site-measurement-control{display:inline-block;margin:.7rem 0 0;border:0;background:transparent;color:inherit;text-decoration:underline;cursor:pointer;font:inherit}
    @media(max-width:450px){.site-measurement-actions button{flex:1 1 40%}}
  `;
  document.head.append(style);
  const banner = document.createElement("aside");
  banner.className = "site-measurement-banner";
  banner.setAttribute("aria-label", "Preferencias de medición");
  banner.setAttribute("data-clarity-mask", "true");
  banner.innerHTML = `<strong>Medición del sitio</strong><p>Con tu permiso medimos visitas${clarityId ? " y recorridos" : ""} para mejorar esta web. Puedes aceptar, rechazar o elegir cada herramienta. No enviamos el contenido de formularios.</p><div class="site-measurement-actions"><button type="button" data-reject>Solo necesarias</button><button type="button" data-settings>Configurar</button><button type="button" data-accept>Aceptar</button></div>`;
  const settings = document.createElement("div");
  settings.className = "site-measurement-settings";
  settings.hidden = true;
  settings.setAttribute("data-clarity-mask", "true");
  settings.innerHTML = `<section class="site-measurement-panel" role="dialog" aria-modal="true" aria-labelledby="site-measurement-title"><h2 id="site-measurement-title">Preferencias de medición</h2><p>La web funciona si rechazas estas herramientas. Tu elección se guarda hasta 180 días en este navegador y puedes cambiarla desde el pie de página.</p>${gaId ? '<label><input type="checkbox" data-ga><span><b>Google Analytics</b><small>Visitas, páginas y clics de contacto. Sin publicidad personalizada.</small></span></label>' : ""}${clarityId ? '<label><input type="checkbox" data-clarity><span><b>Microsoft Clarity</b><small>Mapas de calor y reproducción de navegación. Los formularios se ocultan.</small></span></label>' : ""}<p>No registramos lo que escribes en formularios. Los enlaces de salida pueden abrir servicios externos.</p><div class="site-measurement-actions"><button type="button" data-cancel>Cerrar</button><button type="button" data-save>Guardar preferencias</button></div></section>`;
  document.body.append(banner, settings);
  function attachFooterControl() {
    const footer = document.querySelector("footer");
    if (!footer || footer.querySelector(".site-measurement-control")) return Boolean(footer);
    const control = document.createElement("button");
    control.className = "site-measurement-control";
    control.type = "button";
    control.textContent = "Preferencias de medición";
    control.addEventListener("click", openSettings);
    footer.append(control);
    return true;
  }
  if (!attachFooterControl()) {
    const observer = new MutationObserver(() => { if (attachFooterControl()) observer.disconnect(); });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  const permittedCampaigns = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  function safeLocation() {
    const query = new URLSearchParams();
    const incoming = new URLSearchParams(location.search);
    for (const name of permittedCampaigns) {
      const value = incoming.get(name);
      if (value && /^[a-z0-9_-]{1,100}$/i.test(value)) query.set(name, value);
    }
    return location.origin + location.pathname + (query.size ? `?${query}` : "");
  }
  function clarityUrlAllowed() {
    for (const [name, value] of new URLSearchParams(location.search)) {
      if (!permittedCampaigns.includes(name) || !/^[a-z0-9_-]{1,100}$/i.test(value)) return false;
    }
    return !location.hash || /^#[a-z0-9_-]+$/i.test(location.hash);
  }
  function readChoice() {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "null");
      if (saved && typeof saved.ga === "boolean" && typeof saved.clarity === "boolean" && Number.isFinite(saved.at) && saved.at <= Date.now() && Date.now() - saved.at < 180 * 86400000) return saved;
    } catch { /* Storage may be unavailable. */ }
    return null;
  }
  function clearCookies() {
    const names = document.cookie.split(";").map(pair => pair.split("=")[0].trim());
    for (const name of names) {
      if (!/^(?:_ga(?:_|$)|_clck$|_clsk$)/.test(name)) continue;
      for (const domain of ["", location.hostname, `.${location.hostname}`])
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure${domain ? `; Domain=${domain}` : ""}`;
    }
  }
  function addScript(id, url) {
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src = url;
    document.head.append(script);
  }
  let choice = readChoice();
  let gaActive = false;
  let clarityActive = false;
  let lastPath = "";
  const scrollSent = new Set();
  const gaDenied = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
  function emit(name, params = {}) {
    if (!gaActive || !choice?.ga || !window.gtag || excluded()) return;
    window.gtag("event", name, { ...params, page_location: safeLocation(), send_to: gaId });
  }
  function pageView() {
    if (!gaActive || !choice?.ga || excluded() || lastPath === location.pathname) return;
    lastPath = location.pathname;
    scrollSent.clear();
    emit("page_view", { page_title: document.title, page_path: location.pathname });
  }
  function start() {
    if (excluded()) return;
    if (choice?.ga && gaId && !gaActive) {
      gaActive = true;
      window[`ga-disable-${gaId}`] = false;
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.gtag("consent", "default", gaDenied);
      window.gtag("consent", "update", { ...gaDenied, analytics_storage: "granted" });
      window.gtag("js", new Date());
      window.gtag("config", gaId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, cookie_domain: "none", page_location: safeLocation() });
      addScript("site-google-analytics", `https://www.googletagmanager.com/gtag/js?id=${gaId}`);
      pageView();
    }
    if (choice?.clarity && clarityId && !clarityActive && clarityUrlAllowed()) {
      document.querySelectorAll("form, [data-private]").forEach(node => node.setAttribute("data-clarity-mask", "true"));
      clarityActive = true;
      window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
      window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
      addScript("site-microsoft-clarity", `https://www.clarity.ms/tag/${clarityId}`);
    }
  }
  function save(ga, clarity) {
    const revoke = (gaActive && !ga) || (clarityActive && !clarity);
    choice = { ga, clarity, at: Date.now() };
    try { localStorage.setItem(key, JSON.stringify(choice)); } catch { /* Session-only choice. */ }
    banner.hidden = true;
    settings.hidden = true;
    if (revoke) {
      if (gaId) window[`ga-disable-${gaId}`] = true;
      if (window.clarity && clarityActive) window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
      clearCookies();
      location.reload();
      return;
    }
    start();
  }
  function openSettings() {
    const gaToggle = settings.querySelector("[data-ga]");
    const clarityToggle = settings.querySelector("[data-clarity]");
    if (gaToggle) gaToggle.checked = Boolean(choice?.ga);
    if (clarityToggle) clarityToggle.checked = Boolean(choice?.clarity);
    settings.hidden = false;
    settings.querySelector("[data-cancel]").focus();
  }
  banner.querySelector("[data-reject]").addEventListener("click", () => save(false, false));
  banner.querySelector("[data-accept]").addEventListener("click", () => save(Boolean(gaId), Boolean(clarityId)));
  banner.querySelector("[data-settings]").addEventListener("click", openSettings);
  settings.querySelector("[data-cancel]").addEventListener("click", () => { settings.hidden = true; });
  settings.querySelector("[data-save]").addEventListener("click", () => save(Boolean(settings.querySelector("[data-ga]")?.checked), Boolean(settings.querySelector("[data-clarity]")?.checked)));
  settings.addEventListener("keydown", event => { if (event.key === "Escape") settings.hidden = true; });

  document.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a[href]");
    if (!link) return;
    let target;
    try { target = new URL(link.href, location.href); } catch { return; }
    const position = link.closest("header") ? "header" : link.closest("footer") ? "footer" : "content";
    const markedEvent = link.getAttribute("data-track-event");
    if (/^[a-z_]{3,40}$/.test(markedEvent || "")) emit(markedEvent, { position });
    if (target.protocol === "mailto:") emit("contact_click", { channel: "email", position });
    else if (target.protocol === "tel:") emit("contact_click", { channel: "phone", position });
    else if (["wa.me", "api.whatsapp.com"].includes(target.hostname)) emit("contact_click", { channel: "whatsapp", position });
    else if (target.origin !== location.origin && target.protocol === "https:") {
      emit("outbound_click", { destination: target.hostname, position });
      if (target.hostname === "www.flow.cl" || target.hostname === "flow.cl") emit("support_click", { position });
    } else if (target.origin === location.origin && (/^(contacto|contact|apoyo|patrocinios|partnerships)$/.test(target.hash.slice(1)) || ["/formulario", "/contacto"].includes(target.pathname))) {
      emit("cta_click", { destination: target.hash.slice(1) || target.pathname.slice(1), position });
    }
  });
  window.addEventListener("site:lead", () => emit("generate_lead", { source: "contact_form" }));
  window.addEventListener("scroll", () => {
    if (!gaActive) return;
    const total = document.documentElement.scrollHeight - innerHeight;
    if (total <= 0) return;
    const depth = Math.round(scrollY / total * 100);
    for (const threshold of [50, 90]) if (depth >= threshold && !scrollSent.has(threshold)) {
      scrollSent.add(threshold);
      emit("scroll_depth", { percent_scrolled: threshold });
    }
  }, { passive: true });
  window.setInterval(pageView, 800);
  if (choice) start();
  else { clearCookies(); banner.hidden = false; }
})();
