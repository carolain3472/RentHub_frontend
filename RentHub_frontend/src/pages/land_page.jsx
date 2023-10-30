import React from "react";
import { Nav_bar } from "../components/Nav_bar_Land";
import { useNavigate } from "react-router-dom";
import "../scss/land_page_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export function Land_page() {
  const navigate = useNavigate();

  const redireccionarRegistro = () => {
    navigate("/register");
  };

  return (
    <>
      <Nav_bar />
      <div className="container-fluid custom-land-container">
        <div className="row row-img">
          <div className="col-md-6 col-izq-land">
            <div className="titulo-col-izq">
              <div class="R-titulo">
                <h1>R</h1>
              </div>
              <h3 className="marca-titulo">RentHub</h3>
            </div>
            <div className="parrafo-col-izq">
              <p>
                <span className="text-dorado">Todo</span> lo que quieras en un
                solo <span className="text-dorado">sitio</span>.
              </p>
            </div>
            <div className="desc-land">
              <p>
                En RentHub reinventamos la forma en que compartes y accedes a
                una amplia variedad de objetos. Imagina un mundo donde puedes
                tener acceso a todo lo que necesitas, desde herramientas
                especializadas hasta equipos de aventura, sin tener que
                comprarlos. ¡Es hora de simplificar tu vida y liberar espacio en
                tu hogar!
              </p>
            </div>
          </div>
          <div className="col-md col-der-land">
            <img src="/images/rent-calculator.jpg" alt="" />
          </div>
        </div>
        <div className="row row-reg">
          <h1 style={{ marginTop: "10px", color: "#ffc13b" }}>
            ¡Únete a la revolución del alquiler!
          </h1>
          <p
            style={{ marginTop: "40px", fontSize: "1.2em", fontWeight: "bold" }}
          >
            Descubre lo que RentHub puede hacer por ti. <br />
            Regístrate ahora y comienza a disfrutar de una vida más simple y
            accesible.
          </p>
          <a className="registro-inicio" onClick={redireccionarRegistro}>
            Registrate
          </a>
        </div>
      </div>
    </>
  );
}
