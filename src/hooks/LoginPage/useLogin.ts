import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from '../../api/requests/auth.ts';
import { setCredentials } from '../../store/authentification/authSlice.ts';
import { toast } from 'react-toastify';
import { apolloSessionsClient } from '../../api';

export function useLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
        client: apolloSessionsClient,
        onCompleted: (data) => {
            if (data.session_login) {
                dispatch(setCredentials(data.session_login));
                navigate("/categories");
            }
        },
        onError: (error) => {
            if (error.graphQLErrors.length > 0) {
                error.graphQLErrors.forEach(({ message }) => toast.error(`Error: ${message}`));
            } else {
                toast.error("Unknown error occurred please try again");
            }
        },
    });

    const login = async (email: string, password: string) => {
        await loginMutation({
            variables: {
                loginData: {
                    email,
                    password,
                    lifeTime: 1000000000,
                },
            },
        });
    };

    return { login, loading };
}
