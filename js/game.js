function getClearCount() {

    return Number(
        localStorage.getItem("clearCount")
    ) || 0;
}
/* ===================================
   GAME STATE
=================================== */

const gameState = {

    currentTemple: 1,

    hp: 10,

    maxHp: 10,

    stamps: 1,

    turn: 0,

    lastDice: 0,

    eventLog: "四国遍路の旅が始まりました"

};

console.log(gameState);

const temples = [
    { name: "霊山寺", event: "遍路の旅が始まった" },
    { name: "極楽寺", event: "静かな境内で一息ついた" },
    { name: "金泉寺", event: "納経を済ませた" },
    { name: "大日寺", event: "山門をくぐった" },
    { name: "地蔵寺", event: "お地蔵さまに手を合わせた" },
    { name: "安楽寺", event: "疲れが癒やされた" },
    { name: "十楽寺", event: "穏やかな時間を過ごした" },
    { name: "熊谷寺", event: "大きな山門に驚いた" },
    { name: "法輪寺", event: "巡礼の安全を祈願した" },
    { name: "切幡寺", event: "長い石段を登った" },
    { name: "藤井寺", event: "焼山寺への準備をした" },
    { name: "焼山寺", event: "険しい山道を越えた" },
    { name: "大日寺", event: "読経が響いていた" },
    { name: "常楽寺", event: "庭園を眺めた" },
    { name: "国分寺", event: "歴史を感じた" },
    { name: "観音寺", event: "観音さまに祈った" },
    { name: "井戸寺", event: "井戸の水に見入った" },
    { name: "恩山寺", event: "自然に囲まれた" },
    { name: "立江寺", event: "心を落ち着かせた" },
    { name: "鶴林寺", event: "深い森を歩いた" },
    { name: "太龍寺", event: "山岳霊場の雰囲気を感じた" },
    { name: "平等寺", event: "平穏な時間を過ごした" },
    { name: "薬王寺", event: "健康を祈願した" },
    { name: "最御崎寺", event: "岬から海を眺めた" },
    { name: "津照寺", event: "潮風を感じた" },
    { name: "金剛頂寺", event: "壮大な景色を眺めた" },
    { name: "神峯寺", event: "急な坂を登った" },
    { name: "大日寺", event: "静かに参拝した" },
    { name: "国分寺", event: "心が落ち着いた" },
    { name: "善楽寺", event: "鐘の音を聞いた" },
    { name: "竹林寺", event: "竹林を散策した" },
    { name: "禅師峰寺", event: "高台から景色を眺めた" },
    { name: "雪蹊寺", event: "境内をゆっくり歩いた" },
    { name: "種間寺", event: "旅の無事を願った" },
    { name: "清瀧寺", event: "清らかな空気を感じた" },
    { name: "青龍寺", event: "海を見渡した" },
    { name: "岩本寺", event: "巡礼者と出会った" },
    { name: "金剛福寺", event: "足摺岬に到着した" },
    { name: "延光寺", event: "旅の疲れを癒やした" },
    { name: "観自在寺", event: "愛媛に入った" },
    { name: "龍光寺", event: "境内を散策した" },
    { name: "佛木寺", event: "牛馬の守護に感謝した" },
    { name: "明石寺", event: "歴史ある伽藍を見学した" },
    { name: "大寶寺", event: "山深い寺に到着した" },
    { name: "岩屋寺", event: "断崖の絶景を見た" },
    { name: "浄瑠璃寺", event: "静寂に包まれた" },
    { name: "八坂寺", event: "のんびり過ごした" },
    { name: "西林寺", event: "参道を歩いた" },
    { name: "浄土寺", event: "納経を終えた" },
    { name: "繁多寺", event: "寺の歴史を学んだ" },
    { name: "石手寺", event: "遍路の賑わいを感じた" },
    { name: "太山寺", event: "古い建築を眺めた" },
    { name: "円明寺", event: "次の札所を目指した" },
    { name: "延命寺", event: "長寿を祈願した" },
    { name: "南光坊", event: "旅の無事を感謝した" },
    { name: "泰山寺", event: "境内で休憩した" },
    { name: "栄福寺", event: "巡礼を続けた" },
    { name: "仙遊寺", event: "山の静けさを感じた" },
    { name: "国分寺", event: "ひと息ついた" },
    { name: "横峰寺", event: "険しい山道を越えた" },
    { name: "香園寺", event: "参拝客で賑わっていた" },
    { name: "宝寿寺", event: "心を整えた" },
    { name: "吉祥寺", event: "旅の幸運を願った" },
    { name: "前神寺", event: "石鎚山を仰いだ" },
    { name: "三角寺", event: "四国中央市に入った" },
    { name: "雲辺寺", event: "雲の上の景色を眺めた" },
    { name: "大興寺", event: "境内を散策した" },
    { name: "神恵院", event: "観音寺と並んで参拝した" },
    { name: "観音寺", event: "旅の安全を祈った" },
    { name: "本山寺", event: "五重塔を眺めた" },
    { name: "弥谷寺", event: "長い石段に挑んだ" },
    { name: "曼荼羅寺", event: "静かな時間を過ごした" },
    { name: "出釈迦寺", event: "修行の歴史を感じた" },
    { name: "甲山寺", event: "心を落ち着けた" },
    { name: "善通寺", event: "弘法大師ゆかりの地を訪れた" },
    { name: "金倉寺", event: "参拝を終えた" },
    { name: "道隆寺", event: "鐘を眺めた" },
    { name: "郷照寺", event: "瀬戸内海を感じた" },
    { name: "天皇寺", event: "旅も終盤に入った" },
    { name: "國分寺", event: "落ち着いた境内を歩いた" },
    { name: "白峯寺", event: "山上から景色を眺めた" },
    { name: "根香寺", event: "自然の美しさを感じた" },
    { name: "一宮寺", event: "納経を済ませた" },
    { name: "屋島寺", event: "屋島の歴史に触れた" },
    { name: "八栗寺", event: "ケーブルカーを眺めた" },
    { name: "志度寺", event: "海辺の風を感じた" },
    { name: "長尾寺", event: "最後の力を振り絞った" },
    { name: "大窪寺", event: "結願！八十八ヶ所を巡り終えた" }
];

function render() {
    
    console.log(gameState.eventLog);

    const temple =
        temples[gameState.currentTemple - 1];

    document.getElementById("temple-number")
       .textContent = 
       `第${gameState.currentTemple}番`;

    
    document.getElementById("temple-name")
        .textContent = 
        temples[gameState.currentTemple - 1].name;
       
    document.getElementById("event-log")
        .textContent = 
        gameState.eventLog;    
    
        
    document.getElementById("turn")
        .textContent =
        `${gameState.turn}日目`;
        
    document.getElementById("stamps")
         .textContent = 
        `${gameState.stamps} / 88`;
        
    document.getElementById("hp")
         .textContent = 
         `${gameState.hp} / ${gameState.maxHp}`;
         
    document.getElementById("clear-count")
         .textContent = 
         `${getClearCount()}回`; 
         
        // ここから追加
    let area = "";

    if (gameState.currentTemple <= 23) {
        area = "徳島";
    }
    else if (gameState.currentTemple <= 39) {
        area = "高知";
    }
    else if (gameState.currentTemple <= 65) {
        area = "愛媛";
    }
    else {
        area = "香川";
    }

    document.getElementById("area-name")
        .textContent =
        `現在：${area}エリア`;  
    
    document.getElementById("awa-progress").textContent =
    "阿波 ██████████ 23/23";

document.getElementById("tosa-progress").textContent =
    "土佐 ███████□□□□ 11/16";

document.getElementById("iyo-progress").textContent =
    "伊予 □□□□□□□□□□ 0/26";

document.getElementById("sanuki-progress").textContent =
    "讃岐 □□□□□□□□□□ 0/23";

document.getElementById("current-temple").textContent =
    `現在：${gameState.currentTemple}番札所`;

document.getElementById("remaining-temples").textContent =
    `残り：${88 - gameState.currentTemple}札所`;

document.getElementById("total-progress").textContent =
    `進捗：${Math.floor((gameState.currentTemple / 88) * 100)}%`; 
    
    // ==============================
// 遍路マップ進捗表示
// ==============================

const current = gameState.currentTemple;

// 阿波（1～23）
const awa = Math.min(current, 23);

// 土佐（24～39）
const tosa = current > 23
    ? Math.min(current - 23, 16)
    : 0;

// 伊予（40～65）
const iyo = current > 39
    ? Math.min(current - 39, 26)
    : 0;

// 讃岐（66～88）
const sanuki = current > 65
    ? Math.min(current - 65, 23)
    : 0;

document.getElementById("awa-progress").textContent =
    `阿波 ${makeBar(awa, 23)} ${awa}/23`;

document.getElementById("tosa-progress").textContent =
    `土佐 ${makeBar(tosa, 16)} ${tosa}/16`;

document.getElementById("iyo-progress").textContent =
    `伊予 ${makeBar(iyo, 26)} ${iyo}/26`;

document.getElementById("sanuki-progress").textContent =
    `讃岐 ${makeBar(sanuki, 23)} ${sanuki}/23`;

document.getElementById("current-temple").textContent =
    `現在：${current}番札所`;

document.getElementById("remaining-temples").textContent =
    `残り：${88 - current}札所`;

document.getElementById("total-progress").textContent =
    `進捗：${Math.floor((current / 88) * 100)}%`;
}

document.getElementById("omikuji-button")
    .disabled = true;

    function makeBar(current, max) {
    const filled = Math.floor((current / max) * 10);
    return "█".repeat(filled) + "□".repeat(10 - filled);
}

function rollDice() {

    playSE("dice");

    const dice =
        Math.floor(Math.random() * 6) + 1;

    gameState.lastDice = dice;

    gameState.turn++;

    const previousTemple =
        gameState.currentTemple;

    movePlayer(dice);

    const special =
        checkSpecialEvent(previousTemple);

    if (!special) {

        const temple =
            temples[gameState.currentTemple - 1];

    gameState.eventLog =
        `🎲 ${dice}の目が出た！

${gameState.currentTemple}番札所
${temple.name}に到着！

${temple.event}

おみくじを引いてください。`;
    }

    document.getElementById("omikuji-button")
        .disabled = false;

    document.getElementById("roll-button")
        .disabled = true;

    render();
}

document
    .getElementById("roll-button")
    .addEventListener("click", rollDice);

render();

document
    .getElementById("omikuji-button")
    .addEventListener(
        "click",
        drawOmikuji
    );

document.getElementById("omikuji-button")
    .disabled = true;

render();  

function movePlayer(dice) {

    gameState.currentTemple += dice;

    if (gameState.currentTemple >= 88) {

        playClearEvent();

        gameState.currentTemple = 88;
        
        gameState.stamps = 88;

        const clearCount =
            getClearCount() + 1;

        localStorage.setItem(
            "clearCount",
            clearCount
        );    

        gameState.eventLog =
             `🏆 結願！
             ${gameState.turn}日で
             四国八十八ヶ所巡礼達成！`;

        document.getElementById("roll-button")
            .disabled = true;
            
        render();
        
        return;
    }
    

    const temple =
        temples[gameState.currentTemple - 1];
    
    gameState.eventLog =
        temple.event;

    gameState.stamps = gameState.currentTemple;

    console.log("stamps=", gameState.stamps);

    const mountainTemples = [
        3,
        5,
        9,
        12,
        14,
        16,
        21,
        27,
        30,
        34,
        37,
        42,
        46,
        51,
        53,
        58,
        60,
        66,
        72,
        73,
        80,
        83,
        86,
    ];

    if (
        mountainTemples.includes(
            gameState.currentTemple
        )
    ) {
        gameState.hp--;
    }

    if (gameState.hp < 0) {
        gameState.hp = 0;
    }

    const healTemples = [
        6, //安楽寺
        46,//浄瑠璃寺
        57//栄福寺
    ];

    if (healTemples.includes(gameState.currentTemple)) {
        gameState.hp++;

        gameState.eventLog = 
        `${temple.name}で休息し体力が回復した`;
    }

    if (gameState.hp > gameState.maxHp) {
        gameState.hp = gameState.maxHp;
    }

    if (gameState.hp <= 0) {
        gameState.hp = 0;

        gameState.eventLog = 
             "力尽きてしまった.....。";

        document.getElementById("roll-button")
             .disabled = true;

           
    }

}

function restartGame() {
    
    gameState.currentTemple = 1;
    gameState.hp = 10;
    gameState.maxHp = 10;
    gameState.stamps = 1;
    gameState.turn = 0;
    gameState.lastDice = 0;
    gameState.eventLog =
       "四国遍路の旅が始まりました";

    document.getElementById("roll-button")
       .disabled = false;
       
    render();  
}

  document
        .getElementById("restart-button")
        .addEventListener(
            "click",
            restartGame
        );

function saveGame() {

    localStorage.setItem(
        "henroSave",
        JSON.stringify(gameState)
    );

    gameState.eventLog =
        "ゲームを保存しました";

    render();    
}

document
     .getElementById("save-button")
     .addEventListener(
        "click",
        saveGame
     );

function loadGame() {

    const savedData = 
        localStorage.getItem("henroSave");

    if (!savedData) return;
    
    const data =
        JSON.parse(savedData);

    gameState.currentTemple = data.currentTemple;
    gameState.hp = data.hp;
    gameState.maxHp = data.maxHp;
    gameState.stamps = data.stamps;
    gameState.lastDice = data.lastDice;
    gameState.eventLog = data.eventLog;
    
    document.getElementById("roll-button")
        .disabled = false;

    render();    
}

document
      .getElementById("load-button")
      .addEventListener(
            "click",
            loadGame
      );

function backToTitle() {

    location.href = "title.html";
}

document
     .getElementById("title-button")
     .addEventListener(
        "click",
        backToTitle
     );

function drawOmikuji() {

    playSE("omikuji");

    const result =
       Math.floor(Math.random() * 3);
       
    if (result === 0) {

        gameState.hp++;

        gameState.eventLog =
              "🎉大吉！ お接待を受けてHP+1";
    }
    else if (result === 1) {

        gameState.eventLog =
              "😊吉！ 何も起こらなかった";
    }
    else {

        gameState.hp--;

        gameState.eventLog =
               "😢凶！ 疲れてHP-1";
    }

    if (gameState.hp > gameState.maxHp) {
        gameState.hp = gameState.maxHp;
    }

    if (gameState.hp < 0) {

        gameState.hp = 0;
    }

    document.getElementById("omikuji-button")
          .disabled = true;

    document.getElementById("roll-button")
          .disabled = false;
    
            // HP0ならゲームオーバー
    if (gameState.hp <= 0) {

        gameState.hp = 0;

        gameState.eventLog =
            "力尽きてしまった……。";

        document.getElementById("roll-button")
            .disabled = true;
    }
    render();      
}

function checkSpecialEvent(previousTemple) {

    console.log(
    "prev=", previousTemple,
    "current=", gameState.currentTemple
    );

    if (
        previousTemple < 23 &&
        gameState.currentTemple >= 23
    ) {
        
        console.log("徳島通過検出");

        playClearEvent();

        gameState.hp = Math.min(
            gameState.hp + 1,
            gameState.maxHp
        );

        gameState.eventLog =
            "🎉 徳島踏破！\n" +
            "阿波踊りを楽しんだ！\n" +
            "HPが1回復した！";

        return true;
    }

    if (
        previousTemple < 39 &&
        gameState.currentTemple >= 39
    ) {

        playClearEvent();

        gameState.hp = Math.min(
            gameState.hp + 1,
            gameState.maxHp
        );

        gameState.eventLog =
            "🎉 高知踏破！\n" +
            "カツオのたたきをご馳走になった！\n" +
            "HPが1回復した！";

        return true;
    }

    if (
        previousTemple < 65 &&
        gameState.currentTemple >= 65
    ) {

        playClearEvent();

        gameState.hp = Math.min(
            gameState.hp + 2,
            gameState.maxHp
        );

        gameState.eventLog =
            "🎉 愛媛踏破！\n" +
            "道後温泉で疲れを癒した！\n" +
            "HPが2回復した！";

        return true;
    }

    if (
        previousTemple < 88 &&
        gameState.currentTemple >= 88
    ) {

        playClearEvent();

        gameState.eventLog =
            "🎉 香川踏破！\n" +
            "讃岐うどんを堪能した！";

        return true;
    }

    return false;
}


const gameScreen = document.getElementById("game-screen");
const mapScreen = document.getElementById("map-screen");
const menuScreen = document.getElementById("menu-screen");

const rollButton = document.getElementById("roll-button");
const omikujiButton = document.getElementById("omikuji-button");
const mapButton = document.getElementById("map-tab");
const menuButton = document.getElementById("menu-button");

function showGameScreen() {

    gameScreen.style.display = "block";
    mapScreen.style.display = "none";
    menuScreen.style.display = "none";

}

function showMapScreen() {

    gameScreen.style.display = "none";
    mapScreen.style.display = "block";
    menuScreen.style.display = "none";

}

function showMenuScreen() {

    gameScreen.style.display = "none";
    mapScreen.style.display = "none";
    menuScreen.style.display = "block";

}

mapButton.addEventListener("click", () => {

    playSE("map");

    if (mapScreen.style.display === "block") {

        showGameScreen();

    } else {

        showMapScreen();

    }

});

menuButton.addEventListener("click", () => {

    playSE("setting");

    if (menuScreen.style.display === "block") {

        showGameScreen();

    } else {

        showMenuScreen();

    }

});

showGameScreen();

window.addEventListener("load", () => {

    playBGM("game");

});

