import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <div>
        {/* Header will be displayed on every page */}
        <Header />

        {/* Page content will change based on the route */}
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
