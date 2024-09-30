import React from 'react'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '../Pages/Home';
import Contact from '../Pages/Contact';
import About_us from '../Pages/About_us';


{/* This is a comment inside JSX  import { Home, About, Contact } from '../Pages' */ }

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About_us />} />
      
      </Routes>
    </Router>
  )
}

export default App





