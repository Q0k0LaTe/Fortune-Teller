const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI with Deepseek configuration
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-7d7b8428b0c044f4909d13755e77e9cf'
});

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://Q0k0LaTes:Hanzhuoting0324-@cluster0.ngvjs.mongodb.net/fortuneTeller', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Create simplified Fortune model (no approval needed)
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

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to get all fortunes
app.get('/api/fortunes', async (req, res) => {
  try {
    const fortunes = await Fortune.find().select('text -_id');
    res.json(fortunes.map(fortune => fortune.text));
  } catch (err) {
    console.error('Error fetching fortunes:', err);
    res.status(500).json({ error: 'Failed to fetch fortunes' });
  }
});

// API route to add a new fortune (directly added, no approval required)
app.post('/api/fortunes', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim().length < 10) {
      return res.status(400).json({ error: 'Fortune must be at least 10 characters long' });
    }
    
    // Create and save the new fortune immediately
    const newFortune = new Fortune({ text });
    await newFortune.save();
    
    res.status(201).json({ message: 'Fortune added successfully! It will appear in future readings.' });
  } catch (err) {
    console.error('Error adding fortune:', err);
    res.status(500).json({ error: 'Failed to add fortune' });
  }
});

// API route for asking questions to the Deepseek API
app.post('/api/ask-question', async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question || question.trim().length < 5) {
      return res.status(400).json({ error: 'Question must be at least 5 characters long' });
    }
    
    // Call Deepseek API using OpenAI SDK
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a mystical fortune teller. Answer the user's question in a mysterious, wise, and poetic way. Use metaphors, references to cosmic forces, stars, the universe, and ancient wisdom. Keep your answers insightful and positive. Limit your response to 150 words."
        },
        {
          role: "user",
          content: question
        }
      ],
      max_tokens: 500
    });
    
    const answer = completion.choices[0].message.content;
    res.json({ answer });
    
  } catch (err) {
    console.error('Error asking question:', err);
    console.error('Error details:', err.message);
    console.error('Error response:', err.response ? err.response.data : 'No response data');
    
    res.status(500).json({ error: 'The oracle is momentarily clouded. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Fortune Teller website is running at http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop the server`);
});