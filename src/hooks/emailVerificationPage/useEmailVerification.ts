import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VERIFY_EMAIL_MUTATION } from '../../api/auth';
import { setCredentials } from '../../store/authentification/authSlice.ts';
import { toast } from 'react-toastify';
import { apolloVerificationsClient} from '../../api';

export function useEmailVerification() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [emailVerificationMutation, { loading }] = useMutation(VERIFY_EMAIL_MUTATION, {
        client: apolloVerificationsClient,
        onCompleted: (data) => {

            if (data?.verifyEmail?.session) {
                dispatch(setCredentials(data.verifyEmail.session));
                toast.success("Email подтверждён! Вы вошли в систему.");
                navigate("/categories");
            } else {
                toast.error("Ошибка подтверждения, попробуйте ещё раз.");
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

    const VerifyEmail = async (token: string) => {
        await emailVerificationMutation({
            variables: {
                data: {
                    token
                },
            },
        });
    };

    return { VerifyEmail, loading };
}
