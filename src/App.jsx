import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Services from './components/Services';
import About from './components/About';
import Industries from './components/Industries';
import Trustedpartners from './components/Trustedpartners';
import Footer from './components/Footer';
import Career from './components/Career';
import Contact from './components/Contact';
import JobApplication from './components/JobApplication';
import Portfolio from './components/Portfolio'; 
import ScrollToTop from './components/ScrollToTop';
import Abou from './components/Abou';

// Home Page Component
function HomePage() {
  return (
    <>
      <Carousel />
      <About />
      <Services />
      <Industries />
      <Trustedpartners />
    </>
  );
}

function App() {

  useEffect(() => 
    {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  useEffect(() => {
  const blockKeys = (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
      (e.ctrlKey && e.key === "U") ||
      (e.metaKey && e.altKey && e.key === "I")
    ) {
      e.preventDefault();
    }
  };

  document.addEventListener("keydown", blockKeys);
  return () => document.removeEventListener("keydown", blockKeys);
}, []);


  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
         <ScrollToTop />
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/abou" element={<Abou />} />
           <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
            <Route path="/apply" element={<JobApplication />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;