import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BankDetails from "./pages/BankDetails";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [goldPrice, setGoldPrice] = useState(null);

 useEffect(() => {
  const fetchGoldPrice = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/live-gold");
      const data = await res.json();
      setGoldPrice(data.price);
    } catch (err) {
      console.error("Failed to fetch live gold rate:", err);
    }
  };

  fetchGoldPrice();
}, []);

  return (
    <Router>
     {goldPrice && (
  <div className="live-price-bar">
    Live Gold Price (MCX): {goldPrice}
  </div>
)}

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bank-details" element={<BankDetails />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
