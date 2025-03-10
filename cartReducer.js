
const initialState = {
    cartItems: [],
  };
  
  export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const item = action.payload;
        const exists = state.cartItems.find((x) => x._id === item._id);
        if (exists) {
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x._id === exists._id ? item : x
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
  
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x._id !== action.payload),
        };
  
      case 'CLEAR_CART':
        return {
          ...state,
          cartItems: [],
        };
  
      default:
        return state;
    }
  };

  export default cartReducer;