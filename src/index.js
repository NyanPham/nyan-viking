import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import allReducers from './redux/reducers/allReducers'
import thunk from 'redux-thunk'

const store = createStore(allReducers, applyMiddleware(thunk))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
