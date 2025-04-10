import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoogleLogin from "./components/GoogleLogin";
import HealthCard from "./components/HealthCard"; // Import Health Card Component
import Payment from "./components/Payment";
import GenerateCard from "./components/GenerateCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleLogin />} />
        <Route path="/healthcard" element={<HealthCard />} />
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/generate-card" element={<GenerateCard/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
