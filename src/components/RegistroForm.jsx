// src/components/RegistroForm.jsx
import React, { useState } from "react";
import "./RegistroForm.css";

const RegistroForm = ({ onAdd }) => {
    const [formVisible, setFormVisible] = useState(true);
    const [nuevoRegistro, setNuevoRegistro] = useState({
        pais: "",
        año: "",
        enfermedad: "",
        genero: "",
        mortalidad: "",
        recuperacion: "",
        poblacion: "",
    });

    const handleChange = (e) => {
        setNuevoRegistro({
            ...nuevoRegistro,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(nuevoRegistro).some((v) => v === "")) return;
        onAdd(nuevoRegistro);
        setNuevoRegistro({
            pais: "",
            año: "",
            enfermedad: "",
            genero: "",
            mortalidad: "",
            recuperacion: "",
            poblacion: "",
        });
    };

    return (
        <div className="registro-form-container">
            <div className="form-header">
                <h2>Agregar Nuevo Registro</h2>
                <button
                    className="toggle-btn"
                    onClick={() => setFormVisible((prev) => !prev)}
                    title={formVisible ? "Ocultar formulario" : "Mostrar formulario"}
                >
                    {formVisible ? "−" : "+"}
                </button>
            </div>

            {formVisible && (
                <form onSubmit={handleSubmit} className="registro-form">
                    <input
                        type="text"
                        name="pais"
                        placeholder="País"
                        value={nuevoRegistro.pais}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="año"
                        placeholder="Año"
                        value={nuevoRegistro.año}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="enfermedad"
                        placeholder="Enfermedad"
                        value={nuevoRegistro.enfermedad}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="genero"
                        placeholder="Género"
                        value={nuevoRegistro.genero}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        step="any"
                        name="mortalidad"
                        placeholder="Mortalidad (%)"
                        value={nuevoRegistro.mortalidad}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        step="any"
                        name="recuperacion"
                        placeholder="Recuperación (%)"
                        value={nuevoRegistro.recuperacion}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="poblacion"
                        placeholder="Población afectada"
                        value={nuevoRegistro.poblacion}
                        onChange={handleChange}
                    />
                    <button type="submit">Guardar</button>
                </form>
            )}
        </div>
    );
};

export default RegistroForm;

