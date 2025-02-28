import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import client from './api/apolloClient';
import store from './store/store.ts';
import router from './router.tsx';
import { RouterProvider } from 'react-router-dom';
import {GoogleOAuthProvider} from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <GoogleOAuthProvider clientId={clientId}>
                    <RouterProvider router={router} />
                </GoogleOAuthProvider>
            </Provider>
        </ApolloProvider>
    </React.StrictMode>
);
