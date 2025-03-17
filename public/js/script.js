const bgMusic = document.getElementById('bgMusic');
const crystalSound = document.getElementById('crystalSound');
const fortuneRevealSound = document.getElementById('fortuneRevealSound');
const toggleSoundBtn = document.getElementById('toggleSound');
const soundOnIcon = toggleSoundBtn.querySelector('.sound-on');
const soundOffIcon = toggleSoundBtn.querySelector('.sound-off');

const crystalBall = document.getElementById('crystalBall');
const fortuneElement = document.getElementById('fortune');
const toggleFormBtn = document.getElementById('toggleFormBtn');
const addFortuneContainer = document.getElementById('addFortuneContainer');
const addFortuneForm = document.getElementById('addFortuneForm');
const fortuneText = document.getElementById('fortuneText');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

let soundEnabled = true;
let pageInteracted = false;

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
    "Your future holds many surprises. Most of them involve tacos.",
    "The stars suggest you should probably check your spam folder.",
    "A mysterious stranger will enter your life. They just want to borrow your phone charger.",
    "Great success awaits you! But it got stuck in traffic, so it might be a while.",
    "You will find something you lost. It was in the refrigerator all along.",
    "Your lucky number is ERROR: NUMBER_NOT_FOUND.",
    "Beware of Tuesdays. Also Mondays. Wednesdays are questionable too.",
    "The universe has a message for you: 'New phone, who dis?'",
    "Your pet secretly judges your music taste.",
    "You will live a long life and eventually master the art of parallel parking.",
    "An unexpected financial windfall is coming. Check your couch cushions.",
    "Your future self is facepalming at a decision you're about to make.",
    "The alignment of the planets suggests you should finally clean out your junk drawer.",
    "Success is just around the corner! No, not that corner. The other one.",
    "You will soon embark on a journey to the refrigerator.",
    "That thing you're overthinking? Yeah, it's going to be fine.",
    "Your soulmate is out there... probably also looking at useless websites.",
    "You are admired for your spreadsheet skills more than you know.",
    "The cosmic forces suggest you should try that weird food combination you've been thinking about.",
    "Your future is cloudy. Have you tried turning it off and on again?",
    "You will soon discover the secret to happiness involves naps.",
    "A thrilling adventure awaits—mostly scrolling through memes.",
    "Today is the perfect day to do absolutely nothing.",
    "Trust your instincts, unless you're hungry, then trust pizza.",
    "Your wifi signal is stronger than your willpower.",
    "You’ll meet someone who appreciates your bad jokes.",
    "An amazing opportunity will arise—probably related to snacks.",
    "Your next haircut will either be amazing or a character-building experience.",
    "The fortune cookie gods suggest buying new socks.",
    "Tomorrow will be productive if you redefine 'productive.'",
    "Your dream job involves being paid to procrastinate.",
    "Prepare yourself—someone will ask for your Netflix password.",
    "You'll soon conquer something big—probably the laundry pile.",
    "A magical moment is coming, but you might accidentally nap through it.",
    "Trust the process, especially if the process involves snacks.",
    "You will discover a hidden talent for finding free wifi.",
    "You'll soon receive a sign—most likely a low battery warning.",
    "Great wisdom comes to those who binge-watch responsibly.",
    "You will make a difference, primarily by accidentally replying 'reply all.'",
    "Today’s lucky color is transparent.",
    "You will unlock new levels of laziness previously thought impossible.",
    "The future is bright, mostly due to your screen brightness settings.",
    "An old acquaintance will soon reappear, mainly in your notifications.",
    "Your biggest achievement this month will involve remembering passwords.",
    "Adventure is coming—mostly by opening the fridge repeatedly.",
    "Someone admires your playlist secretly from afar.",
    "Expect surprises, especially when opening that questionable leftover container.",
    "You'll soon master a completely unnecessary skill, and it will be glorious.",
    "You will find clarity in life, probably after cleaning your glasses.",
    "Great ideas await you at 3 AM; write them down and regret them tomorrow.",
    "A pleasant surprise awaits you—someone already charged your devices.",
    "You'll soon find inner peace, most likely after your phone dies.",
    "Your next great discovery involves figuring out the microwave buttons.",
    "Happiness is closer than you think—it’s in the snack aisle.",
    "The stars see everything, including your questionable search history.",
    "Something amazing is about to happen—unless you nap through it again.",
    "A forgotten password holds the key to your destiny.",
    "Your life is a series of fascinating adventures—mostly grocery shopping.",
    "Expect a sudden burst of inspiration, immediately followed by procrastination.",
    "An old friend will surprise you—mostly by liking an old post.",
    "You’re about to make a great discovery—probably a new meme.",
    "You'll receive unexpected recognition—your WiFi password gets leaked.",
    "You’ll soon achieve enlightenment, primarily about pizza toppings.",
    "The secret to happiness involves not setting morning alarms.",
    "Your life will soon be filled with joy, or at least snacks.",
    "Great success is on the horizon—if you squint hard enough.",
    "Beware: your browser tabs are plotting against you.",
    "You will soon find out someone envies your comfy pajamas.",
    "The key to your future is realizing keys are usually in your pocket.",
    "Your luck will improve drastically after changing your ringtone.",
    "You'll soon encounter unexpected wealth—someone else’s penny jar.",
    "Life holds infinite possibilities, most involve dessert.",
    "Adventure awaits, but first, more coffee.",
    "Your most productive hour today will be spent rearranging apps.",
    "You will soon uncover the secret of life—it’s probably WiFi.",
    "Expect compliments—mostly from your delivery apps.",
    "Your day will improve significantly after you locate your charger.",
    "You will soon learn something useful from an unskippable ad.",
    "Your hidden talent is opening jars nobody else can.",
    "A life-changing experience awaits—probably just a software update.",
    "You'll soon impress someone accidentally, mostly with trivia.",
    "You’re about to make a groundbreaking decision: order pizza or tacos.",
    "Expect to meet your greatest ally—auto-save.",
    "Today is the day you finally figure out the TV remote.",
    "You will soon stumble upon unexpected fortune: bonus fries.",
    "Your day will dramatically improve after you stop dropping your phone on your face.",
    "You'll soon find joy—mostly by ignoring your unread emails.",
    "The universe predicts you're overdue for a nap.",
    "You're about to make a brilliant discovery—how to sleep anywhere."
];


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
    
    if (localStorage.getItem('fortuneTellerSoundEnabled') === 'false') {
        soundEnabled = false;
        soundOnIcon.style.display = 'none';
        soundOffIcon.style.display = 'block';
    }
    
    document.addEventListener('click', initiateAudio);
    document.addEventListener('touchstart', initiateAudio);
    
    toggleSoundBtn.addEventListener('click', () => {
        toggleSounds();
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