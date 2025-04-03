import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/loginPage/LoginPage.tsx';
import CategoriesPage from './pages/categoriesPage/CategoriesPage.tsx';
import CategoryPage from './pages/categoryPage/CategoryPage.tsx';
import EmailVerificationPage from './pages/emailVerificationPage/EmailVerificationPage.tsx';
import NotFoundPage from './pages/NotFoundPage';
import ResetPasswordPage from "./pages/resetPasswordPage/ResetPasswordPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Navigate to="/categories" replace /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/categories", element: <CategoriesPage /> },
            { path: "/categories/:id", element: <CategoryPage /> },
            { path: "/verify-email", element: <EmailVerificationPage /> },
            { path: "/reset-password", element: <ResetPasswordPage />},
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

export default router;
