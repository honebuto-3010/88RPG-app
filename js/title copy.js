/* ==========================
   はじめから
========================== */

document
    .getElementById("new-game")
    .addEventListener("click", startGame);

/* ==========================
   つづきから
========================== */

document
    .getElementById("continue-game")
    .addEventListener("click", continueGame);

/* ==========================
   せってい
========================== */

document
    .getElementById("setting")
    .addEventListener("click", () => {

        playSE("enter");

        settingsMode = true;

        settingIndex = 0;

        updateSettingsCursor();

        document
            .getElementById("settings-panel")
            .style.display = "block";

       
    });

/* ==========================
   おわる
========================== */

document
    .getElementById("quit")
    .addEventListener("click", () => {

        playSE("enter");

        alert("またのお遍路をお待ちしております");

    });


/* ==========================
   メニューカーソル
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
    "bgm-volume-up",
    "bgm-volume-down",
    "se-volume-up",
    "se-volume-down",
    "close-settings"
];

let settingIndex = 0;

function updateSettingsCursor() {

    settingItems.forEach((id) => {

        const element =
            document.getElementById(id);

        if (!element) return;

        element.style.outline = "";
    });

    const current =
        document.getElementById(
            settingItems[settingIndex]
        );

    if (current) {

        current.style.outline =
            "2px solid white";
    }
}

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
        
        console.log(selected);


/* ==========================
   メニューカーソル
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
    "bgm-volume-up",
    "bgm-volume-down",
    "se-volume-up",
    "se-volume-down",
    "close-settings"
];

let settingIndex = 0;

function updateSettingsCursor() {

    settingItems.forEach((id) => {

        const element =
            document.getElementById(id);

        if (!element) return;

        element.style.outline = "";
    });

    const current =
        document.getElementById(
            settingItems[settingIndex]
        );

    if (current) {

        current.style.outline =
            "2px solid white";
    }
}

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
   タイトルBGM開始
========================== */

let bgmStarted = false;

function startTitleBGM() {

    console.log("startTitleBGM実行");

    if (bgmStarted) return;

    bgmStarted = true;

    playBGM("title");
}

/* ==========================
   キーボード操作
========================== */

