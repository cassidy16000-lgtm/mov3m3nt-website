// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    new WOW().init();
    
    // Set up audio players
    setupAudioPlayers();
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            header.style.padding = '15px 5%';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            header.style.padding = '20px 5%';
        }
    });
    
    // Add hover effect to nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = '#ff5500';
        });
        link.addEventListener('mouseleave', function() {
            this.style.color = '#fff';
        });
    });
});

// Audio player functionality
function setupAudioPlayers() {
    // Initialize all audio players
    const audioPlayers = document.querySelectorAll('audio');
    audioPlayers.forEach(audio => {
        audio.addEventListener('loadedmetadata', function() {
            const trackId = this.id;
            const durationElement = document.getElementById(`duration-${trackId}`);
            const mins = Math.floor(this.duration / 60);
            const secs = Math.floor(this.duration % 60);
            durationElement.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        });
        
        updateProgress(audio.id);
    });
}

function togglePlay(trackId) {
    const audio = document.getElementById(trackId);
    const playBtn = document.querySelector(`#${trackId} + .player-controls .play-btn i`);
    
    // Pause all other tracks
    document.querySelectorAll('audio').forEach(a => {
        if (a.id !== trackId && !a.paused) {
            a.pause();
            const otherPlayBtn = document.querySelector(`#${a.id} + .player-controls .play-btn i`);
            otherPlayBtn.classList.remove('fa-pause');
            otherPlayBtn.classList.add('fa-play');
        }
    });
    
    if (audio.paused) {
        audio.play();
        playBtn.classList.remove('fa-play');
        playBtn.classList.add('fa-pause');
    } else {
        audio.pause();
        playBtn.classList.remove('fa-pause');
        playBtn.classList.add('fa-play');
    }
}

function updateProgress(trackId) {
    const audio = document.getElementById(trackId);
    const progress = document.getElementById(`progress-${trackId}`);
    const currentTime = document.getElementById(`current-time-${trackId}`);
    
    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${percent}%`;
        
        // Format current time
        const mins = Math.floor(audio.currentTime / 60);
        const secs = Math.floor(audio.currentTime % 60);
        currentTime.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    });
    
    audio.addEventListener('ended', () => {
        const playBtn = document.querySelector(`#${trackId} + .player-controls .play-btn i`);
        playBtn.classList.remove('fa-pause');
        playBtn.classList.add('fa-play');
        progress.style.width = '0%';
    });
}

function seek(event, trackId) {
    const audio = document.getElementById(trackId);
    const progressContainer = event.currentTarget;
    const seekPosition = event.offsetX / progressContainer.offsetWidth;
    audio.currentTime = seekPosition * audio.duration;
}

function setVolume(volume, trackId) {
    const audio = document.getElementById(trackId);
    audio.volume = volume;
    
    // Update volume icon
    const volumeIcon = document.querySelector(`#${trackId} + .player-controls .volume-control i`);
    if (volume == 0) {
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-volume-mute');
    } else {
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-up');
    }
}

// Equalizer animation for playing tracks
setInterval(() => {
    document.querySelectorAll('audio').forEach(audio => {
        if (!audio.paused) {
            const equalizer = audio.closest('.music-track').querySelector('.equalizer');
            if (equalizer) {
                const bars = equalizer.querySelectorAll('.equalizer-bar');
                bars.forEach(bar => {
                    const randomHeight = Math.random() * 100;
                    bar.style.height = `${randomHeight}%`;
                });
            }
        }
    });
}, 200);