import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./MainPage";
import Login from "./login";
import Registry from "./registration";
import MuseumPage from "./paginamuseo";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Paginamuseo from "./paginamuseo";

const router =createBrowserRouter([
    {
        path:"/",
        element: <MainPage/>
    },{
        path: "/login",
        element: <Login/>
    },{
        path: "/registration",
        element: <Registry/>
    },{
        path: "/paginamuseo",
        element: <Paginamuseo/>
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);
