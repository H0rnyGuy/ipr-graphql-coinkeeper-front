import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../../api/auth';
import { toast } from 'react-toastify';
import { apolloUsersClient } from '../../api';

export function useRegister() {
    const [registerMutation, { loading }] = useMutation(REGISTER_MUTATION, {
        client: apolloUsersClient,
        onCompleted: (data) => {
            if (data.signup.email) {
                toast.success(`Conformation email is sent to ${data.signup.email}`);
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

    const register = async (username: string, email: string, password: string) => {
        await registerMutation({
            variables: {
                data: {
                    username,
                    email,
                    password,
                },
            },
        });
    };

    return { register, loading };
}
