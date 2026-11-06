console.log("audio.js 読み込み成功");
// ======================
// BGM
// ======================

const bgm = {
    title: new Audio("sounds/title.mp3"),
    game: new Audio("sounds/game.mp3"),
    gameover: new Audio("sounds/gameover.mp3")
};

const audio = new Audio("sounds/ending.mp3");

bgm.title.loop = true;
bgm.game.loop = true;
bgm.gameover.loop = false;

// BGM共通設定
Object.values(bgm).forEach(audio => {
    audio.volume = 0.5;
});

// ======================
// 効果音
// ======================

const se = {
    cursor: "sounds/cursor.mp3",
    enter: "sounds/enter.mp3",
    start: "sounds/start.mp3",
    dice: "sounds/dice.mp3",
    map: "sounds/map.mp3",
    setting: "sounds/setting.mp3",
    omikuji: "sounds/omikuji.mp3",
    clear: "sounds/clear.mp3"
};

// ======================
// BGM再生
// ======================

function playBGM(name) {

    const bgmEnabled =
        localStorage.getItem("bgmEnabled") !== "false";

    if (!bgmEnabled) return;

    stopAllBGM();

    const audio = bgm[name];

    if (!audio) {
        console.warn(`BGMが見つかりません: ${name}`);
        return;
    }

    const volume =
        parseFloat(
            localStorage.getItem("bgmVolume")
        ) || 0.8;

    audio.volume = volume;
    
    audio.currentTime = 0;

    audio.play().catch(error => {
        console.log("BGM再生失敗:", error);
    });
}

// ======================
// BGM停止
// ======================

function stopAllBGM() {

    Object.values(bgm).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

}

// ======================
// 効果音再生
// ======================

function playSE(name) {

    const seEnabled =
         localStorage.getItem("seEnabled") !== "false";

    if (!seEnabled) return;     

    const path = se[name];

    if (!path) {
        console.warn(`効果音が見つかりません: ${name}`);
        return;
    }

    const audio = new Audio(path);

    const volume =
        parseFloat(
            localStorage.getItem("seVolume")
        ) || 0.8;

    audio.volume = volume;

    audio.play().catch(error => {
        console.log("SE再生失敗:", error);
    });
}

// ======================
// エリア踏破・結願演出
// ======================
let clearAudio = null;

function playClearEvent() {

    stopAllBGM();

    clearAudio =
        new Audio("sounds/clear.mp3");

    clearAudio.volume = 0.8;    

    clearAudio.play();
   
}

function playEndingEvent() {

    stopAllBGM();

    eventAudio =
        new Audio("sounds/ending.mp3");

    eventAudio.volume = 0.8;

    eventAudio.play().catch(error => {

        console.log(
            "ending再生失敗:",
            error
        );

    });
}

function stopEventAudio() {

    if (eventAudio) {

        eventAudio.pause();
        eventAudio.currentTime = 0;

    }

}
// ======================
// BGM ON/OFF
// ======================

function toggleBGM() {

    const enabled =
        localStorage.getItem("bgmEnabled") !== "false";

    localStorage.setItem(
        "bgmEnabled",
        (!enabled).toString()
    );

    if (enabled) {
        stopAllBGM();
    } else {
        playBGM("title");
    }
}

window.playBGM = playBGM;
window.playSE = playSE;
window.stopAllBGM = stopAllBGM;
window.toggleBGM = toggleBGM;

console.log("playSE =", typeof playSE);
console.log("playBGM =", typeof playBGM);
