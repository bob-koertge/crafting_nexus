import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './components/auth'
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';


function Router() {

  return (
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Auth />} />
            <Route exact path="/patterns" element={<App />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  )
}

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
