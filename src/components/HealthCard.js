import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import "./HealthCard.css"; // Import CSS
import { database, ref, set } from "../firebase";

const HealthCard = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    snfNo: Math.floor(1000 + Math.random() * 9000), // 4-digit random number
    date: new Date().toISOString().split("T")[0], // Today's date
    cardHolderName: "",
    address: "",
    mobile: "",
    familyDetails: [{ name: "", age: "", relation: "" }]
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    
    if (name === "name" || name === "age" || name === "relation") {
      let newFamily = [...formData.familyDetails];
      newFamily[index][name] = value;
      setFormData({ ...formData, familyDetails: newFamily });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addFamilyMember = () => {
    setFormData({
      ...formData,
      familyDetails: [...formData.familyDetails, { name: "", age: "", relation: "" }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Generate a unique ID for the health card
      const cardId = `card_${Date.now()}`;
      
      // Save to Firebase
      await set(ref(database, `healthCards/${cardId}`), formData);
      
      alert("Health Card Generated Successfully!");
      
      // Redirect to payment with the card ID
      navigate("/payment", { 
        state: { 
          formData,
          cardId // Pass the Firebase document ID
        } 
      });
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      alert("Error saving health card data");
    }
  };


  return (
    <div className="health-card">
      <h2>Happy Doctors Consultancy</h2>
      <p>Cell:88 976 976 90,88 976 976 98</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>SNF No:</label>
          <input type="text" value={formData.snfNo} readOnly />
        </div>

        <div>
          <label>Date:</label>
          <input type="text" value={formData.date} readOnly />
        </div>

        <div>
          <label>Card Holder Name:</label>
          <input type="text" name="cardHolderName" value={formData.cardHolderName} onChange={handleChange} required />
        </div>

        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div>
          <label>Mobile No:</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
        </div>

        <h3>Family Details:</h3>
        {formData.familyDetails.map((member, index) => (
          <div key={index} className="family-member">
            <input type="text" name="name" placeholder="Name" value={member.name} onChange={(e) => handleChange(e, index)} required />
            <input type="number" name="age" placeholder="Age" value={member.age} onChange={(e) => handleChange(e, index)} required />
            <input type="text" name="relation" placeholder="Relation" value={member.relation} onChange={(e) => handleChange(e, index)} required />
          </div>
        ))}
        <button type="button" onClick={addFamilyMember}>+ Add Family Member</button>

        <button type="submit">Generate Health Card & Proceed to Payment</button>
      </form>
    </div>
  );
};

export default HealthCard;
