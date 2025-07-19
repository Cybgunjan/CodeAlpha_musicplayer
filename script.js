const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

const songs = [
  {
    title: "Acoustic Breeze",
    artist: "Benjamin Tissot",
    src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3"
  },
  {
    title: "Sunny",
    artist: "Benjamin Tissot",
    src: "https://www.bensound.com/bensound-music/bensound-sunny.mp3"
  },
  {
    title: "Better Days",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-betterdays.mp3"
  }
];

let currentSong = 0;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  highlightPlaylist();
}

function playSong() {
  audio.play();
  playBtn.innerHTML = "⏸";
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = "▶";
}

function togglePlay() {
  if (audio.paused) playSong();
  else pauseSong();
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
}

function updateProgress() {
  progress.value = (audio.currentTime / audio.duration) || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
}

function setProgress() {
  audio.currentTime = progress.value * audio.duration;
}

function setVolume() {
  audio.volume = volumeSlider.value;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

function populatePlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSong = index;
      loadSong(song);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

function highlightPlaylist() {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((li, index) => {
    li.classList.toggle("playing", index === currentSong);
  });
}

// Events
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("input", setProgress);
volumeSlider.addEventListener("input", setVolume);
audio.addEventListener("ended", nextSong); // autoplay

// Init
loadSong(songs[currentSong]);
populatePlaylist();
