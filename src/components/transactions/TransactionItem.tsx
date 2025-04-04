import {useState} from "react";
import {FiMoreVertical} from "react-icons/fi";
import '../../styles/transactions/TransactionItem.css'

export const TransactionItem = ({ transaction, onDelete, onEdit }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const handleDeleteClick = () => {
        setMenuOpen(false);
        onDelete?.(transaction);
    };

    const handleEditClick = () => {
        setMenuOpen(false);
        onEdit?.(transaction);
    };

    return (
        <div className="transaction-item">
            <p className="transaction-desc">{transaction.description}</p>
            <p className="transaction-type">{transaction.type === 1 ? "Income" : "Expense"}</p>
            <p className="transaction-amount">${transaction.amount.toFixed(2)}</p>
            <p className="transaction-date">{new Date(transaction.transactionDate).toLocaleDateString()}</p>

            <div className="menu-container">
                <button className="menu-button" onClick={toggleMenu}>
                    <FiMoreVertical />
                </button>

                {menuOpen && (
                    <div className="menu-dropdown">
                        <button onClick={handleEditClick}>Edit</button>
                        <button onClick={handleDeleteClick}>Delete</button>
                    </div>
                )}
            </div>

        </div>
    );
};
