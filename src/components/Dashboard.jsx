// src/components/Dashboard.jsx
import React from 'react';
import StatsCards from './StatsCards';
import Charts from './Charts';
import TopDiseasesByCountry from './TopDiseasesByCountry';
import TopCountriesTable from './TopCountriesTable';

const Dashboard = () => {
    return (
        <div className="content-wrapper">
            {/* Título principal */}

            <div className="page-header">
                <h3 className="page-title">Resumen Global de Salud</h3>
            </div>
            {/* Tarjetas de estadísticas */}
            <div className="row">
                <StatsCards />
            </div>

            {/* Tabla de países con más casos */}
            <div className="row mt-4">
                <div className="col-md-6 grid-margin stretch-card">
                    <TopCountriesTable />
                </div>

                {/* Ranking de enfermedades por país */}
                <div className="col-md-6 grid-margin stretch-card">
                    <TopDiseasesByCountry />
                </div>
            </div>

            {/* Gráficos principales */}
            <div className="row mt-4">
                <Charts />
            </div>
        </div>
    );
};

export default Dashboard;
