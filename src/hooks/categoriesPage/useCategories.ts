import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../api/requests/categories.ts";
import { apolloCategoriesClient } from "../../api";
import { toast } from "react-toastify";

export const useCategories = ({ offset = 0, limit = 12, q = "", byType = null }) => {
    const { data, loading, error, refetch } = useQuery(GET_CATEGORIES, {
        variables: {
            data: {
                limit,
                offset,
                ...(q && { q }),
                ...(byType !== null && { byType }),
            }
        },
        client: apolloCategoriesClient,
    });

    if (error) {
        if (error.graphQLErrors.length > 0) {
            error.graphQLErrors.forEach(({ message }) => toast.error(`Error: ${message}`));
        } else {
            toast.error("Failed to load categories");
        }
    }

    return {
        data: data?.getList?.data || [],
        pagination: data?.getList?.pagination || {},
        loading,
        refetch,
    };
};
