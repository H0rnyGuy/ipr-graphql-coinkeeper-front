import { TransactionItem } from "./TransactionItem.tsx";
import {useTransactions} from "../../hooks/categoryPage/useTransactions.ts";
import '../../styles/transactions/TransactionList.css';

export const TransactionList = ({ categoryId, filters }) => {
    const { data: transactions, loading } = useTransactions({
        byCategoriesId: [categoryId],
        ...filters,
    });

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
