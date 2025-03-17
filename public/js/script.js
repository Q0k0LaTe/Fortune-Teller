const bgMusic = document.getElementById('bgMusic');
const crystalSound = document.getElementById('crystalSound');
const fortuneRevealSound = document.getElementById('fortuneRevealSound');
const toggleSoundBtn = document.getElementById('toggleSound');
const soundOnIcon = toggleSoundBtn.querySelector('.sound-on');
const soundOffIcon = toggleSoundBtn.querySelector('.sound-off');
const toggleThemeBtn = document.getElementById('toggleTheme');
const lightThemeIcon = toggleThemeBtn.querySelector('.light-theme');
const darkThemeIcon = toggleThemeBtn.querySelector('.dark-theme');

const crystalBall = document.getElementById('crystalBall');
const fortuneElement = document.getElementById('fortune');
const toggleFormBtn = document.getElementById('toggleFormBtn');
const addFortuneContainer = document.getElementById('addFortuneContainer');
const addFortuneForm = document.getElementById('addFortuneForm');
const fortuneText = document.getElementById('fortuneText');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const aboutBtn = document.getElementById('aboutBtn');
const aboutModal = document.getElementById('aboutModal');
const closeBtn = document.querySelector('.close-btn');

let soundEnabled = true;
let pageInteracted = false;
let lightMode = false;

function createStars() {
    const starsCount = 100;
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('stars');
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        star.style.animationDelay = `${Math.random() * 2}s`;
        
        document.body.appendChild(star);
    }
}

function createSparkleEffect(element) {
    element.addEventListener('mousemove', (e) => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left + (Math.random() * 10 - 5);
        const y = e.clientY - rect.top + (Math.random() * 10 - 5);
        
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        
        const colors = ['#fff', '#f0f8ff', '#e6e6fa', '#b0e0e6', '#add8e6'];
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const size = Math.random() * 4 + 2;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        
        element.appendChild(sparkle);
        
        sparkle.style.animation = `fade-out ${Math.random() * 0.5 + 0.5}s forwards`;
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    });
}

