import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { RESET_PASSWORD } from '../../api/auth';
import { toast } from 'react-toastify';
import { apolloVerificationsClient} from '../../api';

export function useResetPassword() {
    const navigate = useNavigate();

    const [resetPasswordMutation, { loading }] = useMutation(RESET_PASSWORD, {
        client: apolloVerificationsClient,
        onCompleted: (data) => {
            console.log(data)

            if (data?.confirmPassword?.success) {
                toast.success("Password is reset proceed to login.");
                navigate("/login");
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

    const resetPassword = async (password: string, token: string) => {
        await resetPasswordMutation({
            variables: {
                data: {
                    password,
                    token
                },
            },
        });
    };

    return { resetPassword, loading };
}
