// Fetch featured tracks
async function getFeaturedTracks() {
  const response = await fetch('data/tracks.json');
  const tracks = await response.json();
  return tracks.filter(track => track.featured);
}

// Fetch latest video
async function getLatestVideo() {
  const response = await fetch('data/videos.json');
  const videos = await response.json();
  return videos.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
}

// Load music player
async function loadMusicPlayer() {
  const tracks = await getFeaturedTracks();
  const player = document.querySelector('.music-player');
  
  if (tracks.length === 0) {
    player.innerHTML = '<p>No tracks available</p>';
    return;
  }

  player.innerHTML = tracks.map(track => `
    <div class="track">
      <h3>${track.title}</h3>
      <p>${track.artist}</p>
      <audio controls>
        <source src="${track.audioUrl}" type="audio/mpeg">
      </audio>
    </div>
  `).join('');
}

// Load latest video
async function loadLatestVideo() {
  const video = await getLatestVideo();
  const container = document.querySelector('.video-container');
  
  if (!video) {
    container.innerHTML = '<p>No video available</p>';
    return;
  }

  container.innerHTML = `
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/${video.youtubeId}" 
      frameborder="0" 
      allowfullscreen>
    </iframe>
  `;
}

// Run when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadMusicPlayer();
  loadLatestVideo();
});