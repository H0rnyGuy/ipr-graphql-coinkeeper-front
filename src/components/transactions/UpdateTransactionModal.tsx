import { useState } from "react";
import { useUpdateTransaction } from "../../hooks/categoryPage/useUpdateTransaction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/transactions/UpdateTransactionModal.css";

const UpdateTransactionModal = ({ transaction, onClose, onUpdated }) => {
    const [type, setType] = useState(transaction.type);
    const [amount, setAmount] = useState(transaction.amount.toString());
    const [description, setDescription] = useState(transaction.description || "");
    const [date, setDate] = useState(new Date(transaction.transactionDate));

    const { updateTransaction, loading } = useUpdateTransaction();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updated = await updateTransaction({
            tranasctionId: transaction.id,
            description,
            type,
            amount: parseFloat(amount),
            transactionDate: date.toISOString().slice(0, 10),
        });

        if (updated) {
            onUpdated?.();
            onClose();
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-title">Edit Transaction</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Type</label>
                        <select value={type} onChange={(e) => setType(Number(e.target.value))}>
                            <option value={1}>Income</option>
                            <option value={2}>Expense</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Amount</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            maxLength={500}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <DatePicker
                            selected={date}
                            onChange={(d) => setDate(d)}
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="submit" disabled={loading}>Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTransactionModal;
