
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Safe Mode: Garante que o container existe e evita quebras por referências globais
const startApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.warn('Root element not found, retrying...');
      return;
    }
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error('Fatal error during React mount:', err);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
