import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'
import { Analytics } from '@vercel/analytics/react';
import store from './Utils/ReduxStore';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <BrowserRouter>
    <Analytics />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);