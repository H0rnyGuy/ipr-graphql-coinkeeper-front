import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from './store/store';
import { ToastContainer } from 'react-toastify';

const App = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.authentication.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated && !window.location.pathname.includes("/verify-email") && !window.location.pathname.includes("/reset-password")) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <Outlet />
            <ToastContainer position="top-right" autoClose={5000} />
        </>
    );

};

export default App;
