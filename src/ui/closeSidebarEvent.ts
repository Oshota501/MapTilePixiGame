const closeElm = document.getElementById("close");
const ui_container_1 = document.getElementById("ui_container_1");

let isVisible = true;
if (closeElm) {
  closeElm.addEventListener("click", function () {
    if (!ui_container_1) return;

    if (isVisible) {
      // サイドバーを閉じる：非表示にしてボタンを右端に固定する
      ui_container_1.style.display = "none";
      closeElm.innerHTML = "open";
      // left を無効化して右寄せにする
      closeElm.style.left = "8px";
    } else {
      // サイドバーを開く：CSS に戻して元の位置へ
      ui_container_1.style.display = "flex";
      closeElm.innerHTML = "close";
      closeElm.style.left = "";
    }

    isVisible = !isVisible;
  });
}
