import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from './store/store';
import { ToastContainer } from 'react-toastify';
import ProfileMenu from './components/ProfileMenu';
import './styles/global.css';

const App = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.authentication.isAuthenticated);

    useEffect(() => {
        const isPublic =
            window.location.pathname.includes("/verify-email") ||
            window.location.pathname.includes("/reset-password") ||
            window.location.pathname.includes("/login");

        if (!isAuthenticated && !isPublic) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            {/* Добавляем меню пользователя на все "приватные" страницы */}
            {isAuthenticated && <ProfileMenu />}

            <Outlet />
            <ToastContainer position="top-right" autoClose={5000} />
        </>
    );
};

export default App;
