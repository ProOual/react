import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Outlet, Link } from 'react-router-dom';
import App from './App.jsx';


const About = () => <div>À propos</div>;
const Contact = () => (
  <div>
    {console.log("render")}
    Contactez-nous
  </div>
);
const NotFound = () => <div>Page non trouvée</div>;

const AppWithRouting = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/about">À propos</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWithRouting >
      <Outlet />
    </AppWithRouting >

  </React.StrictMode>,
);
