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

// progress bar
let progressEl = document.querySelector('[f-data-video="progress"]');

// error
let errorEl = document.querySelector('#error');

// loading
let loadingEl = document.querySelector('[f-data-video="loading"]');

window.addEventListener("load", function () {
  pauseEl.style.display = "none";
  muteEl.style.display = "none";

  currTimeEl.innerHTML = "00:00:00";
});

const handleErrorAudio = (event) => {
  if (event?.returnValue && event?.type === "error") {
    errorEl.innerHTML = "Audio Source Error";
  }
};

const handleLoadingAudio = (event) => {
  if (event?.returnValue && event?.type === "canplaythrough") {
    loadingEl.style.display = "none";

    // set audio duration
    const durationAudio = audio.duration;
    const durationText = formattedDuration(durationAudio);
    durationEl.innerHTML = durationText;
  }
};

if (audio) {
  audio.addEventListener("error", handleErrorAudio);
  audio.addEventListener("canplaythrough", handleLoadingAudio);
}

const formattedDuration = (duration) => {
  let hours = Math.floor(duration / 3600);
  let minutes = Math.floor((duration % 3600) / 60);
  let seconds = Math.floor(duration % 60);

  let formattedHours = hours < 10 ? "0" + hours : hours;
  let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  let durationValue = formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
  let defaultDuration = "00:00:00";

  return typeof formattedSeconds > "00" ? durationValue : defaultDuration;
};

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
    muteEl.style.display = "none";
    unmuteEl.style.display = "block";
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

audio.addEventListener("timeupdate", () => {
  const currAudioTime = audio.currentTime;
  const audioDuration = audio.duration;
  const formattedCurrentTime = formattedDuration(currAudioTime);
  currTimeEl.innerHTML = formattedCurrentTime;

  let progressWidth = (currAudioTime / audioDuration) * 100;
  progressEl.style.width = progressWidth + "%";
});