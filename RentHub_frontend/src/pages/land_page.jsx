import React from "react";
import { Nav_bar } from "../components/Nav_bar_Land";
import "../scss/land_page_style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Land_page() {
  return (
    <>
      <Nav_bar />
        <div className="container">
            <div className="row">
                <div className="col-6"></div>
                <div className="col-6"></div>
            </div>
        </div>
    </>
  );
}
