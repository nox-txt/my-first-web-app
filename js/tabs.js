export function setupTabs() {
  const homeLink = document.querySelector('[data-tab="home"]');
  const flashcardsLink = document.querySelector('[data-tab="flashcards"]');
  const converterTab = document.querySelector('[data-tab="converter"]');
  const homeSection = document.getElementById("home");
  const flashcardsSection = document.getElementById("flashcards");
  const converterSection = document.getElementById("converter");

  homeLink.addEventListener("click", () => {
    converterSection.classList.add("hidden");
    flashcardsSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
  });

  converterTab.addEventListener("click", () => {
    homeSection.classList.add("hidden");
    flashcardsSection.classList.add("hidden");
    converterSection.classList.remove("hidden");
  });

  flashcardsLink.addEventListener("click", () => {
    homeSection.classList.add("hidden");
    converterSection.classList.add("hidden");
    flashcardsSection.classList.remove("hidden");
  });
}
