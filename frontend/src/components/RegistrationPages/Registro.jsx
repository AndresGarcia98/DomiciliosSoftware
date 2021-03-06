import React, { Component } from "react";
import ApiCall from "../../APICalls/users";

var emailExpression = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
var passwordVer = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

class Registro extends Component {
  state = {
    nombre: "",
    correo: "",
    contrasena: "",
    contrasenaConfirm: "",
    rol: "",
    direccion: ""
  };

  checkPassword() {
    if (
      this.state.contrasena.length > 8 &&
      passwordVer.test(this.state.contrasena)
    ) {
      return true;
    }
    return false;
  }

  comprobarRadioButton = () => {

    const { contrasena, contrasenaConfirm} = this.state;

    let radioUsuario = document.getElementById("radioUsuario").checked;
    let radioDespachador = document.getElementById("radioDespachador").checked;
    let radioAdmin = document.getElementById("radioAdmin").checked;

    if (radioUsuario) {
      this.setState({
        rol: false
      });
    } else if (radioDespachador) {
      this.setState({
        rol: true
      });
    } else if (radioAdmin) {
      this.setState({
        rol: true
      });
    }

    if (
      this.state.nombre &&
      this.state.correo &&
      this.state.contrasena &&
      this.state.contrasenaConfirm &&
      this.state.direccion
    ) {
      if (contrasena === contrasenaConfirm) {
        if (emailExpression.test(this.state.correo)) {
          if (this.checkPassword()) {
            ApiCall.addUser({
              name: this.state.nombre,
              email: this.state.correo,
              password: this.state.contrasena,
              role: this.state.rol,
              address: this.state.direccion
            })
              .then(res => res.json())
              .then(result => {
                if (result.status) {
                  console.log(result.message);
                  this.setState({
                    nombre: "",
                    correo: "",
                    contrasena: "",
                    contrasenaConfirm: "",
                    direccion: "",
                    rol: false
                  });
                } else {
                  console.log(result.message);
                }
              });
          } else {
            console.log(
              "Contraseña inválida, recuerda que la contraseña debe tener al menos 8 digitos y contener una mayúscula y minúscula"
            );
          }
        } else {
          console.log("El correo electrónico no es válido");
        }
      } else {
        console.log("Las contraseñas no coinciden");
      }
    } else {
      console.log("Faltan campos por ingresar");
    }
  };

  render() {
    const { rol } = this.state;
    return (
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={this.nuevoProducto}>
                <div className="form-group">
                  <input
                    onChange={e => this.setState({ nombre: e.target.value })}
                    type="text"
                    value={this.state.nombre}
                    className="form-control mt-4"
                    placeholder="Ingrese el nombre de usuario"
                  />
                </div>

                <div className="form-group">
                  <input
                    onChange={e => this.setState({ correo: e.target.value })}
                    type="text"
                    value={this.state.correo}
                    className="form-control mt-4"
                    placeholder="Ingrese el correo electrónico"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={e => this.setState({ direccion: e.target.value })}
                    type="text"
                    value={this.state.direccion}
                    className="form-control mt-4"
                    placeholder="Dirección"
                  />
                </div>

                <div className="form-group">
                  <input
                    onChange={e =>
                      this.setState({ contrasena: e.target.value })
                    }
                    type="password"
                    value={this.state.contrasena}
                    className="form-control mt-4"
                    placeholder="Ingrese la contraseña"
                  />
                </div>

                <div className="form-group">
                  <input
                    onChange={e =>
                      this.setState({ contrasenaConfirm: e.target.value })
                    }
                    type="password"
                    value={this.state.contrasenaConfirm}
                    className="form-control mt-4"
                    placeholder="Confirme la contraseña"
                  />
                </div>

                <div className="container mt-4">
                  <h5>Seleccione su rol</h5>
                  <div className="row mt-2">
                    <div className="col-sm">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          id="radioUsuario"
                          name="groupOfDefaultRadios"
                        />
                        <label className="custom-control-label" htmlFor="radioUsuario">
                          Usuario
                        </label>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          id="radioDespachador"
                          name="groupOfDefaultRadios"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="radioDespachador"
                        >
                          Despachador
                        </label>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          id="radioAdmin"
                          name="groupOfDefaultRadios"
                        />
                        <label className="custom-control-label" htmlFor="radioAdmin">
                          Administrador
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={this.comprobarRadioButton}
                  type="submit"
                  className="btn btn-primary font-weight-bold text-uppercase d-block w-100 mt-4"
                >
                  Registrarse
                </button>
              </form>

              {rol ? (
                <div className="font-weight-bold alert alert-danger text-center mt-4">
                  <input
                    onChange={this.precioProducto}
                    type="text"
                    className="form-control mt-4"
                    placeholder="Ingrese su codigo"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registro;
