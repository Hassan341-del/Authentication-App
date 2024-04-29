import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Container from './Components/Container';

export default function App() {
  return (
    <BrowserRouter>
      <Container />
    </BrowserRouter>
  );
}
