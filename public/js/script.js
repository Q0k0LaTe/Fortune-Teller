const bgMusic = document.getElementById('bgMusic');
const crystalSound = document.getElementById('crystalSound');
const fortuneRevealSound = document.getElementById('fortuneRevealSound');
const toggleSoundBtn = document.getElementById('toggleSound');
const soundOnIcon = toggleSoundBtn.querySelector('.sound-on');
const soundOffIcon = toggleSoundBtn.querySelector('.sound-off');
const toggleThemeBtn = document.getElementById('toggleTheme');
const lightThemeIcon = toggleThemeBtn.querySelector('.light-theme');
const darkThemeIcon = toggleThemeBtn.querySelector('.dark-theme');
const toggleLanguageBtn = document.getElementById('toggleLanguage');
const englishLangIcon = toggleLanguageBtn.querySelector('.english-lang');
const chineseLangIcon = toggleLanguageBtn.querySelector('.chinese-lang');

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
const toggleQuestionBtn = document.getElementById('toggleQuestionBtn');
const askQuestionContainer = document.getElementById('askQuestionContainer');
const askQuestionForm = document.getElementById('askQuestionForm');
const questionText = document.getElementById('questionText');
const answerText = document.getElementById('answerText');
const loadingIndicator = document.getElementById('loadingIndicator');

let soundEnabled = true;
let pageInteracted = false;
let lightMode = false;
let chineseMode = false;

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

