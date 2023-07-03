import React from "react";

import ReactDOM from "react-dom/client";
import MainPage from "./main";
import Login from "./login";
import Registry from "./registration";
import MuseumPage from "./paginamuseo";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Paginamuseo from "./paginamuseo";
import {
  ContaProvider,
  SearchContext,
  SearchProvider,
} from "./components/context/searchContext";
import {
  YourLocationContext,
  YourLocationProvider,
} from "./components/context/yourlocationContext";
import {
  SearchResultContext,
  SearchResultProvider,
} from "./components/context/searchResult";
import { IdMuseoProvider } from "./components/context/idMuseoContext";
import PaginaUtente from "./paginaUtente";
import Paginaartista from "./paginaartista";
import PaginaMostra from "./paginamostra";
import {IdMostraProvider} from "./components/context/idMostraContext";

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
    path: "/paginamuseo/:id",
    element: <Paginamuseo />,
  },
  {
    path: "/paginautente",
    element: <PaginaUtente />,
  },
  {
    path: "/paginaartista/:id",
    element: <Paginaartista />,
  },
  {
    path: "/paginamostra/:id",
    element: <PaginaMostra />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SearchProvider>
    <YourLocationProvider>
      <SearchResultProvider>
        <IdMuseoProvider>
          <IdMostraProvider>
            <RouterProvider router={router} />
          </IdMostraProvider>
        </IdMuseoProvider>
      </SearchResultProvider>
    </YourLocationProvider>
  </SearchProvider>
);
