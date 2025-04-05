import { useQuery } from "@apollo/client";
import { apolloUsersClient } from "../../api";
import { toast } from "react-toastify";
import {GET_PROFILE} from "../../api/requests/users.ts";

export const useProfile = () => {
    const { data, loading, error, refetch } = useQuery(GET_PROFILE, {
        client: apolloUsersClient,
    });

    if (error) {
        if (error.graphQLErrors.length > 0) {
            error.graphQLErrors.forEach(({ message }) => toast.error(`Error: ${message}`));
        } else {
            toast.error("Failed to load profile");
        }
    }

    return {
        profile: data?.getMe || null,
        loading,
        error,
        refetch
    };
};
