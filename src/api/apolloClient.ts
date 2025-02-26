import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

const createApolloClient = (prefix: string = "") => {
    return new ApolloClient({
        link: from([
            new HttpLink({ uri: `http://localhost:3000/graphql${prefix}` , fetchOptions: { mod: "cors" } }),
        ]),
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;