document.addEventListener(
    "keydown",
    (event) => {

        console.log(
            "settingsMode:",
            settingsMode
        );

    if (settingsMode) {

    if (event.key === "ArrowDown") {

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

    if (event.key === "ArrowUp") {

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

            console.log("ArrowDown");

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

            if (selected === "new-game") {
                startGame();
            }

            if (selected === "continue-game") {
                continueGame();
            }

            if (selected === "setting") {

                 console.log("setting選択");

                settingsMode = true;

                 console.log("after", settingsMode);

                settingIndex = 0;

                updateSettingsCursor();

                document
                    .getElementById("settings-panel")
                    .style.display = "block";

            }

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

        startTitleBGM();
        playSE("cursor");

        selectedIndex--;

        if (selectedIndex < 0) {
            selectedIndex =
                menuItems.length - 1;
        }

        updateMenu();

    });

document
    .getElementById("down-btn")
    .addEventListener("click", () => {

        startTitleBGM();
        playSE("cursor");

        selectedIndex++;

        if (selectedIndex >= menuItems.length) {
            selectedIndex = 0;
        }

        updateMenu();

    });

document
    .getElementById("enter-btn")
    .addEventListener("click", () => {

        startTitleBGM();
        playSE("enter");

        const selected =
            menuItems[selectedIndex];

        if (selected === "new-game") {
            startGame();
        }

        if (selected === "continue-game") {
            continueGame();
        }

        if (selected === "setting") {

            settingsMode = true;

            settingIndex = 0;

            updateSettingsCursor();

            document
                .getElementById("settings-panel")
                .style.display = "block";

        }

        if (selected === "quit") {

            alert(
                "またのお遍路をお待ちしております"
            );

        }

    });

/* ==========================
   ゲーム開始
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
   続きから
========================== */

function continueGame() {

    stopAllBGM();

    location.href = "index.html";

}

/* ==========================
   BGM設定
========================== */

let bgmEnabled =
    localStorage.getItem("bgmEnabled");

if (bgmEnabled === null) {

    bgmEnabled = true;

} else {

    bgmEnabled =
        bgmEnabled === "true";

}

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
    localStorage.getItem("seEnabled");

if (seEnabled === null) {

    seEnabled = true;

} else {

    seEnabled =
        seEnabled === "true";
}

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

        playSE("enter");

        settingsMode = false;

        document
            .getElementById("settings-panel")
            .style.display = "none";

    });

/* ==========================
   初期表示
========================== */

updateBgmStatus();

/* ==========================
   音量設定 初期値
========================== */

if (!localStorage.getItem("bgmVolume")) {
    localStorage.setItem("bgmVolume", "0.8");
}

if (!localStorage.getItem("seVolume")) {
    localStorage.setItem("seVolume", "0.8");
}

/* ==========================
   音量表示更新
========================== */

function updateVolumeDisplay() {

    const bgmVolume = Math.round(
        parseFloat(
            localStorage.getItem("bgmVolume")
        ) * 100
    );

    const seVolume = Math.round(
        parseFloat(
            localStorage.getItem("seVolume")
        ) * 100
    );

    document.getElementById(
        "bgm-volume-value"
    ).textContent = `${bgmVolume}%`;

    document.getElementById(
        "se-volume-value"
    ).textContent = `${seVolume}%`;
}

/* ==========================
   BGM音量 -
========================== */

document
    .getElementById("bgm-volume-down")
    .addEventListener("click", () => {

        let volume = parseFloat(
            localStorage.getItem("bgmVolume")
        );

        volume = Math.max(
            0,
            volume - 0.1
        );

        localStorage.setItem(
            "bgmVolume",
            volume
        );

        updateVolumeDisplay();
    });

/* ==========================
   BGM音量 +
========================== */

document
    .getElementById("bgm-volume-up")
    .addEventListener("click", () => {

        let volume = parseFloat(
            localStorage.getItem("bgmVolume")
        );

        volume = Math.min(
            1,
            volume + 0.1
        );

        localStorage.setItem(
            "bgmVolume",
            volume
        );

        updateVolumeDisplay();
    });

/* ==========================
   SE音量 -
========================== */

document
    .getElementById("se-volume-down")
    .addEventListener("click", () => {

        let volume = parseFloat(
            localStorage.getItem("seVolume")
        );

        volume = Math.max(
            0,
            volume - 0.1
        );

        localStorage.setItem(
            "seVolume",
            volume
        );

        updateVolumeDisplay();
    });

/* ==========================
   SE音量 +
========================== */

document
    .getElementById("se-volume-up")
    .addEventListener("click", () => {

        let volume = parseFloat(
            localStorage.getItem("seVolume")
        );

        volume = Math.min(
            1,
            volume + 0.1
        );

        localStorage.setItem(
            "seVolume",
            volume
        );

        updateVolumeDisplay();
    });

updateVolumeDisplay();
updateBgmStatus();
updateSeStatus();

    selected.textContent =
        "▶ " +
        selected.textContent.trim();
}


/* ==========================
   タイトルBGM開始
========================== */

let bgmStarted = false;

function startTitleBGM() {

    console.log("startTitleBGM実行");

    if (bgmStarted) return;

    bgmStarted = true;

    playBGM("title");
}

/* ==========================
   キーボード操作
========================== */

