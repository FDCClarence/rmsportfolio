function scrollToContactHeading() {
  const heading = document.getElementById("contact-heading");
  if (!heading) return;

  const header = document.querySelector("header");
  const offset = (header?.offsetHeight || 0) + 12;
  const y = heading.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: y, left: 0, behavior: "smooth" });
}

(function () {
  const btn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-toggle-icon");
  const profilePhoto = document.getElementById("profile-photo");

  function syncProfilePhoto() {
    if (!profilePhoto) return;
    const isDark = document.documentElement.classList.contains("dark");
    const nextSrc = isDark
      ? profilePhoto.getAttribute("data-dark-src")
      : profilePhoto.getAttribute("data-light-src");
    if (nextSrc && profilePhoto.getAttribute("src") !== nextSrc) {
      profilePhoto.setAttribute("src", nextSrc);
    }
  }

  function syncThemeToggleIcon() {
    if (!btn || !icon) return;
    const isDark = document.documentElement.classList.contains("dark");
    icon.textContent = isDark ? "light_mode" : "dark_mode";
    btn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  if (btn) {
    btn.addEventListener("click", function () {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      syncThemeToggleIcon();
      syncProfilePhoto();
    });
  }

  syncThemeToggleIcon();
  syncProfilePhoto();
})();

(function () {
  const container = document.getElementById("projects-list");
  if (!container) return;

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function render(projects) {
    container.innerHTML = projects
      .map((p, idx) => {
        const reverse = idx % 2 === 1;
        const imageOrder = reverse ? "order-1 lg:order-2" : "order-1 lg:order-1";
        const textOrder = reverse
          ? "order-2 lg:order-1 lg:text-right flex flex-col lg:items-end"
          : "order-2 lg:order-2";

        const description = escapeHtml(p.description || "").replaceAll("\n", "<br/>");

        return `
          <div class="group grid lg:grid-cols-2 gap-12 items-center">
            <div class="${imageOrder} overflow-hidden rounded-2xl aspect-[16/10]">
              <img alt="${escapeHtml(p.name || "Project image")}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${escapeHtml(p.image || "")}"/>
            </div>
            <div class="${textOrder}">
              <h4 class="text-brand font-bold uppercase tracking-widest text-xs mb-4 text-ink">${escapeHtml(p.address || "")}</h4>
              <h3 class="text-3xl font-serif font-bold mb-6 text-ink">${escapeHtml(p.name || "")}</h3>
              <p class="text-lg leading-relaxed mb-8 text-ink/80">${description}</p>
              <div class="w-12 h-1 bg-brand rounded-full"></div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  fetch("./data/projects.json", { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Failed to load projects.json"))))
    .then((data) => {
      if (!Array.isArray(data)) throw new Error("projects.json must be an array");
      render(data);
    })
    .catch((err) => {
      console.error(err);
      container.innerHTML = '<p class="text-ink/70">Could not load projects.</p>';
    });
})();

