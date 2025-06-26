// src/pages/Registros.jsx
import React from 'react';
import RegistroList from '../components/RegistroList';
import RegistroForm from '../components/RegistroForm';

export default function Registros() {
    return (
        <div className="content-wrapper px-4 pt-0">
            <div className="content-wrapper px-4 pt-0">
                <div className="page-header">
                    <h3 className="page-title"></h3>
                </div>

                <div className="row">
                    {/* Tabla de registros */}
                    <div className="col-md-8 grid-margin stretch-card">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h4 className="card-title">Registros existentes</h4>
                                <RegistroList />
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="col-md-4 grid-margin stretch-card">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <RegistroForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
