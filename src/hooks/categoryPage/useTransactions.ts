import { useQuery } from "@apollo/client";
import {apolloTransactionsClient} from "../../api";
import { toast } from "react-toastify";
import {GET_TRANSACTIONS} from "../../api/transactions.ts";

export const useTransactions = ({ offset = 0, limit = 12, byType = null, byCategoriesId = [], fromDate = null }) => {
    const { data, loading, error, refetch } = useQuery(GET_TRANSACTIONS, {
        variables: {
            data: {
                limit,
                offset,
                ...(byType !== null && { byType }),
                byCategoriesId,
                ...(fromDate !== null && { fromDate }),
            }
        },
        client: apolloTransactionsClient,
    });

    if (error) {
        if (error.graphQLErrors.length > 0) {
            error.graphQLErrors.forEach(({ message }) => toast.error(`Error: ${message}`));
        } else {
            toast.error("Failed to load transactions");
        }
    }

    return {
        data: data?.getList?.data || [],
        pagination: data?.getList?.pagination || {},
        loading,
        refetch,
    };
};
