import React, { useEffect, useState } from "react";
import "../styles/Home.css"; // Optional if you're styling it externally

const OUNCE_TO_GRAM = 28.3495;
const ROUND = (val) => parseFloat(val.toFixed(2));

function Home() {
  const [rates, setRates] = useState([]);
  const [previousRates, setPreviousRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRates = async () => {
    const apiKey = "777f790169a8227ae3e71160f31dbb6c";
    const url = `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=INR&currencies=XAU,XAG`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        const goldRateINR = data.rates["INRXAU"];
        const silverRateINR = data.rates["INRXAG"];

        if (goldRateINR && silverRateINR) {
          const newRates = [
            {
              metal: "Gold",
              retail: ROUND(goldRateINR / OUNCE_TO_GRAM),
              futures: ROUND((goldRateINR - 100) / OUNCE_TO_GRAM),
            },
            {
              metal: "Silver",
              retail: ROUND(silverRateINR / OUNCE_TO_GRAM),
              futures: ROUND((silverRateINR - 10) / OUNCE_TO_GRAM),
            },
          ];

          setPreviousRates(rates.length ? rates : newRates); // Prevent undefined comparison
          setRates(newRates);
          setError(null);
        } else {
          setError("Metal prices not found in response.");
          setRates([]);
        }
      } else {
        setError("API Error: " + (data.error?.message || "Unknown error"));
        setRates([]);
      }
    } catch (err) {
      setError("Fetch Error: " + err.message);
      setRates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 300000); // 5 min auto-refresh
    return () => clearInterval(interval);
  }, []);

  const getArrow = (current, previous) => {
    if (previous === undefined) return ""; // No previous data
    return current > previous ? " 🔼" : current < previous ? " 🔽" : "";
  };

  return (
    <div className="home-container">
      <section className="rates-section">
        <h2>Live Metal Rates (INR per gram)</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {loading ? (
          <p>Loading rates...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Metal</th>
                <th>Retail Price</th>
                <th>Futures Price</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate, index) => {
                const prev = previousRates[index] || {};
                return (
                  <tr key={index}>
                    <td>{rate.metal}</td>
                    <td>
                      ₹{rate.retail}
                      {getArrow(rate.retail, prev.retail)}
                    </td>
                    <td>
                      ₹{rate.futures}
                      {getArrow(rate.futures, prev.futures)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <button className="refresh-btn" onClick={fetchRates}>
          Refresh Rates Now
        </button>
      </section>
    </div>
  );
}

export default Home;
