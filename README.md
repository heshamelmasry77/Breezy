# 🌤️ Breezy - Weather Application

A responsive, single-page weather application built with **React**, **Vite**, **Tailwind CSS**, and **React Router**. Breezy allows users to search for cities, view current weather details, and access recently searched locations. Integrated with **OpenWeather API** for real-time data.

## 📋 Table of Contents

- [✨ Features](#-features)
- [📂 Project Structure](#-project-structure)
- [🚀 Project Setup](#-project-setup)
- [📍 Current Routes](#-current-routes)
- [🛠️ Technologies Used](#️-technologies-used)
- [⚙️ Getting Started](#️-getting-started)
- [📈 Planned Enhancements](#-planned-enhancements)

## ✨ Features

- 🔍 **City Weather Search**: Search for a city and display its current weather data.
- 🌐 **Main and History Routes**:
  - `/`: Main page, displays default or searched weather information.
  - `/history`: Shows recently searched cities and their weather.
- 📱 **Responsive Design**: Adapts to various screen sizes for improved UX.
- 🔤 **Autocomplete Search** (planned): Autocomplete city names with error handling.
- 📍 **Current Location Weather** (planned): Defaults to user's current location on initial load.
- 💾 **Recent Searches**: Displays previously searched cities with quick access to their weather data.

## 📂 Project Structure

```
src/
├── assets/           # Images and other static assets
├── components/       # Reusable UI components
│   ├── CitySearch.jsx # Handles city search input with autocomplete (in progress)
│   ├── Header.jsx     # Displays the application header
│   └── Weather.jsx    # Displays current weather details for a city
├── pages/            # Main application pages
│   ├── Home.jsx       # Home page with weather search and display
│   └── History.jsx    # History page showing previously searched cities
├── store/            # Redux store setup
│   ├── slices/
│   │   └── weatherSlice.js # Redux slice for weather state management, includes API functions
│   └── index.js       # Redux store configuration
├── App.jsx           # Main application component with routing setup
└── main.jsx          # Application entry point
```

## 🚀 Project Setup

1. **Vite**: Initialized with Vite for a fast development environment.
2. **React Router**: Configured with routes for the main page and history view.
3. **Tailwind CSS**: Styled using utility-first CSS for a clean, responsive layout.

## 📍 Current Routes

- `/` : Main route, displays weather for a selected city.
- `/history` : Shows the list of recently searched cities and weather.

## 🛠️ Technologies Used

- ⚛️ **React** for component-based UI development.
- ⚡ **Vite** for fast build and dev setup.
- 🎨 **Tailwind CSS** for responsive, utility-first styling.
- 🔀 **React Router** for navigation.
- 🌐 **OpenWeather API** for live weather data retrieval.
- 🗂️ **Redux** for state management of weather data and search history.

## ⚙️ Getting Started

To run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/heshamelmasry77/Breezy
   cd breezy
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:** Create a `.env` file in the root and add your OpenWeather API key:

   ```plaintext
   VITE_API_KEY=your_api_key_here
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

## 📈 Planned Enhancements

### New Features

- 🌦️ **Weather API Integration**: Retrieve and display live weather data using OpenWeather API.
- 🔍 **Autocomplete Search**: Provide city search suggestions as users type.
- 📍 **Current Location Weather**: Detect and show weather for the user’s current location on load.
- 📝 **Recently Searched Cities**: Track and display previously searched cities for quick access.

### User Experience

- 📱 **Responsive Layouts**: Ensure the design adjusts based on screen size.
- ♿ **Accessibility**: Implement best practices for accessible navigation and controls.

### Testing & Deployment

- ✅ **Unit & Integration Tests**: Cover essential components with unit tests.
- 🌍 **Online Deployment**: Deploy a live version accessible at `https://breezy-six.vercel.app/`.
