// ここからコードを書いてください
export function setupTabs() {
  // タブの設定を行うコード
  // [data-tab="home"] を持つ要素を取得
  const homeLink = document.querySelector('[data-tab="home"]');

  // [data-tab="converter"] を持つ要素を取得
  const converterTab = document.querySelector('[data-tab="converter"]');

  // id="home" の要素を取得
  const homeSection = document.querySelector("#home");

  // id="converter" の要素を取得
  const converterSection = document.querySelector("#converter");

  homeLink.addEventListener("click", () => {
    converterSection.classList.add("hidden"); // 単位セクションを隠す
    homeSection.classList.remove("hidden"); // ホームセクションを表示
  });

  converterTab.addEventListener("click", () => {
    homeSection.classList.add("hidden");
    converterSection.classList.remove("hidden");
  });
}
