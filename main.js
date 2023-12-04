// parent element
let wrapperEl = document.querySelector(".video-controls-wrapper");

// source audio
let audioSource = wrapperEl.getAttribute("audio-src");
let audio = new Audio(audioSource);

// volume control
let volumeControlWrapper = wrapperEl.querySelector(".volume-control-wrpaper");
let volumeRangeEl = volumeControlWrapper.querySelector('[data-audio="volume"]');
let unmuteEl = volumeControlWrapper.querySelector('[data-audio="unmute"]');
let muteEl = volumeControlWrapper.querySelector('[data-audio="mute"]');

// actions controls
let videControlsWrapper = document.querySelector(".video-controls");
let playEl = videControlsWrapper.querySelector('[data-audio="play"]');
let pauseEl = videControlsWrapper.querySelector('[data-audio="pause"]');
let backwardEl = videControlsWrapper.querySelector('[data-audio="backward"]');
let forwardEl = videControlsWrapper.querySelector('[data-audio="forward"]');

// time controls
let timeControlWrapper = document.querySelector(".time-controls-wrapper");
let currTimeEl = timeControlWrapper.querySelector('[f-data-video="current-time"]');
let durationEl = timeControlWrapper.querySelector('[f-data-video="duration"]');

window.addEventListener("load", function () {
  pauseEl.style.display = "none";
  muteEl.style.display = "none";
});

// Functions

const playAudio = () => {
  audio.play();
  playEl.style.display = "none";
  pauseEl.style.display = "block";
};

const pauseAudio = () => {
  audio.pause();
  playEl.style.display = "block";
  pauseEl.style.display = "none";
};

const backwardAudio = () => {
  audio.currentTime -= 10;
};

const forwardAudio = () => {
  audio.currentTime += 10;
};

const muteAudio = () => {
  audio.volume = 0;
  muteEl.style.display = "block";
  unmuteEl.style.display = "none";
};

const unmuteAudio = () => {
  audio.volume = 1;
  muteEl.style.display = "none";
  unmuteEl.style.display = "block";
};

const handleRangeVolume = () => {
  let volumeRange = volumeRangeEl.value;
  audio.volume = volumeRange;
  if (audio.volume === 0) {
    muteAudio();
  } else {
    unmuteAudio();
  }
};

// Event Listener Action Button Controllers

playEl.addEventListener("click", () => {
  playAudio();
});

pauseEl.addEventListener("click", () => {
  pauseAudio();
});

backwardEl.addEventListener("click", () => {
  backwardAudio();
});

forwardEl.addEventListener("click", () => {
  forwardAudio();
});

unmuteEl.addEventListener("click", () => {
  muteAudio();
});

muteEl.addEventListener("click", () => {
  unmuteAudio();
});

volumeRangeEl.addEventListener("input", () => {
  handleRangeVolume();
});