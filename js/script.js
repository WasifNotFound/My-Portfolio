// ==========================================
// MODAL FUNCTIONS
// ==========================================

// Function to open modal
function openModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Function to close modal
function closeModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const activeModals = document.querySelectorAll('.modal.active');
        activeModals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});

// ==========================================
// SMOOTH SCROLL ANIMATIONS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});


// ==========================================
// LIGHTBOX FUNCTIONALITY
// ==========================================

let currentLightboxIndex = 0;
let currentGalleryType = '';
let mediaItems = [];

// Define all galleries with their media
const galleries = {
    football: [
        { type: 'image', src: 'images/Sports/house_champion.jpg', alt: 'Football match moment' },
        { type: 'video', src: 'videos/house_champ_celebration.mp4', alt: 'Football video 1' }
    ],
    topscorer: [
        { type: 'video', src: 'videos/winning_goal.mp4', alt: 'Winning goal' }
    ],
    race: [
        { type: 'image', src: 'images/Sports/race_medels.jpg', alt: 'Race victory moment' }
    ],
    captain: [
        { type: 'image', src: 'images/Sports/team.jpg', alt: 'Team captain moment' }
    ],
    art: [
        { type: 'image', src: 'images/Arts/Boots.jpg', alt: 'Boots sketch' },
        { type: 'image', src: 'images/Arts/Mustach.jpg', alt: 'Murky sketch' },
        { type: 'image', src: 'images/Arts/Weave.jpg', alt: 'Weave sketch' },
        { type: 'image', src: 'images/Arts/Crown.jpg', alt: 'Crown sketch' },
        { type: 'image', src: 'images/Arts/Murky.jpg', alt: 'Murky sketch' }
    ],
    selfdev: [
        { type: 'image', src: 'images/Books/The_power_of_being_Yourself.jpg', alt: 'The Power of Being Yourself' },
        { type: 'image', src: 'images/Books/Alchemist.jpg', alt: 'The Alchemist' },
        { type: 'image', src: 'images/Books/totto_chanjpg.jpg', alt: 'Totto-Chan' }
    ],
    philosophy: [
        { type: 'image', src: 'images/Books/Man_Search_For_Meaning.jpg', alt: 'Man\'s Search for Meaning' }
    ],
    thriller: [
        { type: 'image', src: 'images/Books/The-Girl-on-the-Train-Paula-Hawkins-Keeping-Up-With-The-Penguins.jpg', alt: 'The Girl on the Train' },
        { type: 'image', src: 'images/Books/Chol.jpg', alt: 'Chol' }
    ],
    manga: [
        { type: 'image', src: 'images/Books/Manga_AOT.jpg', alt: 'Attack on Titan' },
        { type: 'image', src: 'images/Books/Manga_Deathnote.jpg', alt: 'Death Note' }
    ],
    fiction: [
        { type: 'image', src: 'images/Books/morisaki1.jpg', alt: 'Days at the Morisaki Bookshop' }
    ],
    reading: [
        { type: 'image', src: 'images/Books/Sealed_necter.jpg', alt: 'Currently Reading' },
        { type: 'image', src: 'images/Books/Dark_Psychology.jpg', alt: 'Currently Reading' },
        { type: 'image', src: 'images/Books/Manga_Tokyo_Ghoul.jpg', alt: 'Currently Reading' },
        { type: 'image', src: 'images/Books/Silent_paitent.jpg', alt: 'Currently Reading' }
    ],
    competition: [
        { type: 'image', src: 'images/Coding/Inter_sch_champ.jpg', alt: 'Competition certificate' },
        { type: 'image', src: 'images/Coding/Inter_sch_champ2.jpg', alt: 'Victory moment photo' },
        { type: 'image', src: 'images/Coding/Inter_sch_champ3.jpg', alt: 'Victory moment photo' },
        { type: 'image', src: 'images/Coding/Inter_sch_champ4.jpg', alt: 'Victory moment photo' }
    ],
    game: [
        { type: 'video', src: 'videos/gameplay.mp4', alt: 'Gameplay' },
        { type: 'image', src: 'images/Coding/alice3.jpg', alt: 'overall view' },
        { type: 'image', src: 'images/Coding/time_keepers_academy.jpg', alt: 'wallpaper' },
    ],
    event: [
        { type: 'image', src: 'images/Coding/cmuq.jpg', alt: 'CMU-Q competition venue' },
        { type: 'image', src: 'images/Coding/cmuq2.jpg', alt: 'Competition participants' },
        { type: 'image', src: 'images/Coding/cmuq3.jpg', alt: 'Competition participants' }
    ],
    memories: [
        { type: 'image', src: 'images/Coding/memories.jpg', alt: 'Competition memory 1' },
        { type: 'image', src: 'images/Coding/memories2.jpg', alt: 'Competition memory 2' },
        { type: 'video', src: 'videos/memories3.mp4', alt: 'Competition memory 3' }
    ]
};

// Open lightbox
function openLightbox(index, galleryType) {
    currentLightboxIndex = index;
    currentGalleryType = galleryType;
    mediaItems = galleries[galleryType];
    
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('active');
        displayMedia(currentLightboxIndex);
        document.body.style.overflow = 'hidden';
    }
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const videos = lightbox.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
        
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Display media at specific index
function displayMedia(index) {
    if (index < 0) {
        currentLightboxIndex = mediaItems.length - 1;
    } else if (index >= mediaItems.length) {
        currentLightboxIndex = 0;
    } else {
        currentLightboxIndex = index;
    }
    
    const media = mediaItems[currentLightboxIndex];
    const lightboxContent = document.querySelector('.lightbox-content');
    const counter = document.querySelector('.lightbox-counter');
    
    if (!lightboxContent || !counter) return;
    
    const oldVideos = lightboxContent.querySelectorAll('video');
    oldVideos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
    
    lightboxContent.innerHTML = '';
    
    if (media.type === 'image') {
        const img = document.createElement('img');
        img.src = media.src;
        img.alt = media.alt;
        lightboxContent.appendChild(img);
    } else if (media.type === 'video') {
        const video = document.createElement('video');
        video.src = media.src;
        video.controls = true;
        video.autoplay = true;
        video.style.borderRadius = '8px';
        lightboxContent.appendChild(video);
    }
    
    counter.textContent = `${currentLightboxIndex + 1} of ${mediaItems.length}`;
}

// Navigate to next media
function nextMedia() {
    displayMedia(currentLightboxIndex + 1);
}

// Navigate to previous media
function prevMedia() {
    displayMedia(currentLightboxIndex - 1);
}

// Close lightbox when clicking outside
document.addEventListener('click', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (event.key === 'ArrowLeft') {
            prevMedia();
        } else if (event.key === 'ArrowRight') {
            nextMedia();
        } else if (event.key === 'Escape') {
            closeLightbox();
        }
    }
});