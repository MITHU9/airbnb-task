import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PropertyDetails from "./pages/PropertyDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [filters, setFilters] = useState({});

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header setFilters={setFilters} />
        <Routes>
          <Route path="/" element={<HomePage filters={filters} />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
