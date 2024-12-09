let handPose;
let video;
let hands = [];
let handCenters = [];
let bars = [0, 0, 0];
let trailColor = []; 
let strings, wind, drum;
let currentStringVolume = 0;  
let currentWindVolume = 0;    
let currentDrumVolume = 0;    

function preload() {
  handPose = ml5.handPose();
  violin = loadImage("assets/violin.png");
  horn = loadImage("assets/horn.png");
  timpani = loadImage("assets/timpani.png");
  gaugebackground = loadImage("assets/gaugebackground.jpg");
  font = loadFont("assets/DungGeunMo.otf");
  strings = loadSound('assets/string.mp3');
  wind = loadSound('assets/wind.mp3');
  drum = loadSound('assets/percussion.mp3');
}

function setup() {
  createCanvas(1000, 750);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CORNER);
  textFont(font);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  strings.setVolume(0);
  wind.setVolume(0);
  drum.setVolume(0);
  strings.loop();
  wind.loop();
  drum.loop();
  
  detectHands();
}

function detectHands() {
  handPose.detect(video, gotHands);
  requestAnimationFrame(detectHands);
}

function gotHands(results) {
  hands = results;
}

function draw() {
  background(0);
  drawRightSection();
  drawBars();
}

function drawRightSection() {
  push();
  translate(width, 0);  // 캔버스를 오른쪽 끝으로 이동
  scale(-1, 1);         // X축 반전
  image(video, 0, 0, width, height);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let handCenter = calculateHandCenter(hand);
    let fingerCount = countFingers(hand);
    let handHeight = handCenter.y;

    let newColor;
    // 악기와 볼륨 설정
    if (fingerCount === 2) {
      bars[0] = map(handHeight, 0, height, 100, 0);
      newColor = color(0, 80, 90); // 빨강 (현악기)
      setVolumes('strings');  // 현악기 볼륨 0.5, 나머지 0.2
    } else if (fingerCount === 3) {
      bars[1] = map(handHeight, 0, height, 100, 0);
      newColor = color(120, 80, 90); // 초록 (관악기)
      setVolumes('wind');  // 관악기 볼륨 0.5, 나머지 0.2
    } else if (fingerCount === 4) {
      bars[2] = map(handHeight, 0, height, 100, 0);
      newColor = color(240, 80, 90); // 파랑 (타악기)
      setVolumes('drum');  // 타악기 볼륨 0.5, 나머지 0.2
    } else {
      newColor = trailColor.length > 0 ? trailColor[trailColor.length - 1] : color(0, 80, 90);
      if (fingerCount === 0) {
        setVolumes('none');  // 모든 악기 볼륨 0
      }
    }

    // 볼륨 설정 (트레일 색상에 따라)
    strings.setVolume(currentStringVolume);
    wind.setVolume(currentWindVolume);
    drum.setVolume(currentDrumVolume);

    if (trailColor.length > 0) {
      newColor = lerpColor(trailColor[trailColor.length - 1], newColor, 0.1);
    }
    trailColor.push(newColor);
    handCenters.push(handCenter);

    // 트레일 그리기
    for (let j = 0; j < handCenters.length; j++) {
      let pos1 = handCenters[j];
      let pos2 = j + 1 < handCenters.length ? handCenters[j + 1] : pos1;
      let alpha = map(j, 0, handCenters.length - 1, 100, 150);
      let strokeThickness = map(j, 0, handCenters.length - 1, 5, 20);

      stroke(trailColor[j], alpha);
      strokeWeight(strokeThickness);
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = trailColor[j];
      line(pos1.x, pos1.y, pos2.x, pos2.y);
    }

    if (handCenters.length > 50) {
      handCenters.shift();
      trailColor.shift();
    }
  }
  pop();
}

function setVolumes(activeInstrument) {
  // 각 악기의 볼륨을 조정하는 함수
  if (activeInstrument === 'strings') {
    currentStringVolume = 0.7;  // 현악기 볼륨 0.7
    currentWindVolume = 0.2;
    currentDrumVolume = 0.2;
  } else if (activeInstrument === 'wind') {
    currentStringVolume = 0.2;
    currentWindVolume = 0.7;  // 관악기 볼륨 0.7
    currentDrumVolume = 0.2;
  } else if (activeInstrument === 'drum') {
    currentStringVolume = 0.2;
    currentWindVolume = 0.2;
    currentDrumVolume = 0.7;  // 타악기 볼륨 0.7
  } else {
    currentStringVolume = 0;
    currentWindVolume = 0;
    currentDrumVolume = 0;
  }
}

function stopAllMusic() {
  strings.stop();  // 문자열 악기 정지
  wind.stop();  // 관악기 정지
  drum.stop();  // 타악기 정지
}

function drawBars() {
  noStroke();
  fill(255);
  
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = color(0, 0, 0, 0);

  // 배경과 악기를 0, 0 기준으로 배치
  image(gaugebackground, 0, 0, width * 0.33, height);

  textSize(20);
  text("여기서 관악기를 키워봐!", width*0.05, 90);
  textSize(80);
  text("Good", width*0.08, 200);

  let barWidth = 50;
  let barSpacing = 60;
  let startX = 34; 

  image(violin, startX-14, height * 0.85 - 10, 80, 80);
  image(horn, startX + barWidth + barSpacing-14, height * 0.85 - 10, 80, 80);
  image(timpani, startX + 2 * (barWidth + barSpacing)-14, height * 0.85 - 10, 80, 80);

  // 게이지 바 배경
  fill(0, 100, 100, 30);
  rect(startX, height / 2 - 20, barWidth, 258);
  fill(120, 100, 100, 30);
  rect(startX + barWidth + barSpacing, height / 2 - 20, barWidth, 258);
  fill(240, 100, 100, 30);
  rect(startX + 2 * (barWidth + barSpacing), height / 2 - 20, barWidth, 258);
  
  let barHeights = [
    map(bars[0], 0, 100, 0, height * 0.5),
    map(bars[1], 0, 100, 0, height * 0.5),
    map(bars[2], 0, 100, 0, height * 0.5),
  ];

  // 게이지 바 그리기
  if (barHeights[0] > 0) drawBar(startX, height * 0.85 - 20, barHeights[0], color(0, 80, 90), barWidth);
  if (barHeights[1] > 0) drawBar(startX + barWidth + barSpacing, height * 0.85 - 20, barHeights[1], color(120, 80, 90), barWidth);
  if (barHeights[2] > 0) drawBar(startX + 2 * (barWidth + barSpacing), height * 0.85 - 20, barHeights[2], color(240, 80, 90), barWidth);
}

function drawBar(x, y, height, col, barWidth) {
  fill(col);
  noStroke();
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = col;
  rect(x, y - height, barWidth, height);
}

function calculateHandCenter(hand) {
  let wrist = hand.keypoints[0];
  let palmCenter = hand.keypoints[9];
  return createVector((wrist.x + palmCenter.x) / 2, (wrist.y + palmCenter.y) / 2);
}

function countFingers(hand) {
  let count = 0;
  let fingerTips = [4, 8, 12, 16, 20];
  let fingerBases = [3, 7, 11, 15, 19];

  for (let i = 0; i < fingerTips.length; i++) {
    if (hand.keypoints[fingerTips[i]].y < hand.keypoints[fingerBases[i]].y) {
      count++;
    }
  }
  return count;
}

function gotHands(results) {
  hands = results;
}


