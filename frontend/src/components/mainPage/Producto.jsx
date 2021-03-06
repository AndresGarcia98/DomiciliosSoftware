import React, { Component } from "react";
import { connect } from "react-redux";
import { addProductToCar } from "../../actions/shopCarActions";

class Producto extends Component {
  state = {
    counter: 0,
    isAdd: false,
    situacional: ""
  };

  incrementCounterClick = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  decreaseCounterClick = () => {
    const { counter } = this.state;
    if (counter > 0) {
      this.setState({
        counter: this.state.counter - 1
      });
    }
  };

  addProductClick = () => {
    const { counter, situacional } = this.state;
    if (counter > 0) {
      const { name, price } = this.props;

      const totalPrice = price * counter;

      const productoCarrito = {
        name: name,
        counter: counter,
        totalPrice: totalPrice,
        id: Math.floor(Math.random() * 1000 + 1)
      };

      this.setState({
        isAdd: true,
        counter: 0,
        situacional: "producto agregado",
      });


      this.props.addProductToCar(productoCarrito);
    } else {

      this.setState({
        situacional: "agregar cantidad",
      });
    }
  };

  render() {
    const { name, description, url, price } = this.props;
    const { situacional } = this.state;
    return (
      <div className="card mt-5 text-center" style={{ width: "220px" }}>

        {situacional === "agregar cantidad" ?
          <div class="alert alert-warning text-center" role="alert">
            Ingrese cantidad
          </div>
          : situacional === "producto agregado" ?
            <div class="alert alert-success text-center" role="alert">
              Producto agregado
         </div>

            : ""}

        <img
          src={url}
          style={{ witdh: "100px", height: "100px" }}
          className="card-img-top mt-2"
          alt="..."
        />
        <div className="card-body">
          <h5 style={{ fontWeight: "bold" }} className="card-title text-center">
            {name}
          </h5>
          <p className="card-text text-center">$ {price}</p>
          <p className="card-text text-center">{description}</p>

          <div className="container">
            <div className="row">
              <div className="col-sm">
                <button
                  onClick={this.decreaseCounterClick}
                  className="btn btn-primary"
                  style={{ borderRadius: "25px" }}
                >
                  -
                </button>
              </div>

              <div className="col-sm">{this.state.counter}</div>

              <div className="col-sm">
                <button
                  onClick={this.incrementCounterClick}
                  className="btn btn-primary"
                  style={{ borderRadius: "25px" }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={this.addProductClick}
            className="btn btn-warning mt-3"
          >
            {" "}
            Añadir al carrito{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addProductToCar }
)(Producto);
