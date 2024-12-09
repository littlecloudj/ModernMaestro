let finale;
let applause;

function preload() {
  finale = loadImage("assets/finale.jpg");
  applause = loadSound("assets/applause.mp3");
}

function setup() {
  createCanvas(1000, 750);
}

function draw() {
  image(finale, 0, 0, 1000, 750);
  
  // 소리가 아직 재생 중이지 않다면 재생
  if (!applause.isPlaying()) {
    applause.setVolume(0.5);
    applause.play();
  }
}