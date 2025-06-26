// src/components/RegistroForm.jsx
import React, { useState } from 'react';
import './RegistroForm.css';

const RegistroForm = ({ onGuardar }) => {
    const [formulario, setFormulario] = useState({
        pais: '',
        anio: '',
        enfermedad: '',
        genero: '',
        mortalidad: '',
        recuperacion: '',
        poblacion: '',
    });

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        if (Object.values(formulario).some((campo) => campo.trim() === '')) {
            alert('Por favor, completa todos los campos');
            return;
        }
        onGuardar(formulario);
        setFormulario({
            pais: '',
            anio: '',
            enfermedad: '',
            genero: '',
            mortalidad: '',
            recuperacion: '',
            poblacion: '',
        });
    };

    return (
        <div className="formulario-registro">
            <h2>Agregar Nuevo Registro</h2>
            <form onSubmit={manejarSubmit}>
                <input type="text" name="pais" placeholder="País" value={formulario.pais} onChange={manejarCambio} />
                <input type="number" name="anio" placeholder="Año" value={formulario.anio} onChange={manejarCambio} />
                <input type="text" name="enfermedad" placeholder="Enfermedad" value={formulario.enfermedad} onChange={manejarCambio} />
                <input type="text" name="genero" placeholder="Género" value={formulario.genero} onChange={manejarCambio} />
                <input type="number" step="0.01" name="mortalidad" placeholder="Mortalidad (%)" value={formulario.mortalidad} onChange={manejarCambio} />
                <input type="number" step="0.01" name="recuperacion" placeholder="Recuperación (%)" value={formulario.recuperacion} onChange={manejarCambio} />
                <input type="number" name="poblacion" placeholder="Población afectada" value={formulario.poblacion} onChange={manejarCambio} />

                <button type="submit" className="guardar-btn">Guardar</button>
            </form>
        </div>
    );
};

export default RegistroForm;
