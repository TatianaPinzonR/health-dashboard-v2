import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaGlobe, FaHeartbeat, FaHospital, FaCalendarAlt } from 'react-icons/fa';

const StatsCards = () => {
    const [stats, setStats] = useState({
        countries: 0,
        mortalityRate: 0,
        recoveryRate: 0,
        diseases: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/data');
                const data = response.data;

                const uniqueCountries = new Set(data.map(d => d.Country)).size;
                const avgMortality = (
                    data.reduce((sum, d) => sum + parseFloat(d["Mortality Rate (%)"]), 0) / data.length
                ).toFixed(2);
                const avgRecovery = (
                    data.reduce((sum, d) => sum + parseFloat(d["Recovery Rate (%)"]), 0) / data.length
                ).toFixed(2);
                const uniqueDiseases = new Set(data.map(d => d["Disease Name"])).size;

                setStats({
                    countries: uniqueCountries,
                    mortalityRate: avgMortality,
                    recoveryRate: avgRecovery,
                    diseases: uniqueDiseases,
                });
            } catch (error) {
                console.error('Error al cargar las estadísticas:', error);
            }
        };

        fetchData();
    }, []);

    const cards = [
        {
            title: 'Países analizados',
            value: stats.countries,
            icon: <FaGlobe size={30} color="#03a9f4" />,
        },
        {
            title: 'Tasa de mortalidad promedio (%)',
            value: stats.mortalityRate,
            icon: <FaHeartbeat size={30} color="#f44336" />,
        },
        {
            title: 'Tasa de recuperación promedio (%)',
            value: stats.recoveryRate,
            icon: <FaHospital size={30} color="#4caf50" />,
        },
        {
            title: 'Enfermedades registradas',
            value: stats.diseases,
            icon: <FaCalendarAlt size={30} color="#9c27b0" />,
        },
    ];

    return (
        <div className="row">
            {cards.map((card, index) => (
                <div className="col-md-3 mb-4" key={index}>
                    <div className="card text-white bg-dark h-100 shadow-sm p-3 d-flex flex-column justify-content-between">
                        <div className="d-flex align-items-center mb-2">
                            <div className="me-3">{card.icon}</div>
                            <div>
                                <h6 className="mb-0">{card.title}</h6>
                            </div>
                        </div>
                        <h4 className="fw-bold text-end">{card.value}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;