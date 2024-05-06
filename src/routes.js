import {
    ADMIN_Route,
    LIST_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    RESTAURANT_ROUTE
} from "../node-postgres/frontend/utils/consts";
import List_restaurants from "../node-postgres/frontend/Pages/List_restaurants";
import RestaurantPage from "../node-postgres/frontend/Pages/RestaurantPage";

export const authRoutes = [
    {
        path: ADMIN_Route,
        Component: Admin
    },
]

export const publicRoutes = [
    {
        path: LIST_ROUTE,
        component : List
    },
    {
        path: RESTAURANT_ROUTE + '/:id',
        component : RestaurantPage
    },
    {
        path: REGISTRATION_ROUTE,
        component: Auth
    },
    {
        path: LOGIN_ROUTE,
        component: Auth
    }
]