let chineseFortunes = [
    "千里之行始于足下。你的下一步将带来意想不到的机会。",
    "星辰与你同行。长久以来的心愿即将实现。",
    "你的道路被先人之光照亮。向长者寻求智慧。",
    "如凤凰一般，你将从过去的挑战中崛起，达到新的高度。",
    "生命之河有许多弯曲。以耐心和优雅引导即将到来的变化。",
    "一位神秘的陌生人将进入你的生活，带来宝贵的教训和新的视角。",
    "古老的智慧环绕着你。敞开心扉接收来自帷幕彼岸的讯息。",
    "月亮揭示太阳所隐藏的。在心灵事务上信任你的直觉。",
    "不久，世界之间的帷幕将变薄，让你感知以前隐藏的真相。",
    "你投入宇宙的能量会三倍返还。留意你的意图。",
    "一扇门关闭，但一扇窗户打开。拥抱即将到来的变化。",
    "你的灵光充满潜力。现在是追求你最深切热情的时候。",
    "命运之线正在你周围编织繁荣的锦缎。丰足正在接近。",
    "宇宙力量引导你走向真正的目标。仔细聆听征兆和符号。",
    "意外的礼物将在你最需要的时刻到来。敞开心扉接收。",
    "你寻求的答案写在星星上。抬头寻找你的指引。",
    "如同月相，你的生活在黑暗和光明的周期中循环。光明即将到来。",
    "古老的灵魂守护着你的旅程。在这个转变时期你受到保护。",
    "预言家看到你未来的努力会成功，尤其是在新月下开始的那些。",
    "一个挑战即将到来，将测试你的决心，但最终将带来巨大的回报。",
    "相信你灵魂的低语。你的内心声音引导你走向最高的善。",
    "迷雾散开，揭示一条以前看不见的路径。勇敢地跟随它。",
    "未来几天将出现三个征兆。仔细留意他们的讯息。",
    "天体对齐有利于新的开始。现在播下你渴望的种子。",
    "业力债务正在偿还。怀着感恩接受即将到来的祝福。",
    "你的祖先站在你身边，为前方的旅程提供力量。",
    "水晶揭示你过去的某人将带着重要消息重新进入你的生活。",
    "十字路口的决定即将到来。选择与你的灵魂共鸣的路径。",
    "治愈能量环绕着你。旧伤即将找到解决和平静。",
    "命运之轮转向对你有利。繁荣和丰盛向你流动。",
    "一个强大的转变等待着你。以开放的心拥抱这种蜕变。",
    "时间之沙揭示了大多数人看不见的模式。你的视角即将拓宽。",
    "梦境是你当前问题的钥匙。注意重复出现的符号。",
    "像水一样，你必须学会绕过障碍，而不是与之抗争。",
    "你的精神向导在此时特别接近。倾听他们的指引。",
    "下一个满月带来的启示将照亮你前进的道路。",
    "神圣几何围绕着你的生命旅程。相信事物的神圣秩序。",
    "一位意外的导师将出现，帮助你掌握重要的技能或知识。",
    "卡片揭示了即将到来的好运。准备接受祝福。",
    "相信宇宙的时机。看似延迟的事实际上是完美编排的。",
    "古老的智慧低语：你所寻求的也在寻求你。",
    "宇宙镜子反映你的内在状态。培养内在和平以在外界找到和平。",
    "一个重要的梦即将提供你一直在寻找的答案。",
    "元素对齐支持你的创造性努力。现在是实现的时候。",
    "你的灵光揭示了等待被发现和引导的未开发潜力。",
    "性格的考验即将到来。你的诚信将决定结果。",
    "宇宙的能量流经你。利用它来实现你的愿望。",
    "你站在巨变的门槛。带着勇气和信心跨过它。",
    "你周围的同步性不是巧合，而是宇宙的交流。请注意。",
    "预言家看到你不远的将来会有志同道合的人聚集。重要的联系将会建立。",
    "你的精神动物在需要时出现。现在寻找它的指引。",
    "水晶球显示清晰正从混乱中浮现。耐心将得到回报。",
    "古老的知识在你内心觉醒。相信你血脉的智慧。",
    "征兆指向一个休息和反思的时期，之后将有重大突破。",
    "长久以来的愿望即将实现。继续用积极能量滋养它。",
    "神秘力量揭示你过去的技能将服务于意想不到的目的。",
    "宇宙之舞将特别的人带入你的轨道。对新联系保持开放。",
    "注意反复出现的数字和符号。宇宙正直接对你说话。",
    "你的能量场吸引你所关注的。将你的思想指向你的最高愿望。",
    "一个在此生之前做出的神圣契约即将实现。",
    "帷幕变薄，向你展示你最高潜能的glimpses。相信你所见。",
    "相信生命的起伏。现在退去的将在适当的时候更强大地返回。",
    "预言家看到一个即将到来的启示，将改变你对近期事件的理解。",
    "祖先的智慧流淌在你的血脉中。你已经知道你寻求的答案。",
    "三条路径将呈现。选择为你的灵魂带来平静的那条。",
    "你出生的星座现在明亮闪耀，增强你的自然才华。",
    "灵魂连接加深，完美和谐地连接过去和未来。",
    "神秘之眼看到丰盛向你流动。张开手接收。"
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

function toggleLanguage() {
    chineseMode = !chineseMode;
    
    if (chineseMode) {
        englishLangIcon.style.display = 'none';
        chineseLangIcon.style.display = 'block';
        document.body.classList.add('chinese-mode'); // Add this line
        updateUILanguage('zh');
    } else {
        englishLangIcon.style.display = 'block';
        chineseLangIcon.style.display = 'none';
        document.body.classList.remove('chinese-mode'); // Add this line
        updateUILanguage('en');
    }
    
    localStorage.setItem('fortuneTellerLanguage', chineseMode);
}

function updateUILanguage(lang) {
    const translations = {
        'en': {
            'title': 'The Mysterious Fortune Teller',
            'instructions': 'Click the crystal ball to reveal your fortune...',
            'addFortuneBtn': 'Add Your Own Fortune',
            'hideFormBtn': 'Hide Form',
            'askQuestionBtn': 'Ask a Question',
            'hideQuestionBtn': 'Hide Question Form',
            'aboutBtn': 'About',
            'addFortuneTitle': 'Add Your Own Fortune',
            'fortunePlaceholder': 'Write your mystical fortune here... (minimum 10 characters)',
            'submitBtn': 'Submit Fortune',
            'successMsg': 'Your fortune has been added!',
            'askQuestionTitle': 'Ask the Mystic Oracle',
            'questionPlaceholder': 'Ask your question to the mystic oracle... (minimum 5 characters)',
            'seekAnswerBtn': 'Seek Answer',
            'loadingText': 'Consulting the cosmic forces...',
            
            // About modal translations
            'aboutTitle': 'About The Mysterious Fortune Teller',
            'aboutIntro': 'Welcome to The Mysterious Fortune Teller, an interactive mystical experience that provides insights through a beautifully designed crystal ball interface.',
            'howItWorks': 'How It Works',
            'howItWorksDesc': 'Simply click on the crystal ball to receive a random fortune from our diverse collection. The crystal ball will glow and reveal your mystical message.',
            'featuresTitle': 'Features',
            'features': [
                'Interactive Crystal Ball with magical effects',
                'Random fortune generation from a diverse collection',
                'Add your own fortunes to the collection',
                'Ask personal questions to the Mystic Oracle',
                'Immersive audio experience',
                'Dark/Light theme toggle',
                'English/Chinese language switch',
                'Responsive design for all devices'
            ],
            'versionTitle': 'Version History',
            'versions': [
                'Initial version with basic functionality',
                'Fixed bugs related to fortune display timers',
                'Added background music and interactive sound effects',
                'First official release',
                'Added light mode',
                'Added Q&A fortune-teller mode',
                'Added Chinese mode',
                'Fixed Bugs'
            ],
            'features_v03': [
                'Magical background ambience',
                'Crystal ball click sounds',
                'Fortune reveal sound effects',
                'Sound toggle controls'
            ],
            'features_v10': [
                'Added About button and information modal',
                'Improved UI responsiveness',
                'Enhanced crystal ball animation effects'
            ],
            'features_v11': [
                'Added switch light/dark mode button'
            ],
            'features_v21': [
                'Driven by DeepSeek V3 model',
                'Added new UI design'
            ],
            'features_v22': [
                'New button to switch between languages',
                'Added new UI design'
            ],
            'features_v221': [
                'Fixed the bug that "about" is still English when switched to Chinese mode',
                'Fixed the bug of version appearance',
                'Fixed the bug where Chinese fonts are not showing'
            ],
            'creatorTitle': 'Created By',
            'versionInfo': 'Version'
        },
        'zh': {
            'title': '神秘的占卜师',
            'instructions': '点击水晶球查看你的命运...',
            'addFortuneBtn': '添加你的占卜',
            'hideFormBtn': '隐藏表单',
            'askQuestionBtn': '提问问题',
            'hideQuestionBtn': '隐藏问题表单',
            'aboutBtn': '关于',
            'addFortuneTitle': '添加你的占卜',
            'fortunePlaceholder': '在这里写下你的神秘占卜... (最少10个字符)',
            'submitBtn': '提交占卜',
            'successMsg': '你的占卜已添加！',
            'askQuestionTitle': '向神秘预言家提问',
            'questionPlaceholder': '向神秘预言家提出你的问题... (最少5个字符)',
            'seekAnswerBtn': '寻求答案',
            'loadingText': '正在咨询宇宙力量...',
            
            // About modal translations
            'aboutTitle': '关于神秘的占卜师',
            'aboutIntro': '欢迎来到神秘的占卜师，这是一个通过精美设计的水晶球界面提供洞察力的互动神秘体验。',
            'howItWorks': '如何使用',
            'howItWorksDesc': '只需点击水晶球，即可从我们多样化的收藏中收到随机占卜。水晶球会发光并揭示你的神秘信息。',
            'featuresTitle': '功能特点',
            'features': [
                '带有魔法效果的互动水晶球',
                '多样化收藏的随机占卜生成',
                '添加你自己的占卜到收藏中',
                '向神秘预言家提问',
                '沉浸式音频体验',
                '深色/浅色主题切换',
                '英文/中文语言切换',
                '适应各种设备的响应式设计'
            ],
            'versionTitle': '版本历史',
            'versions': [
                '初始版本，具有基本功能',
                '修复与占卜显示计时器相关的错误',
                '添加背景音乐和互动音效',
                '首个正式发布版本',
                '添加浅色模式',
                '添加问答占卜模式',
                '添加中文模式',
                '修复错误'
            ],
            'features_v03': [
                '神秘背景氛围',
                '水晶球点击音效',
                '占卜揭示音效',
                '声音开关控制'
            ],
            'features_v10': [
                '添加关于按钮和信息模态框',
                '改进UI响应性',
                '增强水晶球动画效果'
            ],
            'features_v11': [
                '添加深色/浅色模式切换按钮'
            ],
            'features_v21': [
                '由DeepSeek V3模型驱动',
                '添加新的UI设计'
            ],
            'features_v22': [
                '新增语言切换按钮',
                '添加新的UI设计'
            ],
            'features_v221': [
                '修复切换到中文模式时"关于"仍为英文的错误',
                '修复版本显示的错误',
                '修复中文字体不显示的错误'
            ],
            'creatorTitle': '创作者',
            'versionInfo': '版本'
        }
    };
    
    // Update basic UI elements
    document.querySelector('h1').textContent = translations[lang].title;
    document.querySelector('.instructions').textContent = translations[lang].instructions;
    
    // Update buttons
    if (toggleFormBtn) {
        toggleFormBtn.textContent = addFortuneContainer.style.display === 'none' ? 
            translations[lang].addFortuneBtn : translations[lang].hideFormBtn;
    }
    
    if (toggleQuestionBtn) {
        toggleQuestionBtn.textContent = askQuestionContainer.style.display === 'none' ? 
            translations[lang].askQuestionBtn : translations[lang].hideQuestionBtn;
    }
    
    if (aboutBtn) {
        aboutBtn.textContent = translations[lang].aboutBtn;
    }
    
    // Update add fortune form
    if (addFortuneContainer) {
        addFortuneContainer.querySelector('h2').textContent = translations[lang].addFortuneTitle;
        fortuneText.placeholder = translations[lang].fortunePlaceholder;
        addFortuneForm.querySelector('button').textContent = translations[lang].submitBtn;
        successMessage.textContent = translations[lang].successMsg;
    }
    
    // Update ask question form
    if (askQuestionContainer) {
        askQuestionContainer.querySelector('h2').textContent = translations[lang].askQuestionTitle;
        questionText.placeholder = translations[lang].questionPlaceholder;
        askQuestionForm.querySelector('button').textContent = translations[lang].seekAnswerBtn;
        loadingIndicator.querySelector('p').textContent = translations[lang].loadingText;
    }
    
    // Update about modal content
    document.querySelector('.about-title').textContent = translations[lang].aboutTitle;
    document.querySelector('.about-intro').textContent = translations[lang].aboutIntro;
    document.querySelector('.how-it-works').textContent = translations[lang].howItWorks;
    document.querySelector('.how-it-works-desc').textContent = translations[lang].howItWorksDesc;
    document.querySelector('.features-title').textContent = translations[lang].featuresTitle;
    document.querySelector('.version-title').textContent = translations[lang].versionTitle;
    document.querySelector('.creator-title').textContent = translations[lang].creatorTitle;
    
    // Update features list
    const featureItems = document.querySelectorAll('.features-list .feature');
    for (let i = 0; i < featureItems.length; i++) {
        featureItems[i].textContent = translations[lang].features[i];
    }
    
    // Update version descriptions
    const versionDescs = document.querySelectorAll('.version-list > li > .version-desc');
    for (let i = 0; i < versionDescs.length; i++) {
        versionDescs[i].textContent = translations[lang].versions[i];
    }
    
    // Update feature descriptions for each version
    const featureV03 = document.querySelectorAll('.version-list > li:nth-child(3) ul .feature-desc');
    for (let i = 0; i < featureV03.length; i++) {
        featureV03[i].textContent = translations[lang].features_v03[i];
    }
    
    const featureV10 = document.querySelectorAll('.version-list > li:nth-child(4) ul .feature-desc');
    for (let i = 0; i < featureV10.length; i++) {
        featureV10[i].textContent = translations[lang].features_v10[i];
    }
    
    const featureV11 = document.querySelectorAll('.version-list > li:nth-child(5) ul .feature-desc');
    for (let i = 0; i < featureV11.length; i++) {
        featureV11[i].textContent = translations[lang].features_v11[i];
    }
    
    const featureV21 = document.querySelectorAll('.version-list > li:nth-child(6) ul .feature-desc');
    for (let i = 0; i < featureV21.length; i++) {
        featureV21[i].textContent = translations[lang].features_v21[i];
    }
    
    const featureV22 = document.querySelectorAll('.version-list > li:nth-child(7) ul .feature-desc');
    for (let i = 0; i < featureV22.length; i++) {
        featureV22[i].textContent = translations[lang].features_v22[i];
    }
    
    const featureV221 = document.querySelectorAll('.version-list > li:nth-child(8) ul .feature-desc');
    for (let i = 0; i < featureV221.length; i++) {
        featureV221[i].textContent = translations[lang].features_v221[i];
    }
    
    // Update version info
    document.querySelector('.version-info').textContent = `${translations[lang].versionInfo} 2.2.1`;
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
    
    if (localStorage.getItem('fortuneTellerLanguage') === 'true') {
        chineseMode = true;
        englishLangIcon.style.display = 'none';
        chineseLangIcon.style.display = 'block';
        document.body.classList.add('chinese-mode');
        updateUILanguage('zh');
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
    
    toggleLanguageBtn.addEventListener('click', () => {
        toggleLanguage();
        
        if (soundEnabled) {
            crystalSound.currentTime = 0;
            crystalSound.volume = 0.3;
            crystalSound.play();
        }
    });
    
    toggleQuestionBtn.addEventListener('click', () => {
        if (addFortuneContainer.style.display === 'block') {
            addFortuneContainer.style.display = 'none';
            toggleFormBtn.textContent = chineseMode ? '添加你的占卜' : 'Add Your Own Fortune';
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
        }
        
        if (askQuestionContainer.style.display === 'none') {
            askQuestionContainer.style.display = 'block';
            toggleQuestionBtn.textContent = chineseMode ? '隐藏问题表单' : 'Hide Question Form';
            askQuestionContainer.scrollIntoView({ behavior: 'smooth' });
            
            if (soundEnabled) {
                crystalSound.currentTime = 0;
                crystalSound.volume = 0.3;
                crystalSound.play();
                setTimeout(() => {
                    crystalSound.volume = 1.0; 
                }, 300);
            }
        } else {
            askQuestionContainer.style.display = 'none';
            toggleQuestionBtn.textContent = chineseMode ? '提问问题' : 'Ask a Question';
            answerText.style.display = 'none';
        }
    });
    
    askQuestionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const questionValue = questionText.value.trim();
        
        if (questionValue.length < 5) {
            alert(chineseMode ? '你的问题必须至少5个字符长' : 'Your question must be at least 5 characters long');
            return;
        }
        
        loadingIndicator.style.display = 'block';
        answerText.style.display = 'none';
        
        if (soundEnabled) {
            crystalSound.currentTime = 0;
            crystalSound.play();
        }
        
        try {
            const response = await fetch('/api/ask-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    question: questionValue,
                    language: chineseMode ? 'zh' : 'en'
                })
            });
            
            const data = await response.json();
            
            loadingIndicator.style.display = 'none';
            
            if (response.ok) {
                answerText.textContent = data.answer;
                answerText.style.display = 'block';
                
                if (soundEnabled) {
                    fortuneRevealSound.currentTime = 0;
                    fortuneRevealSound.play();
                }
            } else {
                answerText.textContent = data.error || (chineseMode ? 
                    '神秘力量暂时被遮蔽。请稍后再试。' : 
                    'The mystic forces are clouded. Please try again later.');
                answerText.style.display = 'block';
            }
        } catch (error) {
            console.error('Error asking question:', error);
            loadingIndicator.style.display = 'none';
            answerText.textContent = chineseMode ? 
                '与精神领域的连接已断开。请稍后再试。' : 
                'The connection to the spiritual realm was lost. Please try again later.';
            answerText.style.display = 'block';
        }
    });
    
    aboutBtn.addEventListener('click', () => {
        aboutModal.style.display = 'block';
        
        if (soundEnabled) {
            crystalSound.currentTime = 0;
            crystalSound.volume = 0.3;
            crystalSound.play();
        }
    });
    
    closeBtn.addEventListener('click', () => {
        aboutModal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === aboutModal) {
            aboutModal.style.display = 'none';
        }
    });
    
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
            // Choose fortune based on language
            const randomIndex = Math.floor(Math.random() * fortunes.length);
            const randomFortune = chineseMode ? 
                chineseFortunes[randomIndex % chineseFortunes.length] : 
                fortunes[randomIndex];
                
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
        if (askQuestionContainer.style.display === 'block') {
            askQuestionContainer.style.display = 'none';
            toggleQuestionBtn.textContent = chineseMode ? '提问问题' : 'Ask a Question';
        }
        
        if (addFortuneContainer.style.display === 'none') {
            addFortuneContainer.style.display = 'block';
            toggleFormBtn.textContent = chineseMode ? '隐藏表单' : 'Hide Form';
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
            toggleFormBtn.textContent = chineseMode ? '添加你的占卜' : 'Add Your Own Fortune';
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
            errorMessage.textContent = chineseMode ? '占卜必须至少10个字符长' : 'Fortune must be at least 10 characters long';
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
                
                successMessage.textContent = chineseMode ? '你的占卜已添加！' : data.message || 'Your fortune has been added!';
                successMessage.style.display = 'block';
                fortuneText.value = '';
                
                fortunes.push(fortuneTextValue);
            } else {
                errorMessage.textContent = chineseMode ? '提交占卜时出错。请再试一次。' : data.error || 'Error submitting fortune. Please try again.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error submitting fortune:', error);
            errorMessage.textContent = chineseMode ? '连接错误。请稍后再试。' : 'Connection error. Please try again later.';
            errorMessage.style.display = 'block';
        }
    });
});