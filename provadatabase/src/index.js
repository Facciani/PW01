import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './LoginAndSignUp/Pages/Home'
import Login from './LoginAndSignUp/Pages/Login'
import SignUp from './LoginAndSignUp/Pages/SignUp'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Review from "./LoginAndSignUp/Pages/Review";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },{
        path: "/login",
        element: <Login/>
    },{
        path: "/signup",
        element: <SignUp/>
    },{
        path: "/review",
        element: <Review/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
