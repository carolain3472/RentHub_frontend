import React from "react";
import { NavLink } from "react-router-dom";
import "../scss/nav_bar_land_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

/**
 * Componente de barra de navegación principal.
 * Muestra la marca y los enlaces a diferentes secciones del sitio web.
 * También incluye un enlace para iniciar sesión.
 */

export function Nav_bar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar-land fixed-top">
        <a className="navbar-brand" href="#">
          RentHub
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/"
                className="nav-link nav-link-text"
                activeclassname="active"
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/about-us"
                className="nav-link nav-link-text"
                activeclassname="active"
              >
                Sobre nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/contact-us"
                className="nav-link nav-link-text"
                activeclassname="active"
              >
                Contáctanos
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="inicio-sesion-nav">
          <FontAwesomeIcon
            className=" inicio-sesion-icon"
            icon={faUser}
            style={{ color: "#000000" }}
          />
          <a className="nav-link" href="#">
          <NavLink
                exact="true"
                to="/login"
                className="nav-link nav-link-text"
                activeclassname="active"
              >
                Iniciar sesión
              </NavLink>
          </a>
        </div>
      </nav>
      
    </>
  );
}
