import { useMutation } from '@apollo/client';
import { SEND_RESET_PASSWORD_EMAIL } from '../../api/requests/auth.ts';
import { toast } from 'react-toastify';
import { apolloVerificationsClient } from '../../api';

export function useForgotPassword() {
    const [sendResetEmailMutation, { loading }] = useMutation(SEND_RESET_PASSWORD_EMAIL, {
        client: apolloVerificationsClient,
        onCompleted: (data) => {
            if (data?.resetPassword?.success) {
                toast.success("Reset request sent. Check your email in nearest time");
            } else {
                toast.error("Error while sending email");
            }
        },
        onError: (error) => {
            if (error.graphQLErrors.length > 0) {
                error.graphQLErrors.forEach(({ message }) => toast.error(`Error: ${message}`));
            } else {
                toast.error("Неизвестная ошибка, попробуйте ещё раз.");
            }
        },
    });

    const sendResetEmail = async (email: string) => {
        await sendResetEmailMutation({
            variables: { data: { email } },
        });
    };

    return { sendResetEmail, loading };
}
