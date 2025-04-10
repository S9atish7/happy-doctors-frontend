// GoogleLogin.js
import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "../firebase";
import { useNavigate } from "react-router-dom";
import lgs from "../assets/lgs.jpg";
import { styles, colors } from "./styles";

// ... keep all your existing translations, hospitalData, and serviceData ...
const translations = {
  title: "Happy Doctors Consultancy",
  networkHospitals: "Network Hospitals",
  signIn: "Sign in with Google",
  logout: "Logout",
  welcome: "Welcome",
  loggedOut: "Logged out successfully!",
  backToRegions: "← Back to regions",
  hospitalsCount: "Hospitals",
  happyDoctorsCard: "Happy Doctors Card",
  services: "Our Services",
  healthCard: "Health Card",
  snfNumber: "S.N.F. No.",
  contact: "Contact",
  service1: "Family Health Card services available 24/7 nationwide with special discounts on medical products",
  service2: "Tax benefits with Family Health Card (Rs. 500) and special distribution services",
  serviceTable: {
    service: "Service",
    regularPrice: "Regular Price",
    discountPrice: "Discounted Price"
  },
  azureSection: {
    title: "Happy Doctors Health Services",
    description: "Access quality healthcare services with our network of hospitals and special discounts",
    card1Title: "Network Hospitals",
    card1Desc: "30+ network hospitals across multiple regions with special discounts",
    card2Title: "Health Card",
    card2Desc: "Get our health card for additional benefits and tax advantages",
    card3Title: "24/7 Support",
    card3Desc: "Round-the-clock customer support for all your healthcare needs",
    cta: "Get Started Today"
  }
};
const specialtiesData = [
  "Cardiology",
  "CT Surgery",
  "Gastroenterology",
  "Liver",
  "Mother & Child",
  "Orthopedics",
  "Nephrology",
  "Robotic Science",
  "Spine Surgery",
  "Arthroscopy & Sports Medicine",
  "Barlatric Surgery",
  "Critical Care",
  "Dermatology",
  "ENT",
  "Endocrinology",
  "General Medicine",
  "Gynaecology",
  "Hematology & BMT",
  "Kidney Transplant",
  "Neuro Science",
  "Nuclear Medicine",
  "Ophthalmology",
  "Pain Medicine",
  "Pediatrics",
  "Plastic Surgery",
  "Pulmonology",
  "Rheumatology",
  "Surgical Gastroenterology",
  "Urology",
  "Vascular Surgery"
];

// Hospital data by region
const hospitalData = {
  "Narasaraopet": [
    "Narasaraopet General Hospital",
    "Sai Super Specialty Hospital",
    "Kamineni Hospitals Narasaraopet",
    "Guntur Medical College Branch"
  ],
  "Chilakaluripet": [
    "Chilakaluripet Community Hospital",
    "Life Care Hospital",
    "Sai Priya Hospital",
    "Palnadu Multi-Specialty"
  ],
  "Sathenapalli": [
    "Sathenapalli Government Hospital",
    "Sri Sai Hospital",
    "Vinayaka Hospital",
    "Ramesh Hospitals Branch"
  ],
  "Vinukonda": [
    "Vinukonda General Hospital",
    "NRI Medical College",
    "Palnadu Super Specialty Hospital",
    "Apollo Clinic"
  ],
  "Piduguralla": [
    "Piduguralla Community Hospital",
    "Sai Krishna Hospital",
    "Guntur General Hospital Branch",
    "Kamineni Primary Care"
  ]
};

// Service data (simplified to English only)
const serviceData = [
  { name: "Medicine (Multispecialty)", regularPrice: "5000-00", discountPrice: "4000-00" },
  { name: "Blood Test", regularPrice: "1000-00", discountPrice: "800-00" },
  { name: "Scanning", regularPrice: "1000-00", discountPrice: "800-00" },
  { name: "M.R.I. Scanning", regularPrice: "6000-00", discountPrice: "4800-00" },
  { name: "Ultrasound", regularPrice: "2400-00", discountPrice: "1800-00" },
  { name: "X-Ray", regularPrice: "3500-00", discountPrice: "2800-00" },
  { name: "I.C.U (1 day)", regularPrice: "3500-00", discountPrice: "2800-00" },
  { name: "General Ward (1 day)", regularPrice: "2000-00", discountPrice: "1600-00" }
];

const GoogleLogin = () => {
  const [user, setUser] = useState(null);
  const [showRegions, setShowRegions] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      alert(`${translations.welcome} ${result.user.displayName}`);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setSelectedRegion(null);
      alert(translations.loggedOut);
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const toggleRegions = (e) => {
    e.stopPropagation();
    setShowRegions(!showRegions);
    if (!showRegions) {
      setSelectedRegion(null);
    }
  };

  const selectRegion = (region) => {
    setSelectedRegion(region);
    setShowRegions(false);
  };

  const closeDropdowns = () => {
    setShowRegions(false);
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdowns);
    return () => document.removeEventListener('click', closeDropdowns);
  }, []);
  return (
    <div style={styles.mainContainer}>
      <div style={styles.header}>
        <div style={styles.logoTitleContainer}>
          <img src={lgs} alt="Logo" style={styles.logo} />
          <h1 style={styles.title}>{translations.title}</h1>
        </div>

        <div style={styles.buttonsContainer}>
          <div style={styles.dropdownContainer}>
            <button 
              onClick={toggleRegions}
              style={{
                ...styles.networkButton,
                width: isMobile ? '100%' : 'auto'
              }}
            >
              {translations.networkHospitals} {showRegions ? '▲' : '▼'}
            </button>
            {(showRegions || selectedRegion) && (
              <div style={{
                ...styles.regionsDropdown,
                width: isMobile ? '100%' : 'auto'
              }}>
                {!selectedRegion ? (
                  Object.keys(hospitalData).map((region) => (
                    <div 
                      key={region}
                      style={styles.regionItem}
                      onClick={() => selectRegion(region)}
                    >
                      {region}
                    </div>
                  ))
                ) : (
                  <div style={styles.hospitalListContainer}>
                    <div 
                      style={styles.backButton}
                      onClick={() => setSelectedRegion(null)}
                    >
                      {translations.backToRegions}
                    </div>
                    <h4 style={styles.regionTitle}>
                      {selectedRegion} {translations.hospitalsCount} ({hospitalData[selectedRegion].length})
                    </h4>
                    {hospitalData[selectedRegion].map((hospital, index) => (
                      <div key={index} style={styles.hospitalItem}>
                        • {hospital}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {!user ? (
            <button 
              onClick={signInWithGoogle} 
              style={{
                ...styles.button,
                width: isMobile ? '100%' : 'auto'
              }}
            >
              {translations.signIn}
            </button>
          ) : (
            <button 
              onClick={handleLogout} 
              style={{
                ...styles.button,
                width: isMobile ? '100%' : 'auto'
              }}
            >
              {translations.logout}
            </button>
          )}
        </div>
      </div>

      {/* Profile section */}
      {user && (
        <div style={styles.profileContainer}>
          <div style={styles.profile}>
            <img 
              src={user.photoURL || "https://via.placeholder.com/100"} 
              alt="Profile" 
              style={styles.avatar} 
            />
            <h3 style={styles.userName}>{user.displayName}</h3>
            <p style={styles.userEmail}>{user.email}</p>
            <button 
              onClick={() => navigate("/healthcard")} 
              style={styles.cardButton}
            >
              {translations.happyDoctorsCard}
            </button>
          </div>
        </div>
      )}

      {!user && (
        <div style={styles.healthCardContainer}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitleContainer}>
              <h2 style={styles.cardTitle}>{translations.healthCard}</h2>
            </div>
            <p style={styles.contact}>{translations.contact}: 88 976 976 98, 88 976 976 98</p>
          </div>

          <div style={styles.servicesSection}>
            <h3 style={styles.sectionTitle}>{translations.services}</h3>
            <div style={styles.serviceItem}>
              <p style={styles.serviceText}>{translations.service1}</p>
            </div>
            <div style={styles.serviceItem}>
              <p style={styles.serviceText}>{translations.service2}</p>
            </div>
          </div>

          <div style={styles.servicesTable}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>{translations.serviceTable.service}</th>
                  <th style={styles.th}>{translations.serviceTable.regularPrice}</th>
                  <th style={styles.th}>{translations.serviceTable.discountPrice}</th>
                </tr>
              </thead>
              <tbody>
                {serviceData.map((service, index) => (
                  <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                    <td style={styles.td}>{service.name}</td>
                    <td style={styles.td}>{service.regularPrice}</td>
                    <td style={styles.td}>{service.discountPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={styles.specialtiesSection}>
            <h3 style={styles.sectionTitle}>Our Medical Specialties</h3>
            <div style={styles.specialtiesGrid}>
              {specialtiesData.map((specialty, index) => (
                <div key={index} style={styles.specialtyItem}>
                  • {specialty}
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      )}

      {/* Azure-like section */}
      {!user && (
        <div style={styles.azureSection.container}>
          <div style={styles.azureSection.innerContainer}>
            <h2 style={styles.azureSection.title}>
              {translations.azureSection.title}
            </h2>
            
            <p style={styles.azureSection.description}>
              {translations.azureSection.description}
            </p>
            
            <div style={styles.azureSection.cardsContainer}>
              {/* Service Card 1 */}
              <div style={styles.azureSection.card}>
                <div style={styles.azureSection.cardIcon}>
                  <span style={{ fontSize: '2rem', color: colors.primary }}>🏥</span>
                </div>
                <h3 style={styles.azureSection.cardTitle}>{translations.azureSection.card1Title}</h3>
                <p style={styles.azureSection.cardDesc}>
                  {translations.azureSection.card1Desc}
                </p>
              </div>
              
              {/* Service Card 2 */}
              <div style={styles.azureSection.card}>
                <div style={styles.azureSection.cardIcon}>
                  <span style={{ fontSize: '2rem', color: colors.primary }}>💳</span>
                </div>
                <h3 style={styles.azureSection.cardTitle}>{translations.azureSection.card2Title}</h3>
                <p style={styles.azureSection.cardDesc}>
                  {translations.azureSection.card2Desc}
                </p>
              </div>
              
              {/* Service Card 3 */}
              <div style={styles.azureSection.card}>
                <div style={styles.azureSection.cardIcon}>
                  <span style={{ fontSize: '2rem', color: colors.primary }}>📞</span>
                </div>
                <h3 style={styles.azureSection.cardTitle}>{translations.azureSection.card3Title}</h3>
                <p style={styles.azureSection.cardDesc}>
                  {translations.azureSection.card3Desc}
                </p>
              </div>
            </div>
            
            <button style={styles.azureSection.ctaButton}>
              {translations.azureSection.cta}
            </button>
          </div>
        </div>
      )}
      
      {/* Footer Section */}
      <div style={styles.footer.container}>
        <div style={styles.footer.socialIcons}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/124/124010.png" 
              alt="Facebook" 
              style={{ width: '40px', height: '40px' }}
            />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/733/733579.png" 
              alt="Twitter" 
              style={{ width: '40px', height: '40px' }}
            />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" 
              alt="Instagram" 
              style={{ width: '40px', height: '40px' }}
            />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" 
              alt="LinkedIn" 
              style={{ width: '40px', height: '40px' }}
            />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/733/733646.png" 
              alt="YouTube" 
              style={{ width: '40px', height: '40px' }}
            />
          </a>
        </div>

        <p style={styles.footer.copyright}>
          © 2025. Happy Doctors Consultancy. All Rights Reserved | <a href="/terms" style={styles.footer.link}>Terms</a>
        </p>
      </div>
    </div>
  );
};

export default GoogleLogin;