import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/loginPage/LoginPage.tsx";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import EmailVerificationPage from "./pages/emailVerificationPage/EmailVerificationPage.tsx";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Navigate to="/categories" replace /> }, // Редирект на категории
            { path: "/login", element: <LoginPage /> },
            { path: "/categories", element: <CategoriesPage /> },
            { path: "/categories/:id", element: <CategoryPage /> },
            { path: "/verify-email", element: <EmailVerificationPage /> },
            { path: "*", element: <NotFoundPage /> }, // 404
        ],
    },
]);

export default router;
