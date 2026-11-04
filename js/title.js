/* ==========================
   メニュー設定
========================== */

const menuItems = [
    "new-game",
    "continue-game",
    "setting",
    "quit"
];

let selectedIndex = 0;

/* ==========================
   設定メニュー
========================== */

let settingsMode = false;

const settingItems = [
    "toggle-bgm",
    "toggle-se",
    "close-settings"
];

let settingIndex = 0;

/* ==========================
   メニュー更新
========================== */

function updateMenu() {

    document
        .querySelectorAll(".menu-item")
        .forEach(item => {

            item.textContent =
                item.textContent.replace("▶ ", "");
        });

    const selected =
        document.getElementById(
            menuItems[selectedIndex]
        );

    selected.textContent =
        "▶ " +
        selected.textContent.trim();
}

/* ==========================
   設定カーソル
========================== */

function updateSettingsCursor() {

    settingItems.forEach(id => {

        const element =
            document.getElementById(id);

        if (!element) return;

        element.style.backgroundcolor = "";
        element.style.color = "";
    });

    const current =
        document.getElementById(
            settingItems[settingIndex]
        );

    if (current) {

        current.style.backgroundcolor =
            "white";

        current.style.color =
            "#0000AA";    
    }
}

updateMenu();

/* ==========================
   タイトルBGM
========================== */

let bgmStarted = false;

function startTitleBGM() {

    if (bgmStarted) return;

    bgmStarted = true;

    playBGM("title");
}

/* ==========================
   はじめから
========================== */

function startGame() {

    playSE("start");

    localStorage.removeItem(
        "henroSave"
    );

    stopAllBGM();

    setTimeout(() => {

        location.href = "index.html";

    }, 1000);
}

/* ==========================
   つづきから
========================== */

function continueGame() {

    stopAllBGM();

    location.href = "index.html";
}

/* ==========================
   ボタンイベント
========================== */

document
    .getElementById("new-game")
    .addEventListener("click", startGame);

document
    .getElementById("continue-game")
    .addEventListener("click", continueGame);

document
    .getElementById("setting")
    .addEventListener("click", openSettings);

document
    .getElementById("quit")
    .addEventListener("click", () => {

        playSE("enter");

        alert("またのお遍路をお待ちしております");
    });

function openSettings() {

    playSE("enter");

    settingsMode = true;

    settingIndex = 0;

    document
        .getElementById("settings-panel")
        .style.display = "block";

    updateSettingsCursor();
}

/* ==========================
   キーボード操作
========================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (settingsMode) {

            console.log("設定モード中");
            console.log("押されたキー" ,event.key);

            if (event.key === "ArrowDown") {

                console.log("設定　↓")

                playSE("cursor");

                settingIndex++;

                if (
                    settingIndex >=
                    settingItems.length
                ) {
                    settingIndex = 0;
                }

                console.log(
                    "index",
                    settingIndex
                );

                updateSettingsCursor();
                return;
            }

            if (event.key === "ArrowUp") {

                console.log("設定　↑")

                playSE("cursor");

                settingIndex--;

                if (settingIndex < 0) {

                    settingIndex =
                        settingItems.length - 1;
                }

                updateSettingsCursor();
                return;
            }

            if (event.key === "Enter") {

                playSE("enter");

                document
                    .getElementById(
                        settingItems[
                            settingIndex
                        ]
                    )
                    .click();

                return;
            }
        }

        if (event.key === "ArrowDown") {

            startTitleBGM();

            playSE("cursor");

            selectedIndex++;

            if (
                selectedIndex >=
                menuItems.length
            ) {
                selectedIndex = 0;
            }

            updateMenu();
        }

        if (event.key === "ArrowUp") {

            startTitleBGM();

            playSE("cursor");

            selectedIndex--;

            if (selectedIndex < 0) {

                selectedIndex =
                    menuItems.length - 1;
            }

            updateMenu();
        }

        if (event.key === "Enter") {

            startTitleBGM();

            playSE("enter");

            const selected =
                menuItems[selectedIndex];

            if (selected === "new-game")
                startGame();

            if (selected === "continue-game")
                continueGame();

            if (selected === "setting")
                openSettings();

            if (selected === "quit") {

                alert(
                    "またのお遍路をお待ちしております"
                );
            }
        }
    }
);

/* ==========================
   仮想十字キー
========================== */

document
    .getElementById("up-btn")
    .addEventListener("click", () => {

        if (settingsMode) {

            playSE("cursor");

            settingIndex--;

            if (
                settingIndex < 0
            ) {
                settingIndex =
                    settingItems.length - 1;
            }

            updateSettingsCursor();
            return;
        }

        startTitleBGM();

        playSE("cursor");

        selectedIndex--;

        if (
            selectedIndex < 0
        ) {
            selectedIndex =
                menuItems.length - 1;
        }

        updateMenu();
    });

document
    .getElementById("down-btn")
    .addEventListener("click", () => {

        if (settingsMode) {

            playSE("cursor");

            settingIndex++;

            if (
                settingIndex >=
                settingItems.length
            ) {
                settingIndex = 0;
            }

            updateSettingsCursor();
            return;
        }

        startTitleBGM();

        playSE("cursor");

        selectedIndex++;

        if (
            selectedIndex >=
            menuItems.length
        ) {
            selectedIndex = 0;
        }

        updateMenu();
    });

document
    .getElementById("enter-btn")
    .addEventListener("click", () => {

        if (settingsMode) {

            document
                .getElementById(
                    settingItems[
                        settingIndex
                    ]
                )
                .click();

            return;
        }

        const selected =
            menuItems[selectedIndex];


if (selected === "new-game") {
    startGame();
}

if (selected === "continue-game") {
    continueGame();
}

if (selected === "setting") {
    openSettings();
}

if (selected === "quit") {

    alert(
        "またのお遍路をお待ちしております"
    );
}

        
    });

/* ==========================
   BGM設定
========================== */

let bgmEnabled =
    localStorage.getItem(
        "bgmEnabled"
    ) !== "false";

function updateBgmStatus() {

    document
        .getElementById("bgm-status")
        .textContent =
        bgmEnabled ? "ON" : "OFF";
}

document
    .getElementById("toggle-bgm")
    .addEventListener("click", () => {

        bgmEnabled = !bgmEnabled;

        localStorage.setItem(
            "bgmEnabled",
            bgmEnabled
        );

        if (bgmEnabled) {

            playBGM("title");

        } else {

            stopAllBGM();
        }

        updateBgmStatus();
    });

/* ==========================
   SE設定
========================== */

let seEnabled =
    localStorage.getItem(
        "seEnabled"
    ) !== "false";

function updateSeStatus() {

    document
        .getElementById("se-status")
        .textContent =
        seEnabled ? "ON" : "OFF";
}

document
    .getElementById("toggle-se")
    .addEventListener("click", () => {

        seEnabled = !seEnabled;

        localStorage.setItem(
            "seEnabled",
            seEnabled
        );

        updateSeStatus();
    });

/* ==========================
   設定を閉じる
========================== */

document
    .getElementById("close-settings")
    .addEventListener("click", () => {

        settingsMode = false;

        document
            .getElementById("settings-panel")
            .style.display = "none";
    });

/* ==========================
   初期化
========================== */

updateBgmStatus();
updateSeStatus();


