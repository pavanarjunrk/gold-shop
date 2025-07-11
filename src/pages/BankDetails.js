import React from "react";
import "../styles/BankDetails.css"; // or reuse Home.css if needed

function BankDetails() {
  return (
    <div className="container">
      <div className="bank-card">
        <h2>Banking Details</h2>
        <p><strong>Bank Name:</strong> State Bank of India</p>
        <p><strong>Account Number:</strong> 123456789012</p>
        <p><strong>IFSC Code:</strong> SBIN0001234</p>
        <p><strong>Shop Name:</strong> RK Jewellers</p>
        <p><strong>Branch:</strong> Hyderabad</p>
      </div>
    </div>
  );
}

export default BankDetails;
