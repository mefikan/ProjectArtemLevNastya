import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes} from "../../../src/routes";
import List_restaurants from "../Pages/List_restaurants";
import {Context} from "../../../src";

const AppRouter = () => {
    const {user} = userContext(Context)
    /*return (
        <switch>
            {
                user.iaAuth  && authRoutes.map(({path, component}) =>
                    <Route key ={path} path={path} component={component} exact/>
                )}
                publicRoutes.map(({path, component}) =>
                    <Route key ={path} path={path} component={component} exact/>
                )}
                <Redirect> to={List_restaurants}/>
        </switch>
    );*/
};

export default AppRouter;