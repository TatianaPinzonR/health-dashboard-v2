import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels // 👈 importante registrar el plugin
);

const Charts = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/data')
            .then((res) => {
                const dataset = res.data;

                const yearGroups = {};
                dataset.forEach(item => {
                    const year = item['Year'];
                    const m = parseFloat(item['Mortality Rate (%)']);
                    const r = parseFloat(item['Recovery Rate (%)']);

                    if (!yearGroups[year]) yearGroups[year] = { mortality: [], recovery: [] };
                    if (!isNaN(m)) yearGroups[year].mortality.push(m);
                    if (!isNaN(r)) yearGroups[year].recovery.push(r);
                });

                const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length || 0;

                const labels = Object.keys(yearGroups).sort();
                const mortalityData = labels.map(year => parseFloat(avg(yearGroups[year].mortality).toFixed(2)));
                const recoveryData = labels.map(year => parseFloat(avg(yearGroups[year].recovery).toFixed(2)));

                const chartData = {
                    labels,
                    datasets: [
                        {
                            label: 'Tasa de Mortalidad (%)',
                            data: mortalityData,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            tension: 0.4,
                        },
                        {
                            label: 'Tasa de Recuperación (%)',
                            data: recoveryData,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            tension: 0.4,
                        },
                    ],
                };

                setData(chartData);
            })
            .catch((err) => {
                console.error('❌ Error cargando datos para el gráfico:', err);
            });
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: '#fff' },
            },
            datalabels: {
                color: '#fff',
                anchor: 'end',
                align: 'top',
                font: { weight: 'bold' },
                formatter: value => value.toFixed(1), // muestra por ejemplo: 74.5
            },
        },
        scales: {
            x: {
                ticks: { color: '#fff' },
                grid: { color: '#444' },
            },
            y: {
                ticks: { color: '#fff' },
                grid: { color: '#444' },
            },
        },
    };

    return (
        <div className="card" style={{ backgroundColor: '#1e1e2f', padding: '20px', margin: '20px 0' }}>
            <h4 className="card-title text-white mb-4">Tendencias Globales Por Año</h4>
            <div style={{ height: '400px' }}>
                {data ? <Line data={data} options={options} plugins={[ChartDataLabels]} /> : <p className="text-white">Cargando...</p>}
            </div>
        </div>
    );
};

export default Charts;
