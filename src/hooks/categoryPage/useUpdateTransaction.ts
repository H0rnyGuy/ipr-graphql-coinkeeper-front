import { useMutation } from "@apollo/client";
import {apolloTransactionsClient} from "../../api";
import { toast } from "react-toastify";
import {UPDATE_TRANSACTION} from "../../api/transactions.ts";

export const useUpdateTransaction = () => {
    const [updateTransactionMutation, { loading }] = useMutation(UPDATE_TRANSACTION, {
        client: apolloTransactionsClient,
        onError: () => toast.error("Failed to update transaction"),
    });

    const updateTransaction = async ({ tranasctionId, description, type, amount, transactionDate}) => {
        const result = await updateTransactionMutation({
            variables: {
                data: {
                    tranasctionId,
                    description,
                    type,
                    amount,
                    transactionDate
                },
            },
        });
        toast.success("Transaction updated");
        return result.data?.update;
    };

    return { updateTransaction, loading };
};
