import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GameProvider } from './contexts/GameContext';
import './Styles/index.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
	const el = document.createElement('div');
	el.id = 'root';
	document.body.appendChild(el);
}

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<GameProvider>
			<App />
		</GameProvider>
	</React.StrictMode>
);
