// src/components/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Sidebar() {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                <h4 className="text-white font-weight-bold mt-2">N O V A M E D</h4>
            </div>
            <ul className="nav">
                <li className="nav-item profile">
                    <div className="profile-desc">
                        <div className="profile-pic">
                            <div className="count-indicator">
                                <img className="img-xs rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="profile" />
                                <span className="count bg-success"></span>
                            </div>
                            <div className="profile-name">
                                <h5 className="mb-0 font-weight-normal text-white">
                                    {user?.username || "Usuario"}
                                </h5>
                                <span className="text-muted">
                                    {user?.role ? `Rol: ${user.role}` : "Sin rol"}
                                </span>
                            </div>
                        </div>
                    </div>
                </li>

                <li className="nav-item nav-category">
                    <span className="nav-link text-white">Navegación</span>
                </li>

                <li className="nav-item menu-items">
                    <NavLink to="/" className="nav-link" activeclassname="active">
                        <span className="menu-icon">
                            <i className="mdi mdi-speedometer text-purple"></i>
                        </span>
                        <span className="menu-title">Dashboard</span>
                    </NavLink>
                </li>

                <li className="nav-item menu-items">
                    <NavLink to="/registros" className="nav-link" activeclassname="active">
                        <span className="menu-icon">
                            <i className="mdi mdi-database text-warning"></i>
                        </span>
                        <span className="menu-title">Registros</span>
                    </NavLink>
                </li>

                <li className="nav-item menu-items">
                    <NavLink to="/graficos" className="nav-link" activeclassname="active">
                        <span className="menu-icon">
                            <i className="mdi mdi-chart-bar text-danger"></i>
                        </span>
                        <span className="menu-title">Gráficos</span>
                    </NavLink>
                </li>

                <li className="nav-item menu-items mt-4 px-3">
                    <button className="btn btn-danger btn-block" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
}
