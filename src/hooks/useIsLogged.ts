import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function useIsLogged() {
    const accessToken = useSelector(state => state.authentication.accessToken);
    const navigate = useNavigate();

    return function isLogged(page = null) {
        if (!accessToken) {
            navigate('/login');
        } else if (page) {
            navigate(`/${page}`);
        }
    };
}

