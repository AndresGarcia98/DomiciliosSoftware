import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeProductToCar } from "../../actions/shopCarActions";

class ShopCartProduct extends Component {
  deleteClick = () => {
    const { name } = this.props.info;
    this.props.removeProductToCar(name);
  };

  render() {
    const { name, counter, totalPrice } = this.props.info;
    return (
      <div>
        <li className="list-group-item ">
          <div className="row align-items-center text-center ">
            <div className="col-md-8 d-flex justify-content-between align-items-center ">
              <p className="text-dark m-0">{name}</p>
              <p className="text-dark m-0">Cantidad: {counter}</p>
              <span className="badge badge-warning text-dark">
                Precio total: ${totalPrice}
              </span>
            </div>
            <div className="col-md-4">
              <button
                type="button"
                onClick={this.deleteClick}
                className="btn btn-danger"
              >
                Eliminar
              </button>
            </div>
          </div>
        </li>
      </div>
    );
  }
}

export default connect(
  null,
  { removeProductToCar }
)(ShopCartProduct);