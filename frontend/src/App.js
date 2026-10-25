import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Upgrades from './components/Upgrades';
import Payments from './components/Payments';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Refund from './components/Refund';
import DeleteAccount from './components/DeleteAccount';
import ForCustomers from './components/ForCustomers';
import ForMerchants from './components/ForMerchants';
import ForBrands from './components/ForBrands';
import Ecosystem from './components/Ecosystem';
import Home from './components/Home';
import MerchantTerms from './components/MerchantTerms';
import Download from './components/Download';
import './App.css';

function HomePage() {
  return (
    <>
  
     
     
      <main>
        <Home/>
       </main>
      
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upgrades" element={<Upgrades />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/header" element={<Header />} />
           <Route path="/about" element={<About />} />
            <Route path="/contactSection" element={<ContactSection />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/forcustomers" element={<ForCustomers />} />
          <Route path="/formerchants" element={<ForMerchants />} />
           <Route path="/forbrands" element={<ForBrands />} />
           <Route path="/ecosystem" element={<Ecosystem />} />
           <Route path="/home" element={<Home />} />
          
         
            <Route path="/merchantTerms" element={<MerchantTerms />} />
              <Route path="/download" element={<Download />} />
             
        </Routes>
      </div>
    </Router>
  );
}

export default App;
