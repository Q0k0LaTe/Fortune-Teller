const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-7d7b8428b0c044f4909d13755e77e9cf'
});

mongoose.connect('mongodb+srv://Q0k0LaTes:Hanzhuoting0324-@cluster0.ngvjs.mongodb.net/fortuneTeller', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const Fortune = mongoose.model('Fortune', {
  text: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/fortunes', async (req, res) => {
  try {
    const fortunes = await Fortune.find().select('text -_id');
    res.json(fortunes.map(fortune => fortune.text));
  } catch (err) {
    console.error('Error fetching fortunes:', err);
    res.status(500).json({ error: 'Failed to fetch fortunes' });
  }
});

app.post('/api/fortunes', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim().length < 10) {
      return res.status(400).json({ error: 'Fortune must be at least 10 characters long' });
    }
    
    const newFortune = new Fortune({ text });
    await newFortune.save();
    
    res.status(201).json({ message: 'Fortune added successfully! It will appear in future readings.' });
  } catch (err) {
    console.error('Error adding fortune:', err);
    res.status(500).json({ error: 'Failed to add fortune' });
  }
});

app.post('/api/ask-question', async (req, res) => {
  try {
    const { question, language } = req.body;
    
    if (!question || question.trim().length < 5) {
      return res.status(400).json({ error: language === 'zh' ? '问题必须至少5个字符长' : 'Question must be at least 5 characters long' });
    }
    
    const systemMessages = {
      'en': "You are a mystical fortune teller. Answer the user's question in a mysterious, wise, and poetic way. Use metaphors, references to cosmic forces, stars, the universe, and ancient wisdom. Keep your answers insightful, positive, and concise. Your response must be between 75 and 150 words.",
      'zh': "你是一位神秘的占卜师。以神秘、睿智和诗意的方式回答用户的问题。使用隐喻，引用宇宙力量、星辰、宇宙和古老智慧。保持你的回答有见地、积极和简洁。你的回答必须在75到150字之间。"
    };
    
    const systemMessage = systemMessages[language || 'en'];
    
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user",
          content: question
        }
      ],
      max_tokens: 500
    });
    
    let answer = completion.choices[0].message.content;
    
    const maxLength = 500;
    if (answer.length > maxLength) {
      answer = answer.substring(0, maxLength) + (language === 'zh' ? "... [神秘的预见消失了]" : "... [The cosmic vision fades]");
    }
    
    res.json({ answer });
    
  } catch (err) {
    console.error('Error asking question:', err.message);
    console.error('Error details:', err);
    
    res.status(500).json({ 
      error: req.body.language === 'zh' ? 
        '预言家暂时被遮蔽。请稍后再试。' : 
        'The oracle is momentarily clouded. Please try again later.' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Fortune Teller website is running at http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop the server`);
});