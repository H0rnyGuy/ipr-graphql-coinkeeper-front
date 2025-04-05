import { useState } from "react";
import DatePicker from "react-datepicker";
import { useCreateTransaction } from "../../hooks/categoryPage/useCreateTransaction.ts";
import '../../styles/transactions/CreateTransactionModal.css';

export const CreateTransactionModal = ({ onClose, categoryId, onSuccess }) => {
    const { createTransaction, loading } = useCreateTransaction();

    const [type, setType] = useState(1);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await createTransaction({
            categoryId,
            type,
            amount: parseFloat(amount),
            description: description || null,
            transactionDate: date.toISOString().slice(0, 10),
        });

        if (result) {
            onSuccess?.(result);
            onClose();
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">

                <div className="modal-title">Create Transaction</div>
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
                        <label>Description (optional)</label>
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
                        <button type="submit" disabled={loading}>Create</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>

                </form>

            </div>
        </div>
    );
};
