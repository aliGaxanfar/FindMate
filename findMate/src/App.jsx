import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Questionnaire from './Questionnaire';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
      </Routes>
    </Router>
  );
}

export default App;