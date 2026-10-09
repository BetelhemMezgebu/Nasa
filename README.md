# 🚀 NASA Explorer

A modern React web application for exploring NASA's space data, discovering astronomy images, exploring Mars imagery, and saving favorite discoveries.

## 🌐 Live Demo

🚀 **Live Demo:** Coming soon

## 📦 GitHub Repository

🔗 **Repository:** https://github.com/BetelhemMezgebu/Nasa

---

## 🌌 Features

### 🏠 Home

* Clean and responsive landing page
* Easy navigation to NASA exploration features
* Modern space-themed user interface

### 🌠 Astronomy Picture of the Day (APOD)

* Explore NASA's Astronomy Picture of the Day
* View astronomy images and information
* Display:

  * Image
  * Title
  * Date
  * Explanation
* Loading and error states

### 🔴 Mars Explorer

* Explore Mars-related NASA imagery
* Search and filter NASA images
* View image titles, descriptions, and dates
* Pagination for browsing results

### ❤️ Favorites

* Add NASA discoveries to favorites
* Remove individual favorites
* Clear all favorites
* Favorites persist using browser `localStorage`
* Favorites remain available after page refresh

### 📱 Responsive Design

The application is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 📲 Tablet

### ⚠️ Error & Loading Handling

* Loading states while fetching API data
* Error messages when requests fail
* Empty-result handling

---

## 🛠️ Technologies

* **React**
* **Vite**
* **JavaScript (ES6+)**
* **React Router**
* **Context API**
* **NASA APIs**
* **REST APIs**
* **localStorage**
* **HTML5**
* **CSS3**
* **Git & GitHub**

---

## 📂 Project Structure

```text
nasa-explorer/
│
├── public/
│   └── images/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── FavoriteButton.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Pagination.jsx
│   │   └── SpaceCard.jsx
│   │
│   ├── context/
│   │   └── FavoritesContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── APOD.jsx
│   │   ├── MarsRover.jsx
│   │   └── Favorites.jsx
│   │
│   ├── services/
│   │   └── nasaApi.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## 🔗 Application Routes

| Route         | Description                  |
| ------------- | ---------------------------- |
| `/`           | Home page                    |
| `/apod`       | Astronomy Picture of the Day |
| `/mars-rover` | Explore Mars imagery         |
| `/favorites`  | Saved NASA discoveries       |

---

## 🔌 NASA API Integration

NASA Explorer retrieves space-related data through NASA's public services.

### APOD

The APOD feature provides:

* Astronomy images
* Titles
* Dates
* Explanations
* Daily astronomy content

### NASA Image Library

The Mars Explorer feature uses NASA's image services to retrieve Mars-related imagery.

API functionality is organized inside:

```text
src/services/nasaApi.js
```

This keeps API logic separate from the application's UI components.

---

## ❤️ Favorites System

Favorites are managed using React Context:

```text
src/context/FavoritesContext.jsx
```

Favorites are persisted in the browser using:

```text
localStorage
```

Storage key:

```text
nasaExplorerFavorites
```

Users can:

* Add a favorite
* Remove a favorite
* Clear all favorites
* Keep favorites after refreshing the page

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/BetelhemMezgebu/Nasa.git
```

### 2. Navigate to the project

```bash
cd Nasa
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

---

## 🔑 Environment Variables

If an API key is required, create a `.env` file in the project root:

```env
VITE_NASA_API_KEY=your_api_key_here
```

Never commit private API keys or other secrets to GitHub.

Make sure `.env` is included in `.gitignore`.

---

## 🏗️ Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📚 What I Learned

This project helped us practice real-world frontend development, including:

* Building applications with React
* Working with external REST APIs
* Asynchronous JavaScript
* React component architecture
* React Router
* Context API
* State management
* Browser `localStorage`
* Search and filtering
* Pagination
* Loading and error handling
* Responsive web design
* Git and GitHub collaboration
* Debugging API integration problems

---

## 👥 Team

### Betelhem Mezgebu

Frontend Developer

Contributions included:

* React development
* API integration
* UI implementation
* Favorites functionality
* State management
* Debugging
* Testing
* Git/GitHub collaboration

### Eman

Frontend Developer

Contributions included:

* React development
* UI components
* Feature implementation
* Testing
* Git/GitHub collaboration

---

## 🎯 Project Goal

NASA Explorer was developed as a **frontend bootcamp final project** to apply modern frontend development concepts to a real-world application.

The goal was to create an interactive platform where users can explore NASA's space data instead of simply building a static website.

---

## 🔮 Future Improvements

Potential improvements include:

* User authentication
* More NASA datasets
* Advanced search
* Date-based APOD browsing
* More Mars exploration filters
* Additional NASA missions
* Dark/light theme
* Improved accessibility
* Better API caching and performance

---

## 📄 License

This project was created for educational and portfolio purposes.

---

## 🌌 Acknowledgment

NASA Explorer uses publicly available NASA data and imagery to provide users with an interactive space exploration experience.

**Built with ❤️ using React, Vite, and NASA data.**
