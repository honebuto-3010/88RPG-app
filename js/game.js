function getClearCount() {

    return Number(
        localStorage.getItem("clearCount")
    ) || 0;
}

let clearModalOpen = false;

let endingMode = false;
let endingStep = 0;

let gameOverMode = false;
let gameOverStep = 0;
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

    eventLog: "四国遍路の旅が始まりました",

    gameClear: false

};

console.log(gameState);

const temples = [
    { name: "霊山寺", event: "遍路の旅が始まった。巡礼の無事を祈願！" },
    { name: "極楽寺", event: "静かな境内で一息ついた。大師手植えの長命杉で長寿祈願！" },
    { name: "金泉寺", event: "納経を済ませた。大師の井戸、弁慶の力石伝説が残る！" },
    { name: "大日寺", event: "山門をくぐった。朱塗りの鐘楼門が目を引く！" },
    { name: "地蔵寺", event: "お地蔵さまに手を合わせた。人間味あふれる五百羅漢！" },
    { name: "安楽寺", event: "疲れが癒やされた。温泉や大師身代わりのさか松！" },
    { name: "十楽寺", event: "穏やかな時間を過ごした。八つの苦しみから逃れ、十の楽しみを願う！" },
    { name: "熊谷寺", event: "大きな山門に驚いた。四国随一の仁王門が立つ！" },
    { name: "法輪寺", event: "巡礼の安全を祈願した。健脚祈願！" },
    { name: "切幡寺", event: "長い石段を登った。観音菩薩のなった娘の伝説が残る！" },
    { name: "藤井寺", event: "焼山寺への準備をした。藤の花と自然に囲まれた寺！" },
    { name: "焼山寺", event: "険しい山道を越えた。杉の巨木に囲まれた大蛇伝説！" },
    { name: "大日寺", event: "読経が響いていた。もと一宮神社の別当寺！" },
    { name: "常楽寺", event: "庭園を眺めた。自然が生み出した流水岩の庭園！" },
    { name: "国分寺", event: "歴史を感じた。建立当時の繁栄ぶりが物語る！" },
    { name: "観音寺", event: "観音さまに祈った。古い街並みと地元の信仰心！" },
    { name: "井戸寺", event: "井戸の水に見入った。大師伝説の井戸水を飲むべし！" },
    { name: "恩山寺", event: "自然に囲まれた。大師が母の為に孝行を尽くした！" },
    { name: "立江寺", event: "心を落ち着かせた。邪悪な者は通れぬ阿波の関所！" },
    { name: "鶴林寺", event: "深い森を歩いた。鶴が御本尊をはこんだとされる！" },
    { name: "太龍寺", event: "山岳霊場の雰囲気を感じた。「西の髙野」とよばれるスケール感！" },
    { name: "平等寺", event: "平穏な時間を過ごした。巡礼者の願いが溢れる霊泉が湧く！" },
    { name: "薬王寺", event: "健康を祈願した。厄坂に賽銭を置いて厄除け祈願！" },
    { name: "最御崎寺", event: "岬から海を眺めた。室戸岬を見下ろす！" },
    { name: "津照寺", event: "潮風を感じた。「かじとり地蔵」と呼ばれる海の守り仏！" },
    { name: "金剛頂寺", event: "壮大な景色を眺めた。密教道場として創建された！" },
    { name: "神峯寺", event: "急な坂を登った。急勾配の土佐の関所！" },
    { name: "大日寺", event: "静かに参拝した。奥の院は首から上の病に霊験あらたか！" },
    { name: "国分寺", event: "心が落ち着いた。紀貫之滞在の土佐国分寺！" },
    { name: "善楽寺", event: "鐘の音を聞いた。子宝祈願に御利益！" },
    { name: "竹林寺", event: "竹林を散策した。四国霊場唯一の文殊菩薩！" },
    { name: "禅師峰寺", event: "高台から景色を眺めた。海上安全祈願と船魂観音！" },
    { name: "雪蹊寺", event: "境内をゆっくり歩いた。運慶、湛慶の仏像がずらり！" },
    { name: "種間寺", event: "旅の無事を願った。安産の薬師として信仰を集める！" },
    { name: "清瀧寺", event: "清らかな空気を感じた。大きな薬師如来像がある！" },
    { name: "青龍寺", event: "海を見渡した。唐にゆかりのある海上安全の寺！" },
    { name: "岩本寺", event: "巡礼者と出会った。弘法大師にちなんだ七不思議伝説！" },
    { name: "金剛福寺", event: "足摺岬に到着した。四国最南端、足摺岬に立つ！" },
    { name: "延光寺", event: "旅の疲れを癒やした。梵鐘を背負った赤亀がお出迎え！" },
    { name: "観自在寺", event: "愛媛に入った。平城天皇ゆかりの「裏関所」" },
    { name: "龍光寺", event: "境内を散策した。三間のおいなりさんは五穀豊穣に御利益！" },
    { name: "佛木寺", event: "牛馬の守護に感謝した。牛馬やペットの寺として親しまれる！" },
    { name: "明石寺", event: "歴史ある伽藍を見学した。「あげいしさん」として慕われる源頼朝ゆかりの寺！" },
    { name: "大寶寺", event: "山深い寺に到着した。八十八ヶ所の真ん中にある霊場！" },
    { name: "岩屋寺", event: "断崖の絶景を見た。山全体が本尊という深山幽谷の寺！" },
    { name: "浄瑠璃寺", event: "静寂に包まれた。健脚、文筆達成の御利益！" },
    { name: "八坂寺", event: "のんびり過ごした。かつては修検道場として栄えた！" },
    { name: "西林寺", event: "参道を歩いた。田園風景の中に立つ伊予の関所寺！" },
    { name: "浄土寺", event: "納経を終えた。空也上人が里人に説法した寺！" },
    { name: "繁多寺", event: "寺の歴史を学んだ。一遍上人が修行した寺！" },
    { name: "石手寺", event: "遍路の賑わいを感じた。松山の「お大師さん」！" },
    { name: "太山寺", event: "古い建築を眺めた。歴代天皇と関わりが深い寺！" },
    { name: "円明寺", event: "次の札所を目指した。江戸時代の銅板が残る！" },
    { name: "延命寺", event: "長寿を祈願した。梵鐘の伝説画残る学問道場！" },
    { name: "南光坊", event: "旅の無事を感謝した。航海安全を願う寺！" },
    { name: "泰山寺", event: "境内で休憩した。度重なる氾濫から守った寺！" },
    { name: "栄福寺", event: "巡礼を続けた。海陸安全！病気平癒！" },
    { name: "仙遊寺", event: "山の静けさを感じた。仙人伝説が残る山頂の古寺！" },
    { name: "国分寺", event: "ひと息ついた。幾多の戦火を乗り越えた！" },
    { name: "横峰寺", event: "険しい山道を越えた。霊峰石鎚山系に立つ！" },
    { name: "香園寺", event: "参拝客で賑わっていた。子宝にご利益がある「子安の大師さん」！" },
    { name: "宝寿寺", event: "心を整えた。安産観音あり！" },
    { name: "吉祥寺", event: "旅の幸運を願った。成就石の穴に杖を通す！" },
    { name: "前神寺", event: "石鎚山を仰いだ。天皇が厚く帰依した！" },
    { name: "三角寺", event: "四国中央市に入った。子授けの寺！" },
    { name: "雲辺寺", event: "雲の上の景色を眺めた。札所最高所に立つ厄除けの寺！" },
    { name: "大興寺", event: "境内を散策した。3大宗派の修行場！" },
    { name: "神恵院", event: "観音寺と並んで参拝した。1寺2札所が珍しい！" },
    { name: "観音寺", event: "旅の安全を祈った。天皇の勅願所として栄えた！" },
    { name: "本山寺", event: "五重塔を眺めた。建立当時の姿をとどめた国宝の本堂！" },
    { name: "弥谷寺", event: "長い石段に挑んだ。「仏の山」のふところに抱かれた霊場！" },
    { name: "曼荼羅寺", event: "静かな時間を過ごした。仏教の宇宙観を表す曼荼羅空間！" },
    { name: "出釈迦寺", event: "修行の歴史を感じた。お釈迦様の出現が由来！" },
    { name: "甲山寺", event: "心を落ち着けた。毘沙門天の言い伝えが縁起！" },
    { name: "善通寺", event: "弘法大師ゆかりの地を訪れた。大師誕生の地に立つ善通寺派総本山！" },
    { name: "金倉寺", event: "参拝を終えた。鬼子母神伝説も残る智証大師ゆかりの寺！" },
    { name: "道隆寺", event: "鐘を眺めた。眼病平癒の薬師！" },
    { name: "郷照寺", event: "瀬戸内海を感じた。宗派を超えて信仰を集める厄除け大師！" },
    { name: "天皇寺", event: "旅も終盤に入った。伝説の泉が今も湧く！" },
    { name: "國分寺", event: "落ち着いた境内を歩いた。広い境内と寺宝を誇る！" },
    { name: "白峯寺", event: "山上から景色を眺めた。崇徳天皇の廟所も併せ持つ！" },
    { name: "根香寺", event: "自然の美しさを感じた。霊木で囲まれた本尊！" },
    { name: "一宮寺", event: "納経を済ませた。地獄の釜の言い伝えが残る！" },
    { name: "屋島寺", event: "屋島の歴史に触れた。鑑真によって開かれた、古戦場を望む寺！" },
    { name: "八栗寺", event: "ケーブルカーを眺めた。庶民の信仰を集める八栗の聖天さん！" },
    { name: "志度寺", event: "海辺の風を感じた。海女の悲話が縁起として伝わる！" },
    { name: "長尾寺", event: "最後の力を振り絞った。讃岐国七観音随一と称えられた本尊！" },
    { name: "大窪寺", event: "結願！八十八ヶ所を巡り終えた。杖や笠を納めて、さあ、結願！" }
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

    if (gameState.gameClear) {
        return;
    }

    if (!window.gameBgmStarted) {
        playBGM("game");
        window.gameBgmStarted = true;
        }

    playSE("dice");

    const dice =
        Math.floor(Math.random() * 5) + 1;

    gameState.lastDice = dice;

    gameState.turn++;

    const previousTemple =
        gameState.currentTemple;

    const gameOver =
          movePlayer(dice);

    if (gameOver) {
            render();
            return;
    }

    const special =
        checkSpecialEvent(previousTemple);

    if (!special && !gameOverMode) {

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

        playEndingEvent();

        gameState.currentTemple = 88;
        
        gameState.stamps = 88;

        gameState.gameClear = true;

        showEndingModal();

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
        7,
        16,
        24,
        33,
        41,
        52,
        60,
        69,
        77,
        85,
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
        10,//切幡寺
        35,//清瀧寺
        57,//栄福寺
        78,//郷照寺
    ];

    if (healTemples.includes(gameState.currentTemple)) {
        gameState.hp++;

        gameState.eventLog = 
        `${temple.name}で休息し体力が回復した`;
    }



    if (gameState.hp > gameState.maxHp) {
        gameState.hp = gameState.maxHp;
    }

    if (gameState.hp <= 0 &&
        !gameOverMode) {
        
        console.log("GAMEOVER",
            gameState.hp,
            gameOverMode
        );

        gameState.hp = 0;

        gameState.eventLog =
        "力尽きてしまった.....。";

        document.getElementById("roll-button")
             .disabled = true;

        document.getElementById("omikuji-button")
             .disabled = true;
             
        showGameOverModal();

        return true;
    }
    
    return false;
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

    if (gameState.gameClear) {
         return;
    }

    playSE("omikuji");

    const result =
       Math.floor(Math.random() * 3);
       
    if (result === 0) {

        gameState.hp++;

        gameState.eventLog =
              "😁大吉！ お接待を受けてHP+1";
    }
    else if (result === 1) {

        gameState.eventLog =
              "😊吉！ 何も起こらなかった";
    }
    else {

        gameState.hp -= 2;

        gameState.eventLog =
               "😢凶！ 疲れてHP-2";
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

    if (gameState.hp <= 0 && !gameOverMode) {

        console.log(
        "GAMEOVER",
        gameState.hp,
        gameOverMode
        );

        gameState.hp = 0;

        gameState.eventLog =
            "力尽きてしまった……。";

        document.getElementById("roll-button")
            .disabled = true;

        document.getElementById("omikuji-button")
            .disabled = true;    

        showGameOverModal();
        
        return true;
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

        showClearModal(
           "🎉 徳島踏破",
           "阿波踊りを楽しんだ！\nHPが1回復した！"
        );    

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

        showClearModal(
            "🎉 高知踏破",
            "修行の道場を踏破した！\nHPが2回復した！"
        );    

        return true;
    }

    if (
        previousTemple < 65 &&
        gameState.currentTemple >= 65
    ) {

        playClearEvent();

        gameState.hp = Math.min(
            gameState.hp += 1,
            gameState.maxHp += 1
        );

        gameState.eventLog =
            "🎉 愛媛踏破！\n" +
            "道後温泉で疲れを癒した！\n" +
            "HPが2回復した！";

        showClearModal(
                "🎉 愛媛踏破",
                "菩提の道場を踏破した！\n最大HPが1上昇した！"
        );    


        return true;
    }

    if (
        previousTemple < 87 &&
        gameState.currentTemple >= 87 &&
        gameState.currentTemple < 88
    ) {

        playClearEvent();

        gameState.eventLog =
            "🎉 香川踏破！\n" +
            "讃岐うどんを堪能した！";
        showClearModal(
            "🎉 香川踏破",
            "涅槃の道場を踏破した！\n\nついに最後の札所\n大窪寺が目前だ！"
        );    

        return true;
    }

    return false;
}

function showEndingModal() {

    endingMode = true;
    endingStep = 1;

    document.getElementById(
        "clear-title"
    ).textContent =
        "🎉 結願達成 🎉";

    document.getElementById(
        "clear-message"
    ).textContent =
        "四国八十八ヶ所の\n巡礼を終えました。\n\n" +
        "巡礼日数：" +
        gameState.turn +
        "日";

    document.getElementById(
        "clear-modal"
    ).style.display = "flex";
}

function nextEndingStep() {

    endingStep++;

    if (endingStep === 2) {

        document.getElementById(
            "clear-title"
        ).textContent =
            "おめでとう！";

        document.getElementById(
            "clear-message"
        ).textContent =
            "あなたは\n四国遍路を結願しました。\n\n" +
            "長い旅路の中で\n多くの札所を巡礼しました。";

        return;
    }

    if (endingStep === 3) {

        document.getElementById(
            "clear-title"
        ).textContent =
            "巡礼の記録";

        document.getElementById(
            "clear-message"
        ).textContent =
            "残りHP：" +
            gameState.hp +
            "\n\n" +
            "結願回数：" +
            getClearCount() +
            "回\n\n" +
            "ありがとうございました！";

        return;
    }

    if (endingStep >= 4) {

        location.href =
            "title.html";

    }

}


function showGameOverModal() {

    stopAllBGM();

    playBGM("gameover");

    gameOverMode = true;
    gameOverStep = 1;

    document.getElementById(
        "clear-title"
    ).textContent =
        "巡礼中断";

    document.getElementById(
        "clear-message"
    ).textContent =
        "あなたは力尽きた。\n\n" +
        "第" +
        gameState.currentTemple +
        "番札所で\n" +
        "巡礼を終えることになった。";

    document.getElementById(
        "clear-modal"
    ).style.display = "flex";

    console.log(
    document.getElementById(
        "clear-modal"
    ).style.display
);

const modalWindow =
    document.querySelector(".modal-window");

modalWindow.style.background = "yellow";
modalWindow.style.color = "black";
modalWindow.style.width = "300px";
modalWindow.style.height = "300px";
modalWindow.style.border = "10px solid red";

}

function nextGameOverStep() {

      console.log(
        "nextGameOverStep",
        gameOverStep
    );

    gameOverStep++;

    if (gameOverStep === 2) {

        document.getElementById(
            "clear-title"
        ).textContent =
            "巡礼の記録";

        document.getElementById(
            "clear-message"
        ).textContent =
            "巡礼日数：" +
            gameState.turn +
            "日\n\n" +
            "納経札所数：" +
            gameState.stamps +
            "ヶ所\n\n" +
            "またいつの日か\nお遍路の旅へ...";

        return;
    }

    if (gameOverStep >= 3) {

        stopAllBGM();

        location.href =
            "title.html";

    }

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
    console.log("ゲームBGM開始");
    playBGM("game");

});

document.addEventListener("visibilitycharge", () => {
    if (document.hidden) {
        stopAllBGM();
    }
});

window.addEventListener("pagehide", () => {
    stopAllBGM();
});



function showClearModal(title,message) {

    clearModalOpen = true;

    document.getElementById(
        "clear-title"
    ).textContent = title;

    document.getElementById(
        "clear-message"
    ).textContent = message;

    document.getElementById(
        "clear-modal"
    ).style.display = "flex";

}

function closeClearModal() {

    clearModalOpen = false;

    document.getElementById(
        "clear-modal"
    ).style.display = "none";

    if (clearAudio) {
        clearAudio.pause();
        clearAudio.currentTime = 0;
    }

    playBGM("game");

}

document
    .getElementById("clear-modal")
    .addEventListener("click", () => {

         console.log(
            "clear-modal click",
            gameOverMode,
            gameOverStep
        );

        playSE("enter");

        if (endingMode) {

            nextEndingStep();

            return;
        }

        if (gameOverMode) {

            nextGameOverStep();

            return;

        }

        closeClearModal();

    });
