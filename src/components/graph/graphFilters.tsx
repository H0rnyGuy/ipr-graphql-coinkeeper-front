import { useEffect, useState } from "react";
import '../../styles/transactions/TransactionFilters.css';

const TRANSACTION_TYPES = [
    { label: "All", value: null },
    { label: "Income", value: "INCOME" },
    { label: "Expense", value: "OUTCOME" },
];

const DATE_RANGES = [
    { label: "Last 7 days", value: 7 },
    { label: "Last 30 days", value: 30 },
    { label: "Custom", value: "custom" },
];

export const GraphFilters = ({ onChange }) => {
    const [type, setType] = useState(null);
    const [days, setDays] = useState(7); // Default: Last 7 days
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        if (days === "custom") return;

        const now = new Date();
        const from = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

        onChange({
            byType: type,
            fromDate: from.toISOString().slice(0, 10),
            toDate: now.toISOString().slice(0, 10),
        });
    }, [type, days]);

    const handleCustomSubmit = () => {
        if (!fromDate || !toDate) return;

        const from = new Date(fromDate);
        const to = new Date(toDate);
        const diff = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);

        if (diff > 30) {
            alert("Диапазон не может превышать 30 дней.");
            return;
        }

        onChange({
            byType: type,
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
                        onClick={() => setType(t.value)}
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
                        onClick={() => setDays(d.value)}
                        className={d.value === days ? "active" : ""}
                    >
                        {d.label}
                    </button>
                ))}
            </div>

            {days === "custom" && (
                <div className="custom-range">
                    <label>
                        С:
                        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    </label>
                    <label>
                        По:
                        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                    </label>
                    <button onClick={handleCustomSubmit}>Use</button>
                </div>
            )}
        </div>
    );
};
