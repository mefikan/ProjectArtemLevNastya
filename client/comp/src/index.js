import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {UserStore} from "../node-postgres/frontend/restaurant/UserStore";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export const Context = createContext(null)

ReacrDDM.render(
    <Context.Provider value ={{
        user: new UserStore()
    }}>
        <App />
    </Context.Provider>
)
reportWebVitals();
