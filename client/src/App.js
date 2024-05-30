import React, {useContext, useState} from 'react';

import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>

        </>
    )
};
export default App;