import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App.jsx';

const root = createRoot(document.getElementById('root'));
// eslint-disable-next-line react/jsx-filename-extension
root.render(<App />);
