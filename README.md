
# 🌤️ Breezy - Weather Application

A responsive, single-page weather application built with **React**, **Vite**, **Tailwind CSS**, and **React Router**. Breezy allows users to search for cities, view current weather details, and access recently searched locations.

## 📋 Table of Contents
- [✨ Features](#-features)
- [🚀 Project Setup](#-project-setup)
- [📍 Current Routes](#-current-routes)
- [🛠️ Technologies Used](#️-technologies-used)
- [⚙️ Getting Started](#️-getting-started)
- [📈 Planned Enhancements](#-planned-enhancements)
- [🤝 Contributing](#-contributing)

## ✨ Features

- 🔍 **City Weather Search**: Search for a city and display its weather visually.
- 🌐 **Main and History Routes**: 
  - `/`: Main page, displays default weather.
  - `/history`: Shows recently searched cities and their weather.
- 📱 **Responsive Design**: Adapts to various screen sizes for improved UX.
- 🔤 **Autocomplete Search** (planned): Autocomplete city names with error handling.
- 📍 **Current Location Weather** (planned): Defaults to user's current location on initial load.

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

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

## 📈 Planned Enhancements

### Initial Features
- 🌦️ **Weather API Integration**: Set up to retrieve and display live weather data.
- 🔍 **Autocomplete Search**: Allow users to quickly find cities with live suggestions.
- 📍 **Current Location Weather**: Detect user location and display default weather on load.
- 📝 **Recently Searched Cities**: Track and display previously searched cities.

### User Experience
- 📱 **Responsive Layouts**: Ensure design adjusts based on screen size.
- ♿ **Accessibility**: Implement best practices for accessible navigation and controls.

### Testing & Deployment
- ✅ **Unit & Integration Tests**: Cover essential components with unit tests.
- 🌍 **Online Deployment**: Deploy a live version accessible via a test URL.

