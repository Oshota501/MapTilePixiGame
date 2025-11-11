const menue = document.getElementById("menue");
const close = document.getElementById("close");
const ui_container_1 = document.getElementById("ui_container_1");

let isVisible = true;
if (menue) {
  menue.addEventListener("click", function () {
    if (!ui_container_1) return;
    if (!close) return;

    if (isVisible) {
      // サイドバーを閉じる：非表示にしてボタンを右端に固定する
      ui_container_1.style.display = "none";
      
      close.innerHTML = "open";
      // left を無効化して右寄せにする
      menue.style.left = "8px";
    } else {
      // サイドバーを開く：CSS に戻して元の位置へ
      ui_container_1.style.display = "flex";
      close.innerHTML = "close";
      menue.style.left = "";
    }

    isVisible = !isVisible;
  });
}
