import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import RecentSearches from "./pages/RecentSearches";
import Loader from "./components/shared/Loader";

function App() {
  return (
    <Router>
      <div>
        {/* The Header will be displayed on every page */}
        <Header />

        {/* Page content will change based on the route */}
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recent-searches" element={<RecentSearches />} />
          </Routes>
          <Loader />
        </main>
      </div>
    </Router>
  );
}

export default App;
