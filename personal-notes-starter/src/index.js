import React from 'react';
import { createRoot } from 'react-dom/client';
import NoteBody from './components/NoteBody';

// import style
import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(<NoteBody />);