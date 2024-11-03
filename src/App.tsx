import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroList from './components/HeroList';
import HeroDetail from './components/HeroDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroList />} />
        <Route path="/hero/:id" element={<HeroDetail />} />
      </Routes>
    </BrowserRouter>
  );
}