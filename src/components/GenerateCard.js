import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import "./GenerateCard.css";
import logo from "../assets/logo.png";
import { auth, database, ref, set, get } from "../firebase";

const GenerateCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const [cardData, setCardData] = useState({
    snfNo: "N/A",
    cardHolderName: "Not Available",
    mobile: "Not Available",
    address: "Not Available",
    familyDetails: []
  });

  const [flipped, setFlipped] = useState(false);

  // Calculate dates
  const issueDate = new Date();
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  const saveCardToFirebase = (data) => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(database, `users/${user.uid}/card`);
      set(userRef, data)
        .then(() => {
          console.log("✅ Card saved successfully to Firebase");
          navigate("/profile");
        })
        .catch((error) => {
          console.error("❌ Error saving card:", error);
        });
    } else {
      console.warn("⚠️ No authenticated user found");
    }
  };

  const formatDate = (date) => date.toISOString().split("T")[0];

  const generateBarcodeValue = (data) => {
    const mobileDigits = data.mobile.slice(-4).padStart(4, '0');
    return `${data.snfNo}-${mobileDigits}`;
  };

  const fetchCardFromFirebase = async (cardId) => {
    try {
      const snapshot = await get(ref(database, `healthCards/${cardId}`));
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    } catch (error) {
      console.error("Error fetching card:", error);
      return null;
    }
  };

  const downloadCard = async () => {
    setIsDownloading(true);
    try {
      // Temporarily unflip the card if it's flipped
      const wasFlipped = flipped;
      if (wasFlipped) setFlipped(false);
      
      // Wait for the DOM to update
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Capture front side
      const frontCanvas = await html2canvas(frontRef.current, {
        backgroundColor: null,
        scale: 3,
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      // Flip the card to show back side
      setFlipped(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Capture back side
      const backCanvas = await html2canvas(backRef.current, {
        backgroundColor: null,
        scale: 3,
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      // Restore original state
      if (!wasFlipped) setFlipped(false);
      
      // Create a new canvas to combine both sides
      const combinedCanvas = document.createElement('canvas');
      const padding = 30;
      const maxWidth = Math.max(frontCanvas.width, backCanvas.width);
      combinedCanvas.width = maxWidth;
      combinedCanvas.height = frontCanvas.height + backCanvas.height + padding;
      
      const ctx = combinedCanvas.getContext('2d');
      
      // Draw white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);
      
      // Draw front at top (centered)
      const frontX = (maxWidth - frontCanvas.width) / 2;
      ctx.drawImage(frontCanvas, frontX, 0);
      
      // Draw back below front with spacing (centered)
      const backX = (maxWidth - backCanvas.width) / 2;
      ctx.drawImage(backCanvas, backX, frontCanvas.height + padding);
      
      // Convert to image and download
      const image = combinedCanvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `HappyDoctorsCard_${cardData.cardHolderName.replace(/\s+/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error("Error downloading card:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const loadCardData = async () => {
      let formData = location.state?.formData ||
        JSON.parse(localStorage.getItem("healthCardFormData"));
      
      if (location.state?.cardId && !formData) {
        const firebaseData = await fetchCardFromFirebase(location.state.cardId);
        if (firebaseData) formData = firebaseData;
      }
      
      if (formData) {
        const completeCardData = {
          ...formData,
          issueDate: formatDate(issueDate),
          expiryDate: formatDate(expiryDate),
          barcode: generateBarcodeValue(formData)
        };
        setCardData(completeCardData);
      }
    };
    
    loadCardData();
  }, [location.state]);

  if (!cardData) {
    return (
      <div className="card-wrapper">
        <h2>Error: No card data found</h2>
        <p>Please go back and complete the form again.</p>
        <button className="profile-btn" onClick={() => navigate("/profile")}>
          👤 Go to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="card-wrapper">
      <h2 className="title">🎉 Happy Doctors Consultancy Card 🎉</h2>

      <div className={`card-container ${flipped ? "flip" : ""}`}>
        {/* Front Side */}
        <div className="card front" ref={frontRef}>
          <div className="card-header">
            <img src={logo} alt="Company Logo" className="card-logo" />
            <h3>HAPPY DOCTORS CONSULTANCY</h3>
          </div>
          <div className="card-content">
            <p><strong>Card Holder:</strong> {cardData.cardHolderName}</p>
            <p><strong>Card No:</strong> {cardData.snfNo}</p>
            <p><strong>Phone:</strong> {cardData.mobile}</p>
            <p><strong>Address:</strong> {cardData.address}</p>
            <p><strong>Issued Date:</strong> {cardData.issueDate}</p>
            <p><strong>Valid Until:</strong> {cardData.expiryDate}</p>
            
            <div className="barcode-container">
              <Barcode
                value={cardData.barcode || generateBarcodeValue(cardData)}
                format="CODE128"
                width={1.5}
                height={50}
                displayValue={true}
              />
            </div>
          </div>
        </div>
        
        {/* Back Side */}
        <div className="card back" ref={backRef}>
          <div className="card-header">
            <img src={logo} alt="Company Logo" className="card-logo" />
            <h3>FAMILY DETAILS</h3>
          </div>
          <div className="card-content">
            <table className="family-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Relation</th>
                </tr>
              </thead>
              <tbody>
                {cardData.familyDetails.map((member, index) => (
                  <tr key={index}>
                    <td>{member.name}</td>
                    <td>{member.age}</td>
                    <td>{member.relation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <p>Emergency Contact: {cardData.mobile}</p>
            <p className="terms">Terms & Conditions Apply</p>
          </div>
        </div>
      </div>

      <div className="button-group">
        <button 
          className="download-btn" 
          onClick={downloadCard}
          disabled={isDownloading}
        >
          {isDownloading ? "Downloading..." : "⬇️ Download Card"}
        </button>
        <button className="flip-btn" onClick={() => setFlipped(!flipped)}>
          {flipped ? "Show Front" : "Show Back"}
        </button>
        
      </div>
    </div>
  );
};

export default GenerateCard;