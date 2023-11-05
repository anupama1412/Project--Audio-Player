const audio = document.getElementById("audio");
const audioSelect = document.getElementById("audio-select");
const randomButton = document.getElementById("random-button");
const songListElement = document.getElementById("song-list");
const currentSongElement = document.getElementById("current-song");
const playPreviousButton = document.getElementById("play-previous");
const playNextButton = document.getElementById("play-next");

randomButton.addEventListener("click", playRandomSong);

playPreviousButton.addEventListener("click", playPreviousSong);
playNextButton.addEventListener("click", playNextSong);

audioSelect.addEventListener("change", function() {
  playSelectedSong();
});

function updateSongList() {
  songListElement.innerHTML = "";
  Array.from(audioSelect.options).forEach((option, index) => {
    const songName = option.textContent;
    const thumbnailUrl = option.getAttribute("data-thumbnail");

    const listItem = document.createElement("div");
    listItem.classList.add("song-item");

    const thumbnail = document.createElement("img");
    thumbnail.src = thumbnailUrl;
    thumbnail.alt = "Thumbnail";

    const songText = document.createElement("span");
    songText.textContent = songName;

    listItem.appendChild(thumbnail);
    listItem.appendChild(songText);
    songListElement.appendChild(listItem);

    listItem.addEventListener("click", function() {
      audioSelect.selectedIndex = index;
      playSelectedSong();
      updateSongList();
    });

    if (index === audioSelect.selectedIndex) {
      listItem.classList.add("playing");
      currentSongElement.textContent = songName;
    }
  });
}

function playSelectedSong() {
  const selectedOption = audioSelect.options[audioSelect.selectedIndex];
  audio.src = selectedOption.value;
  audio.load();
  audio.play();

  const previouslySelectedSongItem = document.querySelector('.song-item.playing');
  if (previouslySelectedSongItem){
	  previouslySelectedSongItem.classList.remove('playing');
  }
  const currentSongItem = document.querySelector('[data-index="${audioSelect.selectedIndex}"]');
  if (currentSongItem) {
	  currentSongItem.classList.add('playing');
}
updateSongList();
}

function playRandomSong() {
  const randomIndex = Math.floor(Math.random() * audioSelect.options.length);
  audioSelect.selectedIndex = randomIndex;
  playSelectedSong();
  updateSongList();
}

function playPreviousSong() {
  if (audioSelect.selectedIndex > 0) {
    audioSelect.selectedIndex--;
  } else {
    audioSelect.selectedIndex = audioSelect.options.length - 1;
  }
  playSelectedSong();
  updateSongList();
}

function playNextSong() {
  if (audioSelect.selectedIndex < audioSelect.options.length - 1) {
    audioSelect.selectedIndex++;
  } else {
    audioSelect.selectedIndex = 0;
  }
  playSelectedSong();
  updateSongList();
}

updateSongList();
audio.addEventListener("play", () => {
	console.log("Audio is playing");
});

audio.addEventListener("pause", () => {
	console.log("Audio is paused");
});
audio.addEventListener("ended", () => {
	console.log("Audio has ended");
});

