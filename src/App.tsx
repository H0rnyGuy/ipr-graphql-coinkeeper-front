import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "./store/store";

const App = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.authentication.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/categories");
        } else {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return <Outlet />;
};

export default App;
