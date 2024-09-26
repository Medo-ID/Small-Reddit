// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import './main.css'
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.jsx'
import store from './store';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>,
  {/* </StrictMode>, */}
)