let fortunes = [
    "A journey of a thousand miles begins with a single step. Your next step will lead to unexpected opportunities.",
    "The stars align in your favor. A long-awaited wish will soon be fulfilled.",
    "Your path is illuminated by the light of those who came before you. Seek wisdom from elders.",
    "Like the phoenix, you will rise from the ashes of past challenges to achieve new heights.",
    "The river of life has many bends. Navigate the coming changes with patience and grace.",
    "A mysterious stranger will enter your life, bringing valuable lessons and new perspectives.",
    "Ancient wisdom surrounds you. Open your mind to receive messages from beyond the veil.",
    "The moon reveals what the sun conceals. Trust your intuition in matters of the heart.",
    "Soon, the veil between worlds will thin, allowing you to perceive truths previously hidden.",
    "The energy you put into the universe returns threefold. Be mindful of your intentions.",
    "A door closes, but a window opens. Embrace the change that approaches.",
    "Your aura glows with potential. This is the time to pursue your deepest passions.",
    "The threads of fate are weaving a tapestry of prosperity around you. Abundance approaches.",
    "Cosmic forces align to guide you toward your true purpose. Listen carefully to signs and symbols.",
    "An unexpected gift will arrive when you need it most. Be open to receiving.",
    "The answers you seek are written in the stars. Look up and find your guidance.",
    "Like the moon's phases, your life cycles through periods of darkness and light. Illumination comes soon.",
    "Ancient spirits watch over your journey. You are protected during this time of transition.",
    "The oracle sees success in your future endeavors, especially those begun under the new moon.",
    "A challenge approaches that will test your resolve, but will ultimately lead to great reward.",
    "Trust the whispers of your soul. Your inner voice guides you toward your highest good.",
    "The mists part to reveal a path previously unseen. Follow it with courage.",
    "Three signs will appear in the coming days. Heed their message carefully.",
    "The celestial alignment favors new beginnings. Plant the seeds of your desires now.",
    "A karmic debt is being repaid. Accept the blessings that come your way with gratitude.",
    "Your ancestors stand beside you, offering strength for the journey ahead.",
    "The crystal reveals that someone from your past will reenter your life with important news.",
    "A decision approaches at the crossroads. Choose the path that resonates with your spirit.",
    "Healing energy surrounds you. Old wounds will soon find resolution and peace.",
    "The wheel of fortune turns in your favor. Prosperity and abundance flow toward you.",
    "A powerful transformation awaits. Embrace the metamorphosis with an open heart.",
    "The sands of time reveal patterns hidden to most. Your perspective will soon broaden.",
    "Dreams hold the key to your current questions. Pay attention to symbols that repeat.",
    "Like water, you must learn to flow around obstacles rather than struggle against them.",
    "Your spiritual guides are especially close during this time. Listen for their guidance.",
    "The next full moon brings revelations that will illuminate your path forward.",
    "Sacred geometry surrounds your life journey. Trust in the divine order of things.",
    "An unexpected mentor will appear to help you master an important skill or knowledge.",
    "The cards reveal a period of good fortune approaching. Prepare to receive blessings.",
    "Trust in the universe's timing. What seems delayed is actually perfectly orchestrated.",
    "Ancient wisdom whispers: that which you seek is also seeking you.",
    "The cosmic mirror reflects your inner state. Cultivate peace within to find it without.",
    "A significant dream will soon provide the answers you've been searching for.",
    "The elements align to support your creative endeavors. Now is the time to manifest.",
    "Your aura reveals untapped potential waiting to be discovered and channeled.",
    "A test of character approaches. Your integrity will determine the outcome.",
    "The energy of the universe flows through you. Harness it to manifest your desires.",
    "You stand at a threshold of great change. Cross it with courage and faith.",
    "Synchronicities around you are not coincidence but cosmic communication. Pay attention.",
    "The oracle sees a gathering of kindred spirits in your near future. Important connections will be made.",
    "Your spirit animal appears during times of need. Look for its guidance now.",
    "The crystal ball shows clarity emerging from confusion. Patience will be rewarded.",
    "Ancient knowledge awakens within you. Trust the wisdom of your bloodline.",
    "The signs point to a period of rest and reflection before a significant breakthrough.",
    "A long-held wish nears manifestation. Continue to nurture it with positive energy.",
    "The mystical forces reveal that a skill from your past will serve an unexpected purpose.",
    "The cosmic dance brings someone special into your orbit. Be open to new connections.",
    "Pay attention to recurring numbers and symbols. The universe is speaking directly to you.",
    "Your energy field attracts what you focus upon. Direct your thoughts toward your highest aspirations.",
    "A sacred contract made before this lifetime is about to be fulfilled.",
    "The veil thins to show you glimpses of your highest potential. Believe in what you see.",
    "Trust in the ebb and flow of life. What recedes now will return stronger when the time is right.",
    "The oracle sees a revelation approaching that will change your understanding of recent events.",
    "Ancestral wisdom flows through your veins. You already know the answer you seek.",
    "Three paths will present themselves. Choose the one that brings peace to your spirit.",
    "The constellation of your birth shines brightly now, enhancing your natural talents.",
    "A soul connection deepens, bridging past and future in perfect harmony.",
    "The mystical eye sees abundance flowing toward you. Open your hands to receive."
];

function toggleTheme() {
    lightMode = !lightMode;
    
    if (lightMode) {
        document.body.classList.add('light-mode');
        lightThemeIcon.style.display = 'none';
        darkThemeIcon.style.display = 'block';
    } else {
        document.body.classList.remove('light-mode');
        lightThemeIcon.style.display = 'block';
        darkThemeIcon.style.display = 'none';
    }
    
    localStorage.setItem('fortuneTellerLightMode', lightMode);
}

async function fetchFortunes() {
    try {
        const response = await fetch('/api/fortunes');
        if (response.ok) {
            const serverFortunes = await response.json();
            if (serverFortunes && serverFortunes.length > 0) {
                fortunes = [...fortunes, ...serverFortunes];
            }
            console.log(`Loaded ${serverFortunes.length} user-submitted fortunes`);
        }
    } catch (error) {
        console.error('Error fetching fortunes:', error);
    }
}

function toggleSounds() {
    soundEnabled = !soundEnabled;
    
    if (soundEnabled) {
        soundOnIcon.style.display = 'block';
        soundOffIcon.style.display = 'none';
        
        if (pageInteracted) {
            bgMusic.play();
        }
    } else {
        soundOnIcon.style.display = 'none';
        soundOffIcon.style.display = 'block';
        
        bgMusic.pause();
        crystalSound.pause();
        fortuneRevealSound.pause();
    }
    
    localStorage.setItem('fortuneTellerSoundEnabled', soundEnabled);
}

