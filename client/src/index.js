import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import background from './images/memories3.png'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <div style={{ backgroundImage: `url(${background})` }}className="background-image"></div> */}
    <App />
  </React.StrictMode>
);

