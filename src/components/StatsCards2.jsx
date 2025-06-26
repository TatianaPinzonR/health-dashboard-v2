import React from "react";
import { FaGlobe, FaHeartbeat, FaHospital, FaCalendarAlt } from "react-icons/fa";

const StatsCards2 = ({
                         data,
                         selectedCountries,
                         selectedDiseases,
                         selectedYears,
                         selectedGenders,
                     }) => {
    const filteredData = data.filter((item) => {
        return (
            (selectedCountries.length === 0 || selectedCountries.includes(item.Country)) &&
            (selectedDiseases.length === 0 || selectedDiseases.includes(item["Disease Name"])) &&
            (selectedYears.length === 0 || selectedYears.includes(item.Year)) &&
            (selectedGenders.length === 0 || selectedGenders.includes(item.Gender))
        );
    });

    const uniqueCountries = [...new Set(filteredData.map((item) => item.Country))];
    const uniqueDiseases = [...new Set(filteredData.map((item) => item["Disease Name"]))];

    const avgMortality =
        filteredData.reduce((sum, item) => sum + parseFloat(item["Mortality Rate (%)"]), 0) /
        (filteredData.length || 1);

    const avgRecovery =
        filteredData.reduce((sum, item) => sum + parseFloat(item["Recovery Rate (%)"]), 0) /
        (filteredData.length || 1);

    return (
        <div className="stats-cards">
            <div className="card">
                <FaGlobe />
                <p>Países analizados</p>
                <h2>{uniqueCountries.length}</h2>
            </div>
            <div className="card">
                <FaHeartbeat />
                <p>Tasa de mortalidad promedio (%)</p>
                <h2>{avgMortality.toFixed(2)}</h2>
            </div>
            <div className="card">
                <FaHospital />
                <p>Tasa de recuperación promedio (%)</p>
                <h2>{avgRecovery.toFixed(2)}</h2>
            </div>
            <div className="card">
                <FaCalendarAlt />
                <p>Enfermedades registradas</p>
                <h2>{uniqueDiseases.length}</h2>
            </div>
        </div>
    );
};

export default StatsCards2;
