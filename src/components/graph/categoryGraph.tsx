import {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import { GraphFilters } from './GraphFilters.tsx';
import {
    Chart as ChartJS, LineElement, PointElement,
    CategoryScale, LinearScale, Tooltip, Legend, TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import {useGraphic} from "../../hooks/categoryPage/useGraphic.ts";
import {AutocompleteSelect} from "./AutocompleteSelect.tsx";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, TimeScale);

const getColorVariants = (baseColor) => ({
    income: baseColor,
    outcome: baseColor === 'green' ? 'rgba(255, 0, 0, 0.6)' : 'rgba(255, 99, 132, 0.6)',
});

const mapDataToChart = (data, colorSet, labelSuffix = '') => ({
    datasets: [
        {
            label: `Доход${labelSuffix}`,
            data: data.map(d => ({ x: d.transactionDate, y: d.totalIncome })),
            borderColor: colorSet.income,
            backgroundColor: colorSet.income,
            tension: 0.3,
        },
        {
            label: `Расход${labelSuffix}`,
            data: data.map(d => ({ x: d.transactionDate, y: d.totalOutcome })),
            borderColor: colorSet.outcome,
            backgroundColor: colorSet.outcome,
            tension: 0.3,
        }
    ]
});

export const CategoryGraph = ({ categoryId, allCategories = [] }) => {

    const [filters, setFilters] = useState({});
    const [compareMode, setCompareMode] = useState(false);
    const [compareCategoryId, setCompareCategoryId] = useState(null);
    const [compareFilters, setCompareFilters] = useState({});

    const [localCategories, setLocalCategories] = useState(allCategories || []);

    const { report: mainData, loading: loadingMain } = useGraphic({
        byCategoriesId: [categoryId],
        ...filters,
    });

    const { report: compareData, loading: loadingCompare } = useGraphic({
        byCategoriesId: compareCategoryId ? [compareCategoryId] : [],
        ...compareFilters,
    });

    const datasets1 = mapDataToChart(mainData?.dashboardData || [], getColorVariants('green'));
    const datasets2 = compareMode && compareData?.dashboardData
        ? mapDataToChart(compareData.dashboardData, getColorVariants('blue'), ' (Сравнение)')
        : { datasets: [] };


    return (
        <div className="category-graph-container">
            <h3>📈 График по категории</h3>

            <GraphFilters onChange={setFilters} />

            <button onClick={() => setCompareMode((prev) => !prev)} style={{ margin: '10px 0' }}>
                {compareMode ? 'Убрать сравнение' : 'Сравнить с другой категорией'}
            </button>

            {compareMode && (
                <div className="compare-panel" style={{ marginTop: '1rem' }}>
                    <label>Категория для сравнения:</label>

                    <AutocompleteSelect
                        value={compareCategoryId}
                        onChange={setCompareCategoryId}
                        placeholder="Введите название категории"
                        renderLabel={(item) => item.name}
                    />

                    {compareCategoryId && (
                        <GraphFilters onChange={setCompareFilters} />
                    )}
                </div>
            )}

            {loadingMain ? (
                <p>Загрузка графика...</p>
            ) : (
                <Line
                    data={{ datasets: [...datasets1.datasets, ...datasets2.datasets] }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            tooltip: { mode: 'index', intersect: false },
                        },
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'day',
                                    tooltipFormat: 'yyyy-MM-dd',
                                },
                            },
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};
