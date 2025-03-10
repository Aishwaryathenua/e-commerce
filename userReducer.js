
const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_LOGIN':
        return {
          ...state,
          userInfo: action.payload,
        };
      case 'USER_LOGOUT':
        return {
          ...state,
          userInfo: null,
        };
      default:
        return state;
    }
  };

  export default userReducer;