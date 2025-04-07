import { useState } from "react";
import '../../styles/transactions/TransactionFilters.css';

const TRANSACTION_TYPES = [
    { label: "All", value: null },
    { label: "Income", value: "INCOME" },
    { label: "Expense", value: "OUTCOME" },
];

const DATE_RANGES = [
    { label: "All time", value: null },
    { label: "Last 30 days", value: 30 },
    { label: "Last 7 days", value: 7 },
];

export const GraphFilters = ({ onChange }) => {
    const [type, setType] = useState(null);
    const [days, setDays] = useState(null);

    const handleChange = (newType, newDays) => {
        setType(newType);
        setDays(newDays);

        let fromDate = null;
        let toDate = null;

        if (newDays !== null) {
            const now = new Date();
            const from = new Date(now.getTime() - newDays * 24 * 60 * 60 * 1000);
            fromDate = from.toISOString().slice(0, 10);
            toDate = now.toISOString().slice(0, 10);
        }

        onChange({
            byType: newType,
            fromDate,
            toDate,
        });
    };

    return (
        <div className="transaction-filters">
            <div className="filter-group">
                {TRANSACTION_TYPES.map((t) => (
                    <button
                        key={t.label}
                        onClick={() => handleChange(t.value, days)}
                        className={t.value === type ? "active" : ""}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="filter-group">
                {DATE_RANGES.map((d) => (
                    <button
                        key={d.label}
                        onClick={() => handleChange(type, d.value)}
                        className={d.value === days ? "active" : ""}
                    >
                        {d.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
