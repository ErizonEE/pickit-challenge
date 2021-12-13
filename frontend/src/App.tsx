import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Owners from './components/Owners';
import Panel from './components/Panel';
import Jobs from './components/Jobs';
import NotFound from './components/NotFound';
import './App.css';


function App() {
  return (
    <div className='layout'>
      <Panel></Panel>
      <div className='section'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/propietarios" element={<Owners />} />
            <Route path="/trabajos" element={<Jobs />} />
            <Route path="/trabajos" element={<Jobs />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
