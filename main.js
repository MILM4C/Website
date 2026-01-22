// ==================== MAIN APPLICATION LOGIC ====================

// DOM elements
const glitchOverlay = document.getElementById('glitchOverlay');
const glitchMessage = document.getElementById('glitchMessage');
const mainContainer = document.getElementById('mainContainer');
const fileContainer = document.getElementById('fileContainer');
const categoryItems = document.querySelectorAll('.categories li');
const searchInput = document.getElementById('searchInput');
const fileCount = document.getElementById('fileCount');
const fileModal = document.getElementById('fileModal');
const modalTitle = document.getElementById('modalTitle');
const fileContent = document.getElementById('fileContent');
const modalCategory = document.getElementById('modalCategory');
const modalClassification = document.getElementById('modalClassification');
const accessTime = document.getElementById('accessTime');
const closeModal = document.querySelector('.close-modal');

// Audio elements
const backgroundAudio = document.getElementById('backgroundAudio');
const fileClickAudio = document.getElementById('fileClickAudio');
const glitchAudio = document.getElementById('glitchAudio');
const glitchMusic = document.getElementById('glitchMusic');
const audioIndicator = document.getElementById('audioIndicator');

// State variables
let currentCategory = 'all';
let currentSearch = '';

// Ordered message sequence for glitch effect
const glitchMessages = [
    "I DON'T THINK SO",
    "YOU SHOULDN'T BE HERE",
    "SYSTEM BREACH DETECTED",
    "ERROR 404: REALITY NOT FOUND",
    "TERMINATING SESSION"
];

let currentMessageIndex = 0;
let glitchInterval;

// ==================== AUDIO CONTROL FUNCTIONS ====================

function initializeAudio() {
    // Set volumes
    backgroundAudio.volume = 0.4;
    fileClickAudio.volume = 0.3;
    glitchAudio.volume = 0.8;
    glitchMusic.volume = 0.6; // Lower volume for glitch music
    
    // Try to start background audio
    startBackgroundAudio();
}

function stopAllAudio() {
    console.log("🔇 Stopping all audio...");
    
    // Pause all audio elements
    backgroundAudio.pause();
    fileClickAudio.pause();
    glitchAudio.pause();
    
    // Reset audio times
    backgroundAudio.currentTime = 0;
    fileClickAudio.currentTime = 0;
    glitchAudio.currentTime = 0;
    
    // Hide audio indicator
    audioIndicator.style.display = 'none';
}

function playGlitchSequenceMusic() {
    // Stop all other audio first
    stopAllAudio();
    
    // Play the glitch music
    glitchMusic.currentTime = 0;
    glitchMusic.loop = true; // Make it loop
    
    const playPromise = glitchMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("🎵 Glitch music started");
        }).catch(error => {
            console.log("Glitch music error:", error);
            // Fallback: play the short glitch sound
            playGlitchSound();
        });
    }
}

function playFileClickSound() {
    // Don't play if glitch is active
    if (glitchOverlay.classList.contains('glitch-active')) return;
    
    fileClickAudio.currentTime = 0;
    const playPromise = fileClickAudio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            audioIndicator.style.display = 'flex';
            setTimeout(() => {
                audioIndicator.style.display = 'none';
            }, 1000);
        }).catch(error => {
            console.log("Click sound play error:", error);
        });
    }
}

function playGlitchSound() {
    glitchAudio.currentTime = 0;
    const playPromise = glitchAudio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("🔊 Glitch sound playing");
        }).catch(error => {
            console.log("Glitch sound error:", error);
        });
    }
}

function startBackgroundAudio() {
    // Don't start if glitch is active
    if (glitchOverlay.classList.contains('glitch-active')) return;
    
    const playPromise = backgroundAudio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("✅ Background audio started");
        }).catch(error => {
            console.log("Background audio autoplay prevented");
        });
    }
}

// ==================== GLITCH EFFECT FUNCTIONS ====================

function updateGlitchMessage() {
    // Update message text
    glitchMessage.textContent = glitchMessages[currentMessageIndex];
    
    // Add random effects for variety
    const effects = ['glitch', 'flicker', 'scramble'];
    glitchMessage.className = 'glitch-message';
    
    // Add random effect
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    glitchMessage.classList.add(randomEffect);
    
    // Random color variation
    const colors = ['#ff0000', '#ff3333', '#ff6666', '#ff0000'];
    glitchMessage.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    // Random scale variation
    const scale = 0.9 + Math.random() * 0.2;
    glitchMessage.style.transform = `scale(${scale})`;
    
    // Move to next message in sequence
    currentMessageIndex++;
    
    // If we've gone through all messages, stop the sequence
    if (currentMessageIndex >= glitchMessages.length) {
        clearInterval(glitchInterval);
        // Set final message
        glitchMessage.textContent = "ACCESS DENIED";
        glitchMessage.classList.add('glitch');
        glitchMessage.style.animation = 'glitch 2s infinite';
        
        // Fade out glitch music slowly
        fadeOutAudio(glitchMusic, 3000);
        
        // Make it impossible to go back
        document.body.style.overflow = 'hidden';
        
        // Disable all clicks
        document.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Add more glitch effects on any click
            document.body.style.backgroundColor = 
                `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
            glitchMessage.style.transform = 
                `scale(${0.8 + Math.random()*0.4}) rotate(${Math.random()*10 - 5}deg)`;
        });
        
        // Also disrupt keyboard
        document.addEventListener('keydown', function(e) {
            e.preventDefault();
            // Keep final message but add effects
            glitchMessage.style.color = 
                `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
            glitchMessage.style.textShadow = 
                `0 0 ${10 + Math.random()*20}px rgba(255, 0, 0, ${0.5 + Math.random()*0.5})`;
        });
    }
}

function fadeOutAudio(audioElement, duration) {
    const startVolume = audioElement.volume;
    const interval = 50; // ms
    const steps = duration / interval;
    const volumeStep = startVolume / steps;
    
    const fadeInterval = setInterval(() => {
        if (audioElement.volume > volumeStep) {
            audioElement.volume -= volumeStep;
        } else {
            audioElement.volume = 0;
            audioElement.pause();
            clearInterval(fadeInterval);
        }
    }, interval);
}

function triggerGlitchEffect() {
    console.log("🚨 Triggering glitch effect!");
    
    // Reset message index
    currentMessageIndex = 0;
    
    // Play initial glitch sound
    playGlitchSound();
    
    // Start glitch music
    setTimeout(() => {
        playGlitchSequenceMusic();
    }, 500);
    
    // Start the glitch sequence
    setTimeout(() => {
        // First stage: glitch the interface
        mainContainer.style.animation = 'glitch 0.5s linear';
        document.body.style.backgroundColor = '#ff0000';
        
        setTimeout(() => {
            mainContainer.style.filter = 'blur(5px)';
            document.body.style.backgroundColor = '#0000ff';
            
            setTimeout(() => {
                mainContainer.style.opacity = '0.5';
                document.body.style.backgroundColor = '#00ff00';
                
                setTimeout(() => {
                    // Hide main container
                    mainContainer.style.display = 'none';
                    
                    // Show glitch overlay
                    glitchOverlay.classList.add('glitch-active');
                    
                    // Start message sequence after overlay is shown
                    setTimeout(() => {
                        // Start with first message
                        glitchMessage.textContent = glitchMessages[0];
                        glitchMessage.classList.add('glitch', 'flicker');
                        
                        // Start cycling through messages
                        glitchInterval = setInterval(updateGlitchMessage, 1500);
                        
                    }, 500);
                    
                }, 500);
                
            }, 500);
            
        }, 500);
        
    }, 100);
}

// ==================== PROGRESS BAR FUNCTIONS ====================

function initializeProgressBar() {
    const progressPercentage = document.getElementById('progressPercentage');
    const progressFill = document.getElementById('progressFill');
    const progressLabel = document.getElementById('progressLabel');
    const filesProcessed = document.getElementById('filesProcessed');
    const dataAnalyzed = document.getElementById('dataAnalyzed');
    const timeElapsed = document.getElementById('timeElapsed');
    
    // Set values from progressData
    progressPercentage.textContent = `${progressData.currentProgress}%`;
    progressFill.style.width = `${progressData.currentProgress}%`;
    progressLabel.textContent = `${progressData.currentProgress}% done out of 100%`;
    filesProcessed.textContent = `${progressData.processedFiles}/${progressData.totalFiles}`;
    dataAnalyzed.textContent = `${progressData.analyzedData.toFixed(2)} TB / ${progressData.totalData.toFixed(1)} TB`;
    timeElapsed.textContent = progressData.timeElapsed;
    progressFill.style.transition = 'none';
}

// ==================== FILE SYSTEM FUNCTIONS ====================

