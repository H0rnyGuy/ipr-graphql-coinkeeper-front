import { useMutation } from "@apollo/client";
import { apolloUsersClient } from "../../api";
import { toast } from "react-toastify";
import { UPDATE_PROFILE } from "../../api/requests/users.ts";

export const useUpdateProfile = () => {
    const [updateProfileMutation, { loading }] = useMutation(UPDATE_PROFILE, {
        client: apolloUsersClient,
        onError: () => toast.error("Failed to update profile"),
    });

    const updateProfile = async ({ firstName, lastName }) => {
        const result = await updateProfileMutation({
            variables: {
                data: {
                    firstName,
                    lastName
                },
            },
        });
        toast.success("Profile updated");
        return result.data?.updateMe;
    };

    return { updateProfile, loading };
};
