// ここからコードを書いてください
export function setupConverter() {
  const converterForm = document.querySelector(".converter-form");
  const converterInput = document.querySelector(".converter-input");
  const converterFrom = document.querySelector(".converter-from");
  const converterTo = document.querySelector(".converter-to");
  const converterResult = document.querySelector(".converter-result");

  // 単位変換の設定を行うコード
  const lengthUnit = [
    { name: "meter", base: 1 },
    { name: "kilometer", base: 1000 },
    { name: "centimeter", base: 0.01 },
    { name: "millimeter", base: 0.001 },
    { name: "inch", base: 0.0254 },
    { name: "foot", base: 0.3048 },
    { name: "yard", base: 0.9144 },
    { name: "mile", base: 1609.344 },
  ];

  // 単位選択欄の初期化
  lengthUnit.forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit.base;
    option.textContent = unit.name;

    converterFrom.appendChild(option.cloneNode(true));
    converterTo.appendChild(option);
  });

  function convert() {
    // 入力値を小数点数値に変換
    const inputValue = parseFloat(converterInput.value);

    // 数値でない場合はエラーを表示して終了
    if (isNaN(inputValue)) {
      converterResult.textContent = "Please enter a valid number";
      return;
    }

    // 変換元の base を取得
    const fromBase = parseFloat(converterFrom.value);

    // 変換先の base を取得
    const toBase = parseFloat(converterTo.value);

    // 計算：（入力値 × 変換元）÷ 変換先
    const result = (inputValue * fromBase) / toBase;

    // 単位名を取得
    const fromName = converterFrom.options[converterFrom.selectedIndex].text;
    const toName = converterTo.options[converterTo.selectedIndex].text;

    // 表示：1000 meter = 1.000 kilometer
    converterResult.textContent = `${inputValue} ${fromName} = ${result.toFixed(3)} ${toName}`;
  }

  // ① リアルタイム変換
  converterForm.addEventListener("input", convert);

  // ② 起動時に変換結果を表示
  convert();
}
