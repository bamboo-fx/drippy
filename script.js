document.addEventListener('DOMContentLoaded', () => {
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    const videos = document.querySelectorAll('.video');
    const container = document.querySelector('.video-container');
    
    // Initialize first video with entrance animation
    const firstVideo = videos[0];
    
    // Play first video on load
    firstVideo.play().catch(err => {
        console.log('Autoplay prevented:', err);
    });
    
    // Handle video end event - scroll to next video
    videos.forEach((video, index) => {
        video.addEventListener('ended', () => {
            // Find next video index
            let nextIndex = index + 1;
            
            // If last video, loop back to first
            if (nextIndex >= videos.length) {
                nextIndex = 0;
            }
            
            // Scroll to next video
            videoWrappers[nextIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Play next video after a short delay
            setTimeout(() => {
                videos[nextIndex].play().catch(err => {
                    console.log('Play prevented:', err);
                });
            }, 300);
        });
    });
    
    // Intersection Observer to play video when it comes into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('.video');
            if (entry.isIntersecting) {
                // Only play if video hasn't ended or isn't playing
                if (video.paused && video.currentTime < video.duration) {
                    video.play().catch(err => {
                        console.log('Play prevented:', err);
                    });
                }
            } else {
                video.pause();
            }
        });
    }, observerOptions);
    
    // Observe all video wrappers
    videoWrappers.forEach(wrapper => {
        videoObserver.observe(wrapper);
    });
});
