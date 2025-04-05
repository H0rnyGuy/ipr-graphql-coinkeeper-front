import { useMutation } from "@apollo/client";
import { apolloUsersClient } from "../../api";
import { toast } from "react-toastify";
import { CHANGE_PASSWORD } from "../../api/requests/users.ts";

export const useChangePassword = () => {
    const [ChangePasswordMutation, { loading }] = useMutation(CHANGE_PASSWORD, {
        client: apolloUsersClient,
        onError: () => toast.error("Failed to change password"),
    });

    const changerPassword = async ({ oldPassword, password }) => {
        const result = await ChangePasswordMutation({
            variables: {
                data: {
                    oldPassword,
                    password
                },
            },
        });
        toast.success("Password changed");
        return result.data?.delete?.success;
    };

    return { changerPassword, loading };
};
