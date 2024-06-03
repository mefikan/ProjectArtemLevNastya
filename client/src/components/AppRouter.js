import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Route, Routes} from "react-router-dom";
import SwipePage from "../Pages/SwipePage";
import HomePage from "../Pages/HomePage";
import Auth from "../Pages/Auth";
import Admin from "../Pages/AdminPage";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>
            <Route path={'/swipe'} element={<SwipePage/>}/>
            <Route path={'/'} element={user.isAuth === true ? <HomePage/> : <Auth/>}/>
            <Route path={'/auth'} element={<Auth/>}/>
            <Route path={'/login'} element={<Auth/>}/>
            <Route path={'/registration'} element={<Auth/>}/>
            <Route path={'/admin'} element={<Admin/>}></Route>
        </Routes>
    )
});

export default AppRouter;