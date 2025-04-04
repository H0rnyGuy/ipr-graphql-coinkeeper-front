import { useBalance } from "../../hooks/categoryPage/useBalance";
import '../../styles/transactions/CategoryBalance.css';

export const CategoryBalance = ({ categoryId, filters }) => {
    const { balance, loading } = useBalance({
        byCategoriesId: [categoryId],
        ...filters,
    });

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
