import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for PWA functionality - TEMPORARILY DISABLED FOR DEVELOPMENT
if (false && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Show install prompt after a delay
        let deferredPrompt: any;
        window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();
          deferredPrompt = e;
          
          // Show install button after 3 seconds
          setTimeout(() => {
            if (deferredPrompt) {
              console.log('PWA install prompt available');
              // You can trigger the install prompt here if needed
            }
          }, 3000);
        });
        
        // Log when app is installed
        window.addEventListener('appinstalled', () => {
          console.log('PWA was installed');
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
