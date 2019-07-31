const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

const getVideo = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(error => console.error("OH NO!!", error));
};

const paintToCanvas = () => {
  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    // pixels = greenScreen(pixels);
    // ctx.globalAlpha = 0.1;
    ctx.putImageData(pixels, 0, 0);
  }, 16);
};

function takePhoto() {
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");

  snap.currentTime = 0;
  snap.play();

  link.href = data;
  link.setAttribute("download", "handsome");
  link.innerHTML = `<img src="${data} alt="Nice />"`;
  strip.insertBefore(link, strip.firstChild);
}

const redEffect = pixels => {
  const { data } = pixels;

  for (let i = 0; i < data.length; i += 4) {
    data[i + 0] += 100; // red
    data[i + 1] -= 50; // green
    data[i + 2] *= 0.5; //blue
  }

  return pixels;
};

const rgbSplit = pixels => {
  const { data } = pixels;

  for (let i = 0; i < data.length; i += 4) {
    data[i - 150] = data[i + 0]; // red
    data[i + 100] = data[i + 1]; // green
    data[i - 150] = data[i + 2]; //blue
  }

  return pixels;
};

const greenScreen = pixels => {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach(input => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
};

getVideo();

video.addEventListener("canplay", paintToCanvas);
