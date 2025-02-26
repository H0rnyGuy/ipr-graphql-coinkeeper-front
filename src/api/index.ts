import createApolloClient from './apolloClient';

export const apolloClient = createApolloClient(); // Для стандартных запросов
export const apolloSessionsClient = createApolloClient("-sessions"); // Для sessions
export const apolloUsersClient = createApolloClient("-users"); // Для users
export const apolloVerificationsClient = createApolloClient("-verifications"); // Для verifications

