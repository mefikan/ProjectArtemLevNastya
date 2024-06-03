import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from "./store/UserStore";
import RestaurantStore from "./store/RestaurantStore";
import DishStore from "./store/DishStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Context.Provider value={{
        user: new UserStore(),
        restaurant: new RestaurantStore(),
        dish: new DishStore(),
    }}>
            <App />
    </Context.Provider>
);
reportWebVitals();
