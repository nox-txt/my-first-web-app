// サーバーからデータを取得する関数を作成してください

export async function setupFlashcards() {
  // 表示エリアの要素を取得
  const flashcardsList = document.querySelector("#flashcards-list");

  // ① fetchFlashcards 関数（サーバーからデータ取得）
  async function fetchFlashcards() {
    try {
      const response = await fetch("/api/flashcards");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // ② renderFlashcards 関数（画面に表示）
  async function renderFlashcards(wordList) {
    flashcardsList.innerHTML = ""; // 表示エリアを空にする
    wordList.forEach((word) => {
      // wordList の中身を1つずつ取り出して処理
      const flashcard = `
        <div class="flashcard">
          <div class="flashcard-content">
            <p class="flashcard-title">${word.word}</p>
            <div class="flashcard-icons">                        
              <button class="flashcard-meaning" data-toggle="${word.id}">  
                <span class="ri-eye-line"></span>                
              </button>
            </div>    
          </div>
          <div class="hidden" data-meaning="${word.id}">
            <p>${word.meaning}</p>
          </div>
       </div>
        `; // 1つの暗記カードのHTMLを作成
      flashcardsList.innerHTML += flashcard; // 取得したデータを表示
    });
  }

  // 意味の表示・非表示を切り替える関数
  function toggleMeaning(id) {
    const meaningEl = document.querySelector(`[data-meaning="${id}"]`); // id 属性を持つ要素を取得
    if (meaningEl.classList.contains("hidden")) {
      // hidden が含まれる → 削除して表示
      meaningEl.classList.remove("hidden");
    } else {
      // hidden が含まれない → 追加して非表示
      meaningEl.classList.add("hidden");
    }
  }

  // アイコンをクリックしたときの処理
  flashcardsList.addEventListener("click", function (event) {
    const button = event.target.closest(".flashcard-meaning"); // クリックされた要素が .flashcard-meaning クラスを持つボタンかどうかを確認
    if (!button) return; // 見つからなければ処理を抜ける
    const id = button.dataset.toggle; // data-toggle の値を取得
    toggleMeaning(id); // toggleMeaning に渡す
  });

  //  readFlashcards 関数（①と②をつなぐ）
  async function readFlashcards() {
    const data = await fetchFlashcards(); // データ取得
    await renderFlashcards(data);
  }

  //  最後に呼び出す
  await readFlashcards();
}
