import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import client from "./api/apolloClient";
import store from "./store/store.ts";
import router from "./router.tsx";
import {RouterProvider} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ApolloProvider>
    </React.StrictMode>
);
