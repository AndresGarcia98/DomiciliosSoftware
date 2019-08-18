import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { palabraBuscador } from "../actions/searcherAction";

class Header extends Component {
  state = {};
  //
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between  d-flex">
        <div className="d-flex flex-row">
          <Link to={"/"} className="text-light p-2">
            Productos
          </Link>
          <Link to={"/"} className="text-light p-2 ">
            Pedidos
          </Link>
          <Link to={"/"} className="text-light p-2 ">
            Despachadores
          </Link>
        </div>

        <div>
          <div style={{ float: "right", marginTop: "5px" }}>
            <Link
              to={"/login/"}
              className="text-light mr-5"
              style={{ float: "right" }}
            >
              Iniciar Sesión
            </Link>
            <Link
              to={"/carrito/"}
              className="text-light mr-5"
              style={{ float: "right" }}
            >
              Carrito de compras
            </Link>
          </div>

          <div style={{ float: "left", marginRight: "25px" }}>
            <input
              type="text"
              class="form-control"
              placeholder="Buscar"
              onChange={e => this.props.palabraBuscador(e.target.value)}
            />
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(
  null,
  { palabraBuscador }
)(Header);
