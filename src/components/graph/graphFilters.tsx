import { useState } from 'react';

const maxRangeDays = 30;

export const GraphFilters = ({ onChange, defaultType = null }) => {
    const [type, setType] = useState(defaultType);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleApply = () => {
        if (fromDate && toDate) {
            const diff = (new Date(toDate).getTime() - new Date(fromDate).getTime()) / (1000 * 60 * 60 * 24);
            if (diff > maxRangeDays) {
                alert('Maximum diapason is — 30 days');
                return;
            }
        }

        onChange({
            byType: type || null,
            fromDate: fromDate || null,
            toDate: toDate || null,
        });
    };

    return (
        <div className="graph-filters">
            <label>
                Тип:
                <select value={type || ''} onChange={(e) => setType(e.target.value || null)}>
                    <option value="">All</option>
                    <option value="INCOME">Income</option>
                    <option value="OUTCOME">Expenses</option>
                </select>
            </label>

            <label>
                С:
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </label>

            <label>
                По:
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </label>

            <button onClick={handleApply}>Use</button>
        </div>
    );
};
