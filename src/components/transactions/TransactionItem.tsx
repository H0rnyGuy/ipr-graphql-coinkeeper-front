import '../../styles/transactions/TransactionItem.css';

export const TransactionItem = ({ transaction }) => {
    const typeText = transaction.type === 1 ? "Income" : "Expense";
    const formattedDate = new Date(transaction.transactionDate).toLocaleDateString();

    return (
        <div className="transaction-item">
            <p className="transaction-desc">{transaction.description}</p>
            <p className="transaction-type">{typeText}</p>
            <p className="transaction-amount">${transaction.amount.toFixed(2)}</p>
            <p className="transaction-date">{formattedDate}</p>
        </div>
    );
};
