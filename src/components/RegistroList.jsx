import React, { useEffect, useState } from 'react';
import './RegistroList.css';

const RegistroList = () => {
    const [registros, setRegistros] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [registrosPorPagina] = useState(10);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const respuesta = await fetch('http://localhost:3001/api/data');
                const datos = await respuesta.json();
                setRegistros(datos);
            } catch (error) {
                console.error('Error en la respuesta del backend', error);
            }
        };

        obtenerDatos();
    }, []);

    const registrosFiltrados = registros.filter((r) =>
        Object.values(r)
            .join(' ')
            .toLowerCase()
            .includes(filtro.toLowerCase())
    );

    const totalPaginas = Math.ceil(registrosFiltrados.length / registrosPorPagina);
    const indiceInicial = (paginaActual - 1) * registrosPorPagina;
    const indiceFinal = indiceInicial + registrosPorPagina;
    const registrosActuales = registrosFiltrados.slice(indiceInicial, indiceFinal);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    const exportarCSV = () => {
        const encabezados = Object.keys(registros[0]).join(',');
        const filas = registros.map((r) => Object.values(r).join(','));
        const contenido = [encabezados, ...filas].join('\n');

        const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = 'registros.csv';
        enlace.click();
    };

    return (
        <div className="tabla-container">
            <div className="tabla-header">
                <h2>Listado de Registros</h2>
                <input
                    type="text"
                    placeholder="Filtrar registros..."
                    className="filtro-input"
                    value={filtro}
                    onChange={(e) => {
                        setFiltro(e.target.value);
                        setPaginaActual(1);
                    }}
                />
                <button onClick={exportarCSV} className="descargar-btn">↓ Descargar CSV</button>
            </div>

            <table className="tabla-registros">
                <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Enfermedad</th>
                    <th>Género</th>
                    <th>Mortalidad (%)</th>
                    <th>Recuperación (%)</th>
                    <th>Población afectada</th>
                </tr>
                </thead>
                <tbody>
                {registrosActuales.map((r, i) => (
                    <tr key={i}>
                        <td>{r['Country']}</td>
                        <td>{r['Year']}</td>
                        <td>{r['Disease Name']}</td>
                        <td>{r['Gender']}</td>
                        <td>{r['Mortality Rate (%)']}</td>
                        <td>{r['Recovery Rate (%)']}</td>
                        <td>{r['Population Affected']}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="paginacion">
                <button onClick={() => cambiarPagina(paginaActual - 1)}>Anterior</button>
                <span>Página {paginaActual} de {totalPaginas}</span>
                <button onClick={() => cambiarPagina(paginaActual + 1)}>Siguiente</button>
            </div>
        </div>
    );
};

export default RegistroList;