document.addEventListener(
    "keydown",
    (event) => {

        console.log(
            "settingsMode:",
            settingsMode
        );

    if (settingsMode) {

    if (event.key === "ArrowDown") {

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

    if (event.key === "ArrowUp") {

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

            console.log("ArrowDown");

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

            if (selected === "new-game") {
                startGame();
            }

            if (selected === "continue-game") {
                continueGame();
            }

            if (selected === "setting") {

                 console.log("setting選択");

                settingsMode = true;

                 console.log("after", settingsMode);

                settingIndex = 0;

                updateSettingsCursor();

                document
                    .getElementById("settings-panel")
                    .style.display = "block";

            }

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

        startTitleBGM();
        playSE("cursor");

        selectedIndex--;

        if (selectedIndex < 0) {
            selectedIndex =
                menuItems.length - 1;
        }

        updateMenu();

    });

document
    .getElementById("down-btn")
    .addEventListener("click", () => {

        startTitleBGM();
        playSE("cursor");

        selectedIndex++;

        if (selectedIndex >= menuItems.length) {
            selectedIndex = 0;
        }

        updateMenu();

    });

document
    .getElementById("enter-btn")
    .addEventListener("click", () => {

        startTitleBGM();
        playSE("enter");

        const selected =
            menuItems[selectedIndex];

        if (selected === "new-game") {
            startGame();
        }

        if (selected === "continue-game") {
            continueGame();
        }

        if (selected === "setting") {

            settingsMode = true;

            settingIndex = 0;

            updateSettingsCursor();

            document
                .getElementById("settings-panel")
                .style.display = "block";

        }

        if (selected === "quit") {

            alert(
                "またのお遍路をお待ちしております"
            );

        }

    });

/* ==========================
   ゲーム開始
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
   続きから
========================== */

function continueGame() {

    stopAllBGM();

    location.href = "index.html";

}

/* ==========================
   BGM設定
========================== */

let bgmEnabled =
    localStorage.getItem("bgmEnabled");

if (bgmEnabled === null) {

    bgmEnabled = true;

} else {

    bgmEnabled =
        bgmEnabled === "true";

}

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
    localStorage.getItem("seEnabled");

if (seEnabled === null) {

    seEnabled = true;

} else {

    seEnabled =
        seEnabled === "true";
}

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

        playSE("enter");

        settingsMode = false;

        document
            .getElementById("settings-panel")
            .style.display = "none";

    });

/* ==========================
   初期表示
========================== */

updateBgmStatus();

/* ==========================
   音量設定 初期値
========================== */

if (!localStorage.getItem("bgmVolume")) {
    localStorage.setItem("bgmVolume", "0.8");
}

if (!localStorage.getItem("seVolume")) {
    localStorage.setItem("seVolume", "0.8");
}

/* ==========================
   音量表示更新
========================== */

function updateVolumeDisplay() {

    const bgmVolume = Math.round(
        parseFloat(
            localStorage.getItem("bgmVolume")
        ) * 100
    );

    const seVolume = Math.round(
        parseFloat(
            localStorage.getItem("seVolume")
        ) * 100
    );

    document.getElementById(
        "bgm-volume-value"
    ).textContent = `${bgmVolume}%`;

    document.getElementById(
        "se-volume-value"
    ).textContent = `${seVolume}%`;
}

/* ==========================
   BGM音量 -
========================== */

document
    .getElementById("bgm-volume-down")
    .addEventListener("click", () => {

        let volume = parseFloat(
            localStorage.getItem("bgmVolume")
        );

        volume = Math.max(
            0,
            volume - 0.1
        );

        localStorage.setItem(
            "bgmVolume",
            volume
        );

        updateVolumeDisplay();
    });

/* ==========================
   BGM音量 +
========================== */

document
    .getElementById("bgm-volume-up")
    .addEventListener("click", () => {

        let volume = parseFloat(
            localStorage.getItem("bgmVolume")
        );

        volume = Math.min(
            1,
            volume + 0.1
        );

        localStorage.setItem(
            "bgmVolume",
            volume
        );

        updateVolumeDisplay();
    });

/* ==========================
   SE音量 -
========================== */

document
    .getElementById("se-volume-down")
    .addEventListener("click", () => {

        let volume = parseFloat(
            localStorage.getItem("seVolume")
        );

        volume = Math.max(
            0,
            volume - 0.1
        );

        localStorage.setItem(
            "seVolume",
            volume
        );

        updateVolumeDisplay();
    });

/* ==========================
   SE音量 +
========================== */

document
    .getElementById("se-volume-up")
    .addEventListener("click", () => {

        let volume = parseFloat(
            localStorage.getItem("seVolume")
        );

        volume = Math.min(
            1,
            volume + 0.1
        );

        localStorage.setItem(
            "seVolume",
            volume
        );

        updateVolumeDisplay();
    });

updateVolumeDisplay();
updateBgmStatus();
updateSeStatus();