function openFileModal(file) {
    // Check if this is the DAKA file
    if (file.isDaka) {
        // Trigger the glitch effect instead of showing modal
        triggerGlitchEffect();
        return;
    }
    
    // Normal file behavior
    playFileClickSound();
    
    modalTitle.textContent = file.title;
    fileContent.textContent = file.content;
    modalCategory.textContent = getCategoryDisplayName(file.category);
    modalClassification.textContent = file.classification;
    
    const now = new Date();
    accessTime.textContent = now.toLocaleString();
    
    fileModal.style.display = 'block';
}

function getCategoryDisplayName(category) {
    const categoryMap = {
        'project-0': 'Project 0',
        'current-army': 'Current Army',
        'corrupted': 'Corrupted'
    };
    return categoryMap[category] || category;
}

function filterFiles() {
    let filteredFiles = files;
    
    if (currentCategory !== 'all') {
        filteredFiles = filteredFiles.filter(file => file.category === currentCategory);
    }
    
    if (currentSearch) {
        filteredFiles = filteredFiles.filter(file => 
            file.title.toLowerCase().includes(currentSearch) || 
            file.description.toLowerCase().includes(currentSearch) ||
            file.tag.toLowerCase().includes(currentSearch)
        );
    }
    
    fileCount.textContent = filteredFiles.length;
    renderFiles(filteredFiles);
}

function renderFiles(filesToRender) {
    fileContainer.innerHTML = '';
    
    if (filesToRender.length === 0) {
        fileContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: #777777;">
                <i class="fas fa-file-excel" style="font-size: 4rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3>No classified files found</h3>
                <p>Adjust your search or category filter</p>
            </div>
        `;
        return;
    }
    
    filesToRender.forEach(file => {
        const fileCard = document.createElement('div');
        fileCard.className = `file-card ${file.category} ${file.isDaka ? 'daka-file' : ''}`;
        fileCard.innerHTML = `
            <div class="glow-effect"></div>
            <div class="classification">${file.classification}</div>
            <div class="file-icon">
                <i class="${file.icon}"></i>
            </div>
            <h3 class="file-title">${file.title}</h3>
            <p class="file-desc">${file.description}</p>
            <span class="file-tag">${file.tag}</span>
            <div class="file-meta">
                <span><i class="far fa-calendar"></i> ${file.date}</span>
                <span><i class="far fa-hdd"></i> ${file.size}</span>
            </div>
        `;
        
        fileCard.addEventListener('click', () => {
            openFileModal(file);
        });
        
        // Add hover effects
        fileCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        fileCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        fileContainer.appendChild(fileCard);
    });
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    // Category filter event listeners
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Don't respond if glitch is active
            if (glitchOverlay.classList.contains('glitch-active')) return;
            
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            currentCategory = item.getAttribute('data-category');
            filterFiles();
        });
    });

    // Search input event listener
    searchInput.addEventListener('input', (e) => {
        // Don't respond if glitch is active
        if (glitchOverlay.classList.contains('glitch-active')) return;
        
        currentSearch = e.target.value.toLowerCase();
        filterFiles();
    });

    // Modal close handlers
    closeModal.addEventListener('click', () => {
        // Don't respond if glitch is active
        if (glitchOverlay.classList.contains('glitch-active')) return;
        
        fileModal.style.display = 'none';
        playFileClickSound();
    });

    window.addEventListener('click', (e) => {
        if (e.target === fileModal) {
            // Don't respond if glitch is active
            if (glitchOverlay.classList.contains('glitch-active')) return;
            
            fileModal.style.display = 'none';
            playFileClickSound();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fileModal.style.display === 'block') {
            // Don't respond if glitch is active
            if (glitchOverlay.classList.contains('glitch-active')) return;
            
            fileModal.style.display = 'none';
            playFileClickSound();
        }
    });

    // Audio interaction listeners - only if glitch is not active
    document.addEventListener('click', function() {
        if (!glitchOverlay.classList.contains('glitch-active')) {
            startBackgroundAudio();
        }
    });
    
    document.addEventListener('keydown', function() {
        if (!glitchOverlay.classList.contains('glitch-active')) {
            startBackgroundAudio();
        }
    });
    
    document.addEventListener('mousemove', function() {
        if (!glitchOverlay.classList.contains('glitch-active')) {
            startBackgroundAudio();
        }
    });
}

// ==================== INITIALIZATION ====================

function initializeApp() {
    console.log("🚀 Initializing Children of Cozbi Archive...");
    
    // Initialize systems
    initializeAudio();
    initializeProgressBar();
    setupEventListeners();
    
    // Initial render
    renderFiles(files);
    
    console.log("✅ Archive system ready");
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Also try when page is fully loaded
window.addEventListener('load', function() {
    setTimeout(startBackgroundAudio, 1000);
});