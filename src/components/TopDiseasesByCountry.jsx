// src/components/TopDiseasesByCountry.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopDiseasesByCountry = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/data')
            .then(res => {
                const raw = res.data;

                // Agrupamos enfermedades por país sumando la población afectada
                const grouped = {};
                raw.forEach(entry => {
                    const country = entry.Country;
                    const disease = entry["Disease Name"];
                    const population = parseInt(entry["Population Affected"], 10) || 0;

                    if (!grouped[country]) grouped[country] = {};
                    if (!grouped[country][disease]) grouped[country][disease] = 0;

                    grouped[country][disease] += population;
                });

                // Obtenemos la enfermedad con mayor población afectada por país
                const result = Object.entries(grouped).map(([country, diseases]) => {
                    const top = Object.entries(diseases).sort((a, b) => b[1] - a[1])[0];
                    return {
                        country,
                        disease: top[0],
                        affected: top[1],
                    };
                });

                setData(result);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    return (
        <div className="card mt-4">
            <div className="card-body">
                <h4 className="card-title">Enfermedad más reportada por país</h4>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>País</th>
                            <th>Enfermedad</th>
                            <th>Población afectada</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.country}</td>
                                <td>{row.disease}</td>
                                <td>{row.affected.toLocaleString()}</td>
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan="3">Cargando datos...</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TopDiseasesByCountry;
