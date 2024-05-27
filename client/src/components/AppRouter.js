import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Route, Routes} from "react-router-dom";
import SwipePage from "../Pages/SwipePage";
import HomePage from "../Pages/HomePage";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            <Route path={'/swipe'} element={<SwipePage/>}/>
            <Route path={'/'} element={<HomePage/>}/>

        </Routes>
    )
};

export default AppRouter;