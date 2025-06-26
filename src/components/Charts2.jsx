// src/components/Charts2.jsx
import React from 'react';
import {
    Bar,
    Line,
    Pie
} from 'react-chartjs-2';

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement
);

export default function Charts2({ data, selectedCountries, selectedDiseases, selectedYears, selectedGenders }) {
    // 🔍 Filtro previo con los valores seleccionados
    const filteredData = data.filter(item => {
        const matchCountry = selectedCountries.length === 0 || selectedCountries.includes(item.Country);
        const matchDisease = selectedDiseases.length === 0 || selectedDiseases.includes(item["Disease Name"]);
        const matchYear = selectedYears.length === 0 || selectedYears.includes(item.Year);
        const matchGender = selectedGenders.length === 0 || selectedGenders.includes(item.Gender);
        return matchCountry && matchDisease && matchYear && matchGender;
    });

    // Agrupar y procesar
    const diseaseStats = {};
    filteredData.forEach((item) => {
        const disease = item["Disease Name"];
        if (!diseaseStats[disease]) {
            diseaseStats[disease] = {
                count: 0,
                mortality: 0,
                recovery: 0,
                affected: 0,
            };
        }
        diseaseStats[disease].count += 1;
        diseaseStats[disease].mortality += parseFloat(item["Mortality Rate (%)"]);
        diseaseStats[disease].recovery += parseFloat(item["Recovery Rate (%)"]);
        diseaseStats[disease].affected += parseInt(item["Population Affected"]);
    });

    const diseases = Object.keys(diseaseStats);
    const avgMortality = diseases.map(d => (diseaseStats[d].mortality / diseaseStats[d].count).toFixed(2));
    const avgRecovery = diseases.map(d => (diseaseStats[d].recovery / diseaseStats[d].count).toFixed(2));
    const affectedPop = diseases.map(d => diseaseStats[d].affected);

    // Chart Data
    const barData = {
        labels: diseases,
        datasets: [
            {
                label: 'Mortalidad (%)',
                data: avgMortality,
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
            },
            {
                label: 'Recuperación (%)',
                data: avgRecovery,
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
            },
        ],
    };

    const pieData = {
        labels: diseases,
        datasets: [
            {
                label: 'Población Afectada',
                data: affectedPop,
                backgroundColor: [
                    '#007bff',
                    '#28a745',
                    '#dc3545',
                    '#ffc107',
                    '#6610f2',
                    '#17a2b8',
                    '#e83e8c',
                    '#6f42c1',
                ],
            },
        ],
    };

    const lineData = {
        labels: diseases,
        datasets: [
            {
                label: 'Mortalidad (%)',
                data: avgMortality,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    return (
        <div className="charts-wrapper">
            <div className="chart-block">
                <h3>Mortalidad vs Recuperación</h3>
                <Bar data={barData} />
            </div>

            <div className="chart-block">
                <h3>Población afectada por enfermedad</h3>
                <Pie data={pieData} />
            </div>

            <div className="chart-block">
                <h3>Tendencia de Mortalidad</h3>
                <Line data={lineData} />
            </div>
        </div>
    );
}
