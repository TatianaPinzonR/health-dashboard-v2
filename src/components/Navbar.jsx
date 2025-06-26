// src/components/Navbar.jsx
import React from 'react';
import face from '../assets/images/faces/face15.jpg';
import '../assets/css/style.css';

export default function Navbar() {
    return (
        <nav className="navbar p-0 fixed-top d-flex flex-row">
            <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
                <a className="navbar-brand brand-logo-mini" href="/"><img src={face} alt="logo" /></a>
            </div>
            <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
                <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span className="mdi mdi-menu"></span>
                </button>
                <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item dropdown">
                        <a className="nav-link" id="profileDropdown" href="#" data-bs-toggle="dropdown">
                            <div className="navbar-profile">
                                <img className="img-xs rounded-circle" src={face} alt="user" />
                                <p className="mb-0 d-none d-sm-block navbar-profile-name">Henry Klein</p>
                                <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list" aria-labelledby="profileDropdown">
                            <a className="dropdown-item preview-item">
                                <div className="preview-icon bg-dark rounded-circle">
                                    <i className="mdi mdi-logout text-danger"></i>
                                </div>
                                <div className="preview-item-content">
                                    <p className="preview-subject mb-1">Cerrar sesión</p>
                                </div>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
