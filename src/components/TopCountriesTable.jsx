import React, { useEffect, useState } from 'react';
import axios from 'axios';

const countryCodeMap = {
    Italy: 'it',
    France: 'fr',
    'Saudi Arabia': 'sa',
    Indonesia: 'id',
    USA: 'us',
    Nigeria: 'ng',
    Australia: 'au',
    Canada: 'ca',
    Japan: 'jp',
    Germany: 'de',
    Brazil: 'br',
    India: 'in',
    China: 'cn',
    UK: 'gb'
};

const TopCountriesTable = () => {
    const [topCountries, setTopCountries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/data');
                const data = res.data;

                // Agrupar por país y sumar población afectada
                const aggregated = data.reduce((acc, curr) => {
                    const country = curr.Country;
                    const affected = parseInt(curr['Population Affected']) || 0;

                    if (!acc[country]) {
                        acc[country] = { country, total: 0 };
                    }

                    acc[country].total += affected;
                    return acc;
                }, {});

                const result = Object.values(aggregated)
                    .sort((a, b) => b.total - a.total)
                    .slice(0, 10);

                setTopCountries(result);
            } catch (error) {
                console.error('Error al cargar datos por país:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="card mt-4">
            <div className="card-body">
                <h4 className="card-title">Top 10 Países Por Número De Casos</h4>
                <div className="table-responsive">
                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th>País</th>
                            <th>Casos</th>
                        </tr>
                        </thead>
                        <tbody>
                        {topCountries.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <img
                                        src={`https://flagcdn.com/24x18/${countryCodeMap[item.country]?.toLowerCase() || 'xx'}.png`}
                                        alt={item.country}
                                        style={{ marginRight: 8 }}
                                    />
                                    {item.country}
                                </td>
                                <td>{item.total.toLocaleString()}</td>
                            </tr>
                        ))}
                        {topCountries.length === 0 && (
                            <tr>
                                <td colSpan="2">Cargando datos...</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TopCountriesTable;
