import { useQuery } from "@apollo/client";
import {apolloDashboardClient} from "../../api";
import { toast } from "react-toastify";
import {GET_BALANCE} from "../../api/dashboard.ts";

export const useBalance = ({ byCategoriesId = [], byType = null, fromDate = null }) => {
    const { data, loading, error, refetch } = useQuery(GET_BALANCE, {
        variables: {
            data: {
                ...(byType !== null && { byType }),
                byCategoriesId,
                ...(fromDate !== null && { fromDate }),
            }
        },
        client: apolloDashboardClient,
    });

    if (error) {
        if (error.graphQLErrors.length > 0) {
            error.graphQLErrors.forEach(({ message }) => toast.error(`Error: ${message}`));
        } else {
            toast.error("Failed to load balance");
        }
    }

    return {
        balance: data?.getTotal || null,
        loading,
        error,
        refetch
    };
};
