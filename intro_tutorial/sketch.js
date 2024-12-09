let introOfficial;
let introOfficial2;
let introBg;
let font;
let clickCount = 0; // 클릭 횟수를 추적하는 변수
let videoCall;
let carnegie;
let carnegieInside;

let countdownStart = false; // 카운트다운이 시작되었는지 추적하는 변수
let countdownTime = 3; // 카운트다운 초기 시간
let countdownFrame = 0; // 카운트다운을 위한 프레임 수

function preload() {
  introOfficial = loadImage("assets/intro_official.png");
  introBg = loadImage("assets/intro_background.jpg");
  videoCall = loadImage("assets/videoCall.png");
  font = loadFont("assets/DungGeunMo.otf");
  carnegie = loadImage("assets/carnegie.jpg");
  carnegieInside = loadImage("assets/carnegie_inside.jpg");
  introOfficial2 = loadImage("assets/introOfficial2.png");
}

function setup() {
  createCanvas(1000, 750);
}

function draw() {
  if (clickCount === 0) {
    // 첫 번째 장면
    image(introBg, 0, 0);
    image(introOfficial, 100, 100, 800, 450);
    noStroke();
    fill(189, 157, 136);
    rect(100, 550, 800, 200);
    fill(105, 65, 17);
    triangle(860, 675, 890, 675, 875, 690);
    textFont(font);
    textSize(28);
    text("Click", 780, 690);
    fill(0);
    rect(0, 700, 1000, 50);
    rect(0, 0, 1000, 50);
    image(videoCall, 375, 700, 250, 50);
    fill(255);
    text("Video Call from New York Philharmonic Official", 20, 30);
    fill(0);
    text("(사용자 이름)… 여기 뉴욕 필하모닉일세.", 120, 590);
  } else if (clickCount === 1) {
    // 두 번째 장면
    noStroke();
    fill(189, 157, 136);
    rect(100, 550, 800, 200);
    fill(105, 65, 17);
    triangle(860, 675, 890, 675, 875, 690);
    text("Click", 780, 690);
    fill(0);
    rect(0, 700, 1000, 50);
    rect(0, 0, 1000, 50);
    image(videoCall, 375, 700, 250, 50);
    fill(255);
    text("Video Call from New York Philharmonic Official", 20, 30);
    fill(0);
    text(
      "지금 수석지휘자 야닉이 심한 독감에 걸려서 오늘 공연에\n못 나오게 생겼네.\n혹시 오늘만 자네가 임시지휘자를 맡아줄 수 있는가?",
      120,
      590
    );
  } else if (clickCount === 2) {
    // 세 번째 장면
    noStroke();
    fill(189, 157, 136);
    rect(100, 550, 800, 200);
    fill(105, 65, 17);
    triangle(860, 675, 890, 675, 875, 690);
    text("Click", 780, 690);
    fill(0);
    rect(0, 700, 1000, 50);
    rect(0, 0, 1000, 50);
    image(videoCall, 375, 700, 250, 50);
    fill(255);
    text("Video Call from New York Philharmonic Official", 20, 30);
    fill(0);
    text(
      "부탁일세… 안타깝게도 리허설을 위한 시간은 없다네.\n자네의 즉흥적인 재능을 기대하지!",
      120,
      590
    );
  } else if (clickCount === 3) {
    // 네 번째 장면 (Carnegie Hall)
    image(carnegie, 0, 0, 1000, 750);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(80);
    text("To Carnegie Hall...", width / 2, height / 2);
  } else if (clickCount === 4) {
    // 다섯 번째 장면 (Carnegie Inside)
    image(carnegieInside, 0, 0, 1000, 750);
    image(introOfficial2, 100, 100, 800, 450);
    fill(189, 157, 136);
    rect(100, 550, 800, 200);
    fill(105, 65, 17);
    triangle(860, 715, 890, 715, 875, 730);
    textFont(font);
    textSize(28);
    textAlign(LEFT, BASELINE);
    text("Click", 780, 730);
    fill(0);
    text(
      "오! (사용자 이름) 도착했군! 준비됐나?\n이제 관객들을 입장시키지!",
      120,
      590
    );
  } else if (clickCount === 5) {
    // 여섯 번째 장면: 3초 카운트다운
    if (!countdownStart) {
      countdownStart = true;
      countdownFrame = frameCount;
    }

    let remainingTime = 3 - Math.floor((frameCount - countdownFrame) / 60);

    if (remainingTime > 0) {
      background(0);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(100);
      text(remainingTime, width / 2, height / 2); // 화면 중앙에 카운트다운 숫자 출력
    } else {
      // 3초가 지난 후 새로운 화면을 그려줌
      clickCount++; // clickCount를 증가시켜서 새로운 장면으로 넘어가게 함
      countdownStart = false; // 카운트다운을 리셋
    }
  } else if (clickCount === 6) {
    // 새로운 장면: 예시로, 새로운 배경이나 내용을 그릴 수 있습니다.
    background(255); // 흰 배경을 그리거나 다른 장면을 추가할 수 있습니다.
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("3초가 지나 새로운 장면으로 넘어갔습니다.", width / 2, height / 2);
  } else {
    clear();
  }
}

// 마우스를 눌렀을 때 실행되는 함수
function mousePressed() {
  if (clickCount < 6) {
    clickCount++;
  }
}
