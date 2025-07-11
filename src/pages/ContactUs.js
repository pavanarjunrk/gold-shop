import React, { useState } from "react";
import axios from "axios";
import "../styles/ContactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/contact", formData);
      alert("Thank you! Message sent successfully.");
      window.location.href = "/?success=true";
    } catch (err) {
      alert("Error sending message.");
    }
  };

  return (
    <div className="container">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />
          <input
            name="contact"
            placeholder="Contact Number"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>

        <div className="map-container">
          <iframe
            title="Shop Location"
            src="https://www.google.com/maps?q=Hyderabad&output=embed"
            width="100%"
            height="300"
            frameBorder="0"
            allowFullScreen
            style={{ borderRadius: "12px", marginTop: "20px" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
