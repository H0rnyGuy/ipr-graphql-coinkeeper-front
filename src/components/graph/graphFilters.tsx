import { useEffect, useState } from "react";
import '../../styles/graph/GraphFilters.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    const [days, setDays] = useState(7);

    const now = new Date();
    const from = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const [fromDate, setFromDate] = useState(now);
    const [toDate, setToDate] = useState(from);

    useEffect(() => {
        if (days === "custom") return;

        setFromDate(from);
        setToDate(now);

        onChange({
            byType: type,
            fromDate: from,
            toDate: now,
        });
    }, [type, days]);

    const handleCustomSubmit = () => {
        if (!fromDate || !toDate) return;

        const diff = (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);

        if (diff > 30) {
            alert("Date range can't be more than 30 days.");
            return;
        }

        if (fromDate > toDate) {
            alert("Start date can't be after end date.");
            return;
        }

        onChange({
            byType: type,
            fromDate,
            toDate,
        });
    };

    return (
        <div className="graph-filters">
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
                        From:
                        <DatePicker
                            selected={fromDate}
                            onChange={(d) => setFromDate(d)}
                            dateFormat="yyyy-MM-dd"
                            maxDate={new Date()}
                        />
                    </label>
                    <label>
                        To:
                        <DatePicker
                            selected={toDate}
                            onChange={(d) => setToDate(d)}
                            dateFormat="yyyy-MM-dd"
                            maxDate={new Date()}
                        />
                    </label>
                    <button onClick={handleCustomSubmit}>Use</button>
                </div>
            )}
        </div>
    );
};
