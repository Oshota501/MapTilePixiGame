import { MainApp } from "./mainApp";

export let game: MainApp ;

function createLoader() {
    const container = document.getElementById("pixi-container") || document.body;

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.background = "rgba(0,0,0,0.6)";
    overlay.style.zIndex = "9999";

    const box = document.createElement("div");
    box.style.padding = "20px 28px";
    box.style.borderRadius = "8px";
    box.style.background = "#111";
    box.style.color = "#fff";
    box.style.fontFamily = "sans-serif";
    box.style.textAlign = "center";
    box.style.minWidth = "200px";

    const title = document.createElement("div");
    title.textContent = "Loading…";
    title.style.marginBottom = "8px";

    const progress = document.createElement("div");
    progress.textContent = "0%";
    progress.style.fontSize = "14px";

    box.appendChild(title);
    box.appendChild(progress);
    overlay.appendChild(box);
    container.appendChild(overlay);

    return {
        setProgress(p: number) {
            const pct = Math.max(0, Math.min(100, Math.round(p)));
            progress.textContent = `${pct}%`;
        },
        remove() {
            overlay.remove();
        }
    };
}

async function init() {
    const loader = createLoader();

    // 描画を確実に行わせる（DOM が表示されるように待つ）
    await new Promise(requestAnimationFrame);

    // モック進捗を回す
    let pct = 0;
    const tick = setInterval(() => {
        pct = Math.min(95, pct + Math.floor(Math.random() * 10) + 5);
        loader.setProgress(pct);
    }, 180);

    // 少し待機してユーザーにロードUIを見せる（任意）
    await new Promise((r) => setTimeout(r, 200));

    // MainApp を動的 import してからインスタンス化（重い処理をこのタイミングで実行）
    const mod = await import("./mainApp");
    game = new mod.MainApp({
        width: 7,
        height: 7,
    });

    clearInterval(tick);
    loader.setProgress(100);
    // 100% を短時間表示してから消す
    await new Promise((r) => setTimeout(r, 200));
    loader.remove();
}

init();
