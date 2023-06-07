import React from "react";

import ReactDOM from "react-dom/client";
import MainPage from "./main";
import Login from "./login";
import Registry from "./registration";
import MuseumPage from "./paginamuseo";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Paginamuseo from "./paginamuseo";
import {ContaProvider, SearchContext, SearchProvider} from "./components/context/searchContext";
import {YourLocationContext, YourLocationProvider} from "./components/context/yourlocationContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registry />,
  },
  {
    path: "/paginamuseo",
    element: <Paginamuseo />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <SearchProvider>
      <YourLocationProvider>
        <RouterProvider router={router} />
      </YourLocationProvider>
    </SearchProvider>
);
