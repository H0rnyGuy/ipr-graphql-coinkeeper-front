import { forwardRef, useImperativeHandle } from "react";
import { useTransactions } from "../../hooks/categoryPage/useTransactions.ts";
import { TransactionItem } from "./TransactionItem.tsx";

export type TransactionListHandle = {
    refetch: () => void;
};

export type TransactionListProps = {
    categoryId: number;
    filters: any;
};

const TransactionListInner = (
    { categoryId, filters }: TransactionListProps,
    ref: React.Ref<TransactionListHandle>
) => {
    const { data: transactions, loading, refetch } = useTransactions({
        byCategoriesId: [categoryId],
        ...filters,
    });

    useImperativeHandle(ref, () => ({
        refetch,
    }));

    if (loading) return <p>Loading transactions...</p>;
    if (transactions.length === 0) return <p>No transactions found.</p>;

    return (
        <div className="transaction-list">
            {transactions.map((t) => (
                <TransactionItem key={t.id} transaction={t} />
            ))}
        </div>
    );
};

export const TransactionList = forwardRef(TransactionListInner);
