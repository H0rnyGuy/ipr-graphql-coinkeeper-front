import { useQuery } from "@apollo/client";
import { GET_CATEGORY } from "../../api/categories";
import { apolloCategoriesClient } from "../../api";
import { toast } from "react-toastify";

export const useCategory = ({ id, skip = false }) => {
    const { data, loading, error, refetch } = useQuery(GET_CATEGORY, {
        variables: {
            data: { id }
        },
        client: apolloCategoriesClient,
        skip,
    });

    if (error) {
        if (error.graphQLErrors.length > 0) {
            error.graphQLErrors.forEach(({ message }) => toast.error(`Error: ${message}`));
        } else {
            toast.error("Failed to load category");
        }
    }

    return {
        category: data?.get || null,
        loading,
        error,
        refetch
    };
};
