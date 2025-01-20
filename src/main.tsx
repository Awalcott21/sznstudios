import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// PayPal Integration
import PayPalButton from './components/PayPalButton'; // Path to the PayPalButton component

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <PayPalButton />
  </>
);
