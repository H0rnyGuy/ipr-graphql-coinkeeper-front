import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import {setContext} from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("accessToken"); // Берём токен из localStorage
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const createApolloClient = (prefix: string = "") => {
    return new ApolloClient({
        link: from([
            authLink,
            new HttpLink({ uri: `http://localhost:3000/graphql${prefix}` , fetchOptions: { mod: "cors" } }),
        ]),
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;
