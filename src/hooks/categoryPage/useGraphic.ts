import { useQuery } from "@apollo/client";
import {apolloDashboardClient} from "../../api";
import { toast } from "react-toastify";
import { GET_GRAPHIC } from "../../api/requests/dashboard.ts";

export const useGraphic = ({ byCategoriesId = [], byType = null, fromDate = null, toDate = null}) => {
    const { data, loading, error, refetch } = useQuery(GET_GRAPHIC, {
        variables: {
            data: {
                ...(byType !== null && { byType }),
                byCategoriesId,
                ...(fromDate !== null && { fromDate }),
                ...(toDate !== null && { toDate }),
            }
        },
        client: apolloDashboardClient,
    });

    if (error) {
        if (error.graphQLErrors.length > 0) {
            error.graphQLErrors.forEach(({ message }) => toast.error(`Error: ${message}`));
        } else {
            toast.error("Failed to load graphic");
        }
    }

    return {
        report: data?.getTransactions || null,
        loading,
        error,
        refetch
    };
};
