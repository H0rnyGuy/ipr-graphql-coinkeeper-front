import { useDeleteTransaction } from "../../hooks/categoryPage/useDeleteTransaction";
import "../../styles/categories/confirmDeletionModal.css";

const ConfirmDeleteModal = ({ transaction, onClose, onDeleted }) => {
    const { deleteTransaction, loading } = useDeleteTransaction();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isDeleted = await deleteTransaction(transaction.id);
        if (isDeleted) {
            onDeleted?.();
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-title">Confirm deletion</div>
                <div className="category-info">
                    <div className="category-card-title">{transaction.description}</div>
                    <div className="category-card-dexcription">
                        Amount: ${transaction.amount.toFixed(2)}<br />
                        Date: {new Date(transaction.transactionDate).toLocaleDateString()}
                    </div>
                </div>
                <div className="modal-actions">
                    <button type="submit" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Deleting..." : "Yes, Delete"}
                    </button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
