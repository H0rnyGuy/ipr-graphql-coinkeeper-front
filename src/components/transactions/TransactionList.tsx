import { useState, forwardRef, useImperativeHandle } from "react";
import { useTransactions } from "../../hooks/categoryPage/useTransactions.ts";
import { TransactionItem } from "./TransactionItem.tsx";
import PaginationDots from "../PaginationDots";

export type TransactionListHandle = {
    refetch: () => void;
};

export type TransactionListProps = {
    categoryId: number;
    filters: any;
};

const PAGE_SIZE = 10;

const TransactionListInner = (
    { categoryId, filters }: TransactionListProps,
    ref: React.Ref<TransactionListHandle>
) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);

    const goToPage = (page: number) => {
        setCurrentPage(page);
        setOffset((page - 1) * PAGE_SIZE);
    };

    const { data: transactions, pagination, loading, refetch } = useTransactions({
        byCategoriesId: [categoryId],
        offset,
        limit: PAGE_SIZE,
        ...filters,
    });

    useImperativeHandle(ref, () => ({
        refetch: () => {
            goToPage(1);
            refetch();
        },
    }));

    const totalPages = Math.ceil((pagination?.totalCount || 0) / PAGE_SIZE);

    const handlePrev = () => goToPage(Math.max(currentPage - 1, 1));
    const handleNext = () => goToPage(Math.min(currentPage + 1, totalPages));

    if (loading) return <p>Loading transactions...</p>;
    if (!transactions.length) return <p>No transactions found.</p>;

    return (
        <div className="transaction-list-wrapper">
            <div className="transaction-list">
                {transactions.map((t) => (
                    <TransactionItem key={t.id} transaction={t} />
                ))}
            </div>

            {totalPages > 1 && (
                <PaginationDots
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}
        </div>
    );
};

export const TransactionList = forwardRef(TransactionListInner);
