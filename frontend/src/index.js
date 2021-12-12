import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import App from './App';
import Patterns from './patterns/patterns'
import Fabrics from './fabrics/fabrics';
import Measurements from './measurements/measurements';
import Projects from './projects/projects';
import LandingPage from './pages/landing_page';
import Auth from './auth/auth';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/auth" element={<Auth />} />
        <Route path="/app" element={<App />} />
        <Route path="/patterns" element={<Patterns />} />
        <Route path="/fabrics" element={<Fabrics />} />
        <Route path="/measurements" element={<Measurements />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<LandingPage />} />=
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
