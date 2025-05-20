import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import * as atatus from 'atatus-spa';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

atatus.config('ecc523a92aa64efcb39d5800883cf7da').install();
atatus.notify(new Error('Test Atatus Setup'));
