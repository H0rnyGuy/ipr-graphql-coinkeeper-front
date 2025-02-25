import createApolloClient from "./apolloClient";

export const apolloClient = createApolloClient(); // Для стандартных запросов
export const apolloSessionsClient = createApolloClient("-sessions"); // Для логина/сессий
export const apolloUsersClient = createApolloClient("-users"); // Для логина/users