function initiateAudio() {
    if (!pageInteracted) {
        pageInteracted = true;
        
        if (soundEnabled) {
            bgMusic.volume = 0.3; 
            bgMusic.play();
        }
        
        document.removeEventListener('click', initiateAudio);
        document.removeEventListener('touchstart', initiateAudio);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createStars();
    fetchFortunes();
    createSparkleEffect(crystalBall);
    
    // Check saved preferences
    if (localStorage.getItem('fortuneTellerSoundEnabled') === 'false') {
        soundEnabled = false;
        soundOnIcon.style.display = 'none';
        soundOffIcon.style.display = 'block';
    }
    
    if (localStorage.getItem('fortuneTellerLightMode') === 'true') {
        lightMode = true;
        document.body.classList.add('light-mode');
        lightThemeIcon.style.display = 'none';
        darkThemeIcon.style.display = 'block';
    }
    
    document.addEventListener('click', initiateAudio);
    document.addEventListener('touchstart', initiateAudio);
    
    toggleSoundBtn.addEventListener('click', () => {
        toggleSounds();
    });
    
    toggleThemeBtn.addEventListener('click', () => {
        toggleTheme();
        
        if (soundEnabled) {
            crystalSound.currentTime = 0;
            crystalSound.volume = 0.3;
            crystalSound.play();
        }
    });
    
    // About modal functionality
    aboutBtn.addEventListener('click', () => {
        aboutModal.style.display = 'block';
        
        if (soundEnabled) {
            crystalSound.currentTime = 0;
            crystalSound.volume = 0.3;
            crystalSound.play();
        }
    });
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        aboutModal.style.display = 'none';
    });
    
    // Close when clicking outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === aboutModal) {
            aboutModal.style.display = 'none';
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && aboutModal.style.display === 'block') {
            aboutModal.style.display = 'none';
        }
    });
    
    crystalBall.addEventListener('click', () => {
        if (window.fortuneResetTimer) {
            clearTimeout(window.fortuneResetTimer);
        }
        
        if (window.fortuneRevealTimer) {
            clearTimeout(window.fortuneRevealTimer);
        }
        
        crystalBall.classList.add('active');
        fortuneElement.style.opacity = 0;
        
        if (soundEnabled) {
            crystalSound.currentTime = 0;
            crystalSound.play();
        }
        
        setTimeout(() => {
            const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            fortuneElement.textContent = randomFortune;
            
            setTimeout(() => {
                fortuneElement.style.opacity = 1;
                
                if (soundEnabled) {
                    fortuneRevealSound.currentTime = 0;
                    fortuneRevealSound.play();
                }
                
                window.fortuneResetTimer = setTimeout(() => {
                    crystalBall.classList.remove('active');
                    fortuneElement.style.opacity = 0;
                }, 15000);
            }, 500);
        }, 1000);
    });
    
    toggleFormBtn.addEventListener('click', () => {
        if (addFortuneContainer.style.display === 'none') {
            addFortuneContainer.style.display = 'block';
            toggleFormBtn.textContent = 'Hide Form';
            addFortuneContainer.scrollIntoView({ behavior: 'smooth' });
            
            if (soundEnabled) {
                crystalSound.currentTime = 0;
                crystalSound.volume = 0.3;
                crystalSound.play();
                setTimeout(() => {
                    crystalSound.volume = 1.0; 
                }, 300);
            }
        } else {
            addFortuneContainer.style.display = 'none';
            toggleFormBtn.textContent = 'Add Your Own Fortune';
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
        }
    });
    
    addFortuneForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        const fortuneTextValue = fortuneText.value.trim();
        
        if (fortuneTextValue.length < 10) {
            errorMessage.textContent = 'Fortune must be at least 10 characters long';
            errorMessage.style.display = 'block';
            return;
        }
        
        try {
            const response = await fetch('/api/fortunes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: fortuneTextValue })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                if (soundEnabled) {
                    fortuneRevealSound.currentTime = 0;
                    fortuneRevealSound.play();
                }
                
                successMessage.textContent = data.message || 'Your fortune has been added!';
                successMessage.style.display = 'block';
                fortuneText.value = '';
                
                fortunes.push(fortuneTextValue);
            } else {
                errorMessage.textContent = data.error || 'Error submitting fortune. Please try again.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error submitting fortune:', error);
            errorMessage.textContent = 'Connection error. Please try again later.';
            errorMessage.style.display = 'block';
        }
    });
});