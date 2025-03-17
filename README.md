# The Mysterious Fortune Teller

![Fortune Teller Preview](https://github.com/Q0k0LaTe/Fortune-Teller/blob/master/preview.png)

## 🔮 Overview

The Mysterious Fortune Teller is an interactive web application that provides mystical fortunes through a beautifully designed crystal ball interface. Users can receive random fortunes by clicking the crystal ball and can contribute their own fortunes to the collection.

## ✨ Features

- **Interactive Crystal Ball**: Animated with magical effects and sparkles
- **Fortune Generation**: Randomly selects fortunes from a diverse collection
- **User Contributions**: Users can submit their own fortunes
- **Real-time Updates**: New fortunes are immediately available
- **MongoDB Integration**: All fortunes are stored persistently
- **Responsive Design**: Works on mobile and desktop devices
- **Mystical UI**: Animated stars, magical fonts, and enchanting visuals
- **Immersive Audio**: Background music and interactive sound effects

## 📝 Version History

- **v0.1**: Initial version with basic functionality
- **v0.2**: Fixed bugs related to fortune display timers
- **v0.3**: Added background music and interactive sound effects
  - Magical background ambience
  - Crystal ball click sounds
  - Fortune reveal sound effects
  - Sound toggle controls

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Audio**: Custom sound effects and background music
- **Deployment**: GitHub

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Q0k0LaTe/Fortune-Teller.git
   cd Fortune-Teller
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory (optional):
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 💻 Usage

### Receiving a Fortune
1. Visit the website
2. Click on the crystal ball
3. Your mystical fortune will appear below the crystal ball
4. Enjoy the magical sound effects!

### Adding a Fortune
1. Click the "Add Your Own Fortune" button
2. Enter your fortune (minimum 10 characters)
3. Click "Submit Fortune"
4. Your fortune is now part of the collection!

### Sound Controls
- Click the sound icon in the bottom-right corner to toggle audio on/off
- Your sound preference will be remembered for future visits

## 📱 Mobile Support

The application is designed to be fully responsive and works on all device sizes. The UI elements adapt to provide an optimal experience on phones, tablets, and desktop computers.

## 🔄 API Endpoints

- `GET /api/fortunes` - Retrieve all fortunes
- `POST /api/fortunes` - Add a new fortune

## 🔮 Future Enhancements

- User accounts and favorite fortunes
- Different fortune categories (love, career, etc.)
- Social sharing capabilities
- Dark/light theme toggle
- Additional sound effects and animations

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details

## 👤 Author

**Terrence Han**

- GitHub: [Q0k0LaTes](https://github.com/Q0k0LaTe)

## 🙏 Acknowledgements

- Special thanks to all the mystical forces that inspired this project
- Fonts provided by Google Fonts
- Icons and design inspiration from various mystical sources
- Audio elements created with assistance from AI tools