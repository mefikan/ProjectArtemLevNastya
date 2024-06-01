import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Route, Routes} from "react-router-dom";
import SwipePage from "../Pages/SwipePage";
import HomePage from "../Pages/HomePage";
import Auth from "../Pages/Auth";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            <Route path={'/swipe'} element={<SwipePage/>}/>
            <Route path={'/'} element={<HomePage/>}/>
            <Route path={'/auth'} element={<Auth/>}/>
            <Route path={'/login'} element={<Auth/>}/>
            <Route path={'/registration'} element={<Auth/>}/>
        </Routes>
    )
};

export default AppRouter;