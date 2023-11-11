import React from "react";
import { Nav_bar } from "../components/Nav_bar_Land";
import "../scss/about_us_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export function About_us_page() {
  return (
    <>
      <Nav_bar className="navbar-inicio" />
      <section className="content-container-aboutus">
        <div className="container-fluid title-section">
          <div className="row title-about-us">
            <div className="col about-us-izq">
              <h1>
                Sobre <br />
                nosotros
              </h1>
            </div>
            <div className="col about-us-der">
              <h1 className="about-us-grey">¡Alquilar es el nuevo </h1>
              <h1 className="about-us-gold">comprar!</h1>
            </div>
          </div>
          <div className="row img-container-about-us">
            <img
              className="about-us-img"
              src="/images/about-us-img.webp"
              alt=""
            />
          </div>

          <div className="row info-div">
            <div className="col-md info-izq">
              <p className="parag-info">
                En RentHub, creemos en un mundo donde el acceso a una amplia
                gama de objetos es tan fácil como abrir una puerta. Fundada en
                2023, nuestra misión es transformar la forma en que las personas
                poseen y comparten objetos, fomentando la colaboración y la
                sostenibilidad en el proceso.
              </p>
              <h1 className="title-info">Nuestra historia</h1>
              <p className="parag-info">
                Nuestra historia comenzó con una simple pregunta: ¿Por qué
                deberíamos poseer todo lo que necesitamos? A medida que nuestras
                vidas se volvían cada vez más ocupadas y nuestras casas más
                abarrotadas, nos dimos cuenta de que había una mejor manera de
                vivir. Así nació RentHub, una plataforma que permitiría a las
                personas alquilar lo que necesitan, cuando lo necesitan, de
                manera fácil y asequible.
              </p>
            </div>
            <div className="col-md info-der">
              <h1 className="title-info">Nuestro equipo</h1>

              <p className="parag-info">
                En RentHub, somos un equipo apasionado y diverso de personas que
                comparten una visión común de un mundo más sostenible y
                colaborativo. Nos enorgullece contar con expertos en tecnología,
                logística, servicio al cliente y más, todos trabajando juntos
                para hacer que la experiencia de alquilar sea lo más fácil y
                gratificante posible.
              </p>

              <h1 className="title-info">Nuestra visión</h1>

              <p className="parag-info">
                Nuestra visión es simple: queremos empoderar a las personas para
                que vivan de manera más inteligente y ecológica al
                proporcionarles acceso instantáneo a objetos de alta calidad.
                Creemos que el futuro es compartir, y estamos emocionados de
                liderar el camino hacia un estilo de vida más consciente y
                sostenible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
