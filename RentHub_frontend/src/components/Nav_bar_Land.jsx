import React from 'react';
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../scss/nav_bar_land_style.css";

/**
 * Componente de barra de navegación principal.
 * Muestra la marca y los enlaces a diferentes secciones del sitio web.
 * También incluye un enlace para iniciar sesión.
*/

export function Nav_bar() {
    return (
        <>
            <nav className='navbar navbar-expand-sm navbar-landpage'>
                <span className='navbar-brand' href="">RentHub</span>
                <div className="container-navbar-landpage collapse navbar-collapse justify-content-center"
                    id="navbarSupportedContent">
                    <ul className="item-navbar-landpage navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink exact="true"
                                to="/"
                                className="nav-link nav-link-text"
                                activeclassname="active"
                            >
                                Inicio
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact="true"
                                to="/about-us"
                                className="nav-link nav-link-text"
                                activeclassname="active"
                            >
                                Sobre nosotros
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact="true"
                                to="/contact-us"
                                className="nav-link nav-link-text"
                                activeclassname="active"
                            >
                                Contáctanos
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <a className="login-section">
                    <img className="img-login-section" src="/images/usuario-navbar-landpage.png" alt="usuario-navbar-landpage" />
                    Iniciar sesión
                </a>
            </nav>
        </>
    );
}