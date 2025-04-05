import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import {apolloTransactionsClient} from "../../api";
import {DELETE_TRANSACTION} from "../../api/requests/transactions.ts";

export const useDeleteTransaction = () => {
    const [deleteTransactionMutation, { loading }] = useMutation(DELETE_TRANSACTION, {
        client: apolloTransactionsClient,
        onError: () => toast.error("Failed to delete transaction"),
    });

    const deleteTransaction = async (transactionId) => {
        const result = await deleteTransactionMutation({
            variables: {
                data: { id: transactionId },
            },
        });
        return result.data?.delete?.success;
    };

    return { deleteTransaction, loading };
};
