(function () {
  const stored = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const shouldUseDark = stored ? stored === "dark" : prefersDark;
  document.documentElement.classList.toggle("dark", shouldUseDark);
})();

