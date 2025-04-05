import { forwardRef, useImperativeHandle } from "react";
import { useBalance } from "../../hooks/categoryPage/useBalance";
import '../../styles/transactions/CategoryBalance.css';

export type CategoryBalanceHandle = {
    refetch: () => void;
};

type CategoryBalanceProps = {
    categoryId: number | undefined;
    filters: object;
};

const CategoryBalanceInner = (
    { categoryId, filters }: CategoryBalanceProps,
    ref: React.Ref<CategoryBalanceHandle>
) => {
    const byCategoriesId = categoryId ? [categoryId] : []
    const { balance, loading, refetch } = useBalance({
        byCategoriesId,
        ...filters,
    });

    useImperativeHandle(ref, () => ({
        refetch,
    }));

    if (loading) return <p>Loading balance...</p>;
    if (!balance) return null;

    return (
        <div className="category-balance">

            <div className="balance-item income">
                <p>Income</p>
                <span>+${balance.totalIncome.toFixed(2)}</span>
            </div>

            <div className="balance-item total">
                <p>Balance</p>
                <span>{balance.totalBalance >= 0 ? '+' : '-'}${Math.abs(balance.totalBalance).toFixed(2)}</span>
            </div>

            <div className="balance-item outcome">
                <p>Expense</p>
                <span>-${balance.totalOutcome.toFixed(2)}</span>
            </div>

        </div>
    );
};

export const CategoryBalance = forwardRef(CategoryBalanceInner);
