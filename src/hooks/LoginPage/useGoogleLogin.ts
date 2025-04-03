import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GOOGLE_LOGIN_MUTATION } from '../../api/auth';
import { setCredentials } from '../../store/authentification/authSlice.ts';
import { toast } from 'react-toastify';
import { apolloSessionsClient } from '../../api';

export function useGoogleLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [googleLoginMutation, { loading }] = useMutation(GOOGLE_LOGIN_MUTATION, {
        client: apolloSessionsClient,
        onCompleted: (data) => {
            if (data?.google_login?.session) {
                dispatch(setCredentials(data.google_login.session));
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

    const googleLogin = async (googleAccessToken: string) => {
        await googleLoginMutation({
            variables: {
                data: {
                    googleAccessToken,
                    lifeTime: 1000000000,
                },
            },
        });
    };

    return { googleLogin, loading };
}
