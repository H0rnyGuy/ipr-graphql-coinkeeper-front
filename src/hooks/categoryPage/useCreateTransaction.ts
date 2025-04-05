import { useMutation } from "@apollo/client";
import { apolloTransactionsClient} from "../../api";
import { toast } from "react-toastify";
import {CREATE_TRANSACTION} from "../../api/requests/transactions.ts";

export const useCreateTransaction = () => {
    const [createTransactionMutation, { loading }] = useMutation(CREATE_TRANSACTION, {
        client: apolloTransactionsClient,
        onError: (error) => {
            toast.error("Failed to create category");
            console.error(error);
        }
    });

    const createTransaction = async ({ categoryId, type, amount, description, transactionDate }) => {
        const result = await createTransactionMutation({
            variables: {
                data: {
                    categoryId,
                    type,
                    amount,
                    description,
                    transactionDate
                }
            }
        });
        return result.data?.create;
    };

    return { createTransaction, loading };
};
