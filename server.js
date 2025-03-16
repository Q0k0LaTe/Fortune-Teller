const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

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

// Start the server
app.listen(PORT, () => {
  console.log(`Fortune Teller website is running at http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop the server`);
});