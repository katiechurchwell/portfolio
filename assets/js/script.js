var container = document.getElementById("landing-page");
var containerText = document.getElementById("landing-page-text");

// dark mode
// nasa API (mars rover photos too!!)
var nasaKey = "J9vp32hp1eWAhfieQ2dFCOgJdF9QKrLL0ot4oBYO";
var nasaQuery = "https://api.nasa.gov/planetary/apod?api_key=" + nasaKey;

let img;

randomImage = function (webcam) {
  // //random selection
  // var max = webcam.result.webcams.length;
  // var i = Math.floor(Math.random() * max);
  // var imgSrc = webcam.result.webcams[i].image.current.preview;
  // //subtitle
  // var imgTitle = webcam.result.webcams[i].title;
  // var title = document.createElement("div");
  // title.setAttribute("id", "webcam-title");
  // title.innerHTML =
  //   "<p>< Randomly generated live background of the mountains in Oregon. This one happens to be in " +
  //   imgTitle +
  //   ".</p>";
  // containerText.appendChild(title);
  console.log(webcam.url);
  imgSrc = webcam.url;
  var image = document.createElement("img");
  image.src = imgSrc;
  container.appendChild(image);
  //dithering init
  // img = loadImage(imgSrc, () => {
  //   makeDithered(img, 4);
  // });
};

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(container);
  //webcam API
  let headers = {};
  Object.assign(headers, { method: "GET" });
  Object.assign(headers, { mode: "cors" });
  Object.assign(headers, {
    "Access-Control-Allow-Origin": "https://apod.nasa.gov",
  });

  fetch(nasaQuery, {
    headers: headers,
  }).then(function (response) {
    response.json().then(function (webcam) {
      randomImage(webcam);
    });
  });
}

function draw() {
  if (img) {
    image(img, 0, 0, width, height);
  }
}

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

function getColorAtindex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, clr) {
  // return;
  let idx = imageIndex(img, x, y);

  let pix = img.pixels;
  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(max, steps, value) {
  return round((steps * value) / 255) * floor(255 / steps);
}

function makeDithered(img, steps) {
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtindex(img, x, y);
      let oldR = red(clr);
      let oldG = green(clr);
      let oldB = blue(clr);
      let newR = closestStep(255, steps, oldR);
      let newG = closestStep(255, steps, oldG);
      let newB = closestStep(255, steps, oldB);

      let newClr = color(newR, newG, newB);
      setColorAtIndex(img, x, y, newClr);

      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;

      distributeError(img, x, y, errR, errG, errB);
    }
  }

  img.updatePixels();
}

function distributeError(img, x, y, errR, errG, errB) {
  addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
  addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
  addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
  addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function addError(img, factor, x, y, errR, errG, errB) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  let clr = getColorAtindex(img, x, y);
  let r = red(clr);
  let g = green(clr);
  let b = blue(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);

  setColorAtIndex(img, x, y, clr);
}
