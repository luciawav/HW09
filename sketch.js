let song;
let fft;
let playing = false;

function preload() {
  song = loadSound('liar.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES); 
  noFill();

  fft = new p5.FFT();
}

function draw() {
  background(0);

  if (playing) {
    let spectrum = fft.analyze();
    translate(width / 2, height / 2);

    for (let i = 0; i < spectrum.length; i++) {
      let angle = map(i, 0, spectrum.length, 0, 360);
      let amp = spectrum[i];
      let r = map(amp, 0, 256, 10, width / 2); 
      let col = map(i, 0, spectrum.length, 0, 255); 
      
      stroke(col, 255, 255);
      drawPolarShape(angle, r);
    }
  }
}

function drawPolarShape(angle, radius) {

  push();
  rotate(angle);
  beginShape();
  //for 11 members
  for (let a = 0; a < 360; a += 360 / 11) { 
    let x = cos(a) * radius;
    let y = sin(a) * radius;
    vertex(x, y);
  }
  endShape(CLOSE);
  
  pop();
}

function mouseClicked() {
  if (!playing) {
    song.play();
    playing = true;
  } else {
    song.pause();
    playing = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
