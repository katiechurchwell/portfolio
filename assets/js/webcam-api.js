var container = document.getElementById("landing-page");
var containerText = document.getElementById("intro");

function cssOverlay(imgSrc) {
  containerText.style.backgroundImage = 'url("' + imgSrc + '")';
}

function randomImage(webcam) {
  var webcams = webcam.result.webcams;
  //exclude Redmond (id=1614363511)
  var redmondIndex = webcams.findIndex(
    (webcams) => webcams.id === "1614363511"
  );
  webcams.splice(redmondIndex, 1);
  //random selection
  var max = webcams.length;
  var i = Math.floor(Math.random() * max);
  var imgSrc = webcams[i].image.current.preview;
  //subtitle
  var imgTitle = webcams[i].title;
  var title = document.createElement("div");
  title.setAttribute("id", "webcam-title");
  title.innerHTML =
    "<p>Randomly generated live image of the mountains of Oregon -- this one happens to be in " +
    imgTitle +
    ".</p><p>";
  container.appendChild(title);
  cssOverlay(imgSrc);
  averageColor(imgSrc);
}

fetch(
  "https://api.windy.com/api/webcams/v2/list/category=mountain/region=US.OR/?show=webcams:image",
  {
    method: "GET",
    headers: {
      "x-windy-key": "fRBdejZXV9tukKAYkPngOtGOg0bYrvV9",
    },
  }
).then(function (response) {
  response.json().then(function (webcam) {
    randomImage(webcam);
  });
});