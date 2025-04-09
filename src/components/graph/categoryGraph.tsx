import {useState} from 'react';
import { Line } from 'react-chartjs-2';
import { GraphFilters } from './GraphFilters.tsx';
import {
    Chart as ChartJS, LineElement, PointElement,
    CategoryScale, LinearScale, Tooltip, Legend, TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import {useGraphic} from "../../hooks/categoryPage/useGraphic.ts";
import {AutocompleteSelect} from "./AutocompleteSelect.tsx";
import '../../styles/graph/CategoryGraph.css'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, TimeScale);

const getColorVariants = (baseColor) => ({
    income: baseColor,
    outcome: baseColor === 'green' ? 'rgba(255, 0, 0, 0.6)' : 'rgba(255, 99, 132, 0.6)',
});

const mapDataToChart = (data, colorSet, labelSuffix = '', compareMode) => ({
    datasets: [
        {
            label: `Income${labelSuffix}`,
            data: data.map(d => ({ x: d.transactionDate, y: d.totalIncome })),
            borderColor: colorSet.income,
            backgroundColor: colorSet.income,
            tension: 0.3,
            borderDash: compareMode ? [5, 5] : [],
        },
        {
            label: `Expense${labelSuffix}`,
            data: data.map(d => ({ x: d.transactionDate, y: d.totalOutcome })),
            borderColor: colorSet.outcome,
            backgroundColor: colorSet.outcome,
            tension: 0.3,
            borderDash: compareMode ? [5, 5] : [],
        }
    ]
});

export const CategoryGraph = ({ categoryId, allCategories = [] }) => {
    const chartOptions = {
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
        hover: {
            mode: 'nearest',
            intersect: true,
            onHover: (event, chartElement) => {
                const chart = event.chart;
                const hoveredDatasetIndex = chartElement[0]?.datasetIndex;
                if (hoveredDatasetIndex !== undefined) {
                    chart.data.datasets.forEach((dataset, index) => {
                        dataset.borderColor = index === hoveredDatasetIndex ? '#FFD700' : dataset.borderColor; // Подсветка на жёлтым
                        dataset.backgroundColor = index === hoveredDatasetIndex ? '#FFD700' : dataset.backgroundColor;
                    });
                    chart.update();
                }
            },
        },
    };

    const [filters, setFilters] = useState({});
    const [compareMode, setCompareMode] = useState(false);

    const [compareCategoryId, setCompareCategoryId] = useState(null);
    const [compareCategoryName, setCompareCategoryName] = useState('All');

    const setCompareCategory = (category) => {
        setCompareCategoryId(category.id);
        setCompareCategoryName(category.name)
    }

    const { report: mainData, loading: loadingMain } = useGraphic({
        byCategoriesId: [categoryId],
        ...filters,
    });

    const { report: compareData, loading: loadingCompare } = useGraphic({
        byCategoriesId: compareCategoryId ? [compareCategoryId] : [],
        ...filters,
    });

    const datasets1 = mapDataToChart(mainData?.dashboardData || [], getColorVariants('green'), '', false);
    const datasets2 = compareMode && compareData?.dashboardData
        ? mapDataToChart(compareData.dashboardData, getColorVariants('blue'), compareCategoryName, true)
        : { datasets: [] };

    return (
        <div className="category-graph-container">
            <GraphFilters onChange={setFilters} />

            <div className="compare">
                <button onClick={() => setCompareMode((prev) => !prev)}>
                    {compareMode ? 'Stop compare' : 'Compare with another category'}
                </button>
            </div>

            {compareMode && (
                <div className="compare-panel" style={{ marginTop: '1rem' }}>
                    <label>Categories to compare with:</label>
                    <AutocompleteSelect
                        value={compareCategoryId}
                        onChange={setCompareCategory}
                        placeholder="Enter category name or description"
                        renderLabel={(item) => item.name}
                    />
                </div>
            )}

            {loadingMain ? (
                <p>Drawing graphic...</p>
            ) : (
                <Line
                    data={{ datasets: [...datasets1.datasets, ...datasets2.datasets] }}
                    options={chartOptions}
                />
            )}
        </div>
    );
};