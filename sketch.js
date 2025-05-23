let video;
let faceMesh;
let lips = [];
let modelReady = false;

function setup() {
  createCanvas(800, 450);
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  // Load FaceMesh model with correct lowercase function name
  faceMesh = ml5.facemesh(video, modelLoaded);
  faceMesh.on('predict', getFaceMesh);
}

function getFaceMesh(results) {
  if (results.length > 0) {
    let keypoints = results[0].scaledMesh;
    // Extract lip keypoints (indices based on FaceMesh model)
    lips = keypoints.filter((_, index) =>
      [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184].includes(index)
    );
  }
}

function modelLoaded() {
  console.log('FaceMesh model loaded');
  modelReady = true;
}

function draw() {
  background(0);
  drawCamera();
  drawLips();
}

function drawCamera() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);
  pop();
}

function drawLips() {
  if (lips.length > 0) {
    fill(255, 0, 0);
    noStroke();
    for (let point of lips) {
      ellipse(point[0], point[1], 5, 5); // Draw red dots on lip keypoints
    }
  }
}