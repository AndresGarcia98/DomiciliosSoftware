const initialState = {
  shopCart: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "AGREGAR_PRODUCTO_CARRO":
      return {
        ...state,
        shopCart: [...state.shopCart, action.payload]
      };
    case "ELIMINAR_PRODUCTO_CARRO":
      return {
        ...state,
        shopCart: state.shopCart.filter(
          product => product.id !== action.payload
        )
      };
    default:
      return state;
  }
};
