import {
  CLEAR_CART,
  ADD_ITEM,
  DECREASE,
  INCREASE,
  DISPLAY_ITEMS,
  LOADING,
  REMOVE_ITEM,
} from "./actions";

const cartReducer = (state, action) => {
  if (action.LOADING) {
    return { ...state, loading: true };
  }
  if (action.type === DISPLAY_ITEMS) {
    return { ...state, cart: action.payload, loading: false };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [], total: 0, amount: 0 };
  }
  if (action.type === REMOVE_ITEM) {
    const newCart = state.cart.filter((item) => item.id !== action.payload.id);
    const removedItem = state.cart.find(
      (item) => item.id === action.payload.id
    );
    return {
      ...state,
      cart: newCart,
      total: state.total - +removedItem.price * removedItem.amount,
      amount: state.amount - removedItem.amount,
    };
  }
  if (action.type === INCREASE) {
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        const newAmount = item.amount + 1;
        return { ...item, amount: newAmount };
      } else {
        return item;
      }
    });
    const updatedItem = state.cart.find(
      (item) => item.id === action.payload.id
    );
    return {
      ...state,
      cart: updatedCart,
      total: state.total + updatedItem.price,
      amount: state.amount + 1,
    };
  }
  if (action.type === DECREASE) {
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        const newAmount = item.amount - 1;
        if (newAmount <= 0) {
          return null; // Remove item if amount is 0
        }
        return { ...item, amount: newAmount };
      }
      return item;
    });
    const filteredCart = updatedCart.filter((item) => item !== null);
    const updatedItem = state.cart.find(
      (item) => item.id === action.payload.id
    );
    return {
      ...state,
      cart: filteredCart,
      total: state.total - updatedItem.price,
      amount: state.amount - 1,
    };
  }
  if (action.type === ADD_ITEM) {
    const { id, title, price, img } = action.payload;
    const existingItem = state.cart.find((item) => item.id === id);
    if (existingItem) {
      const updatedCart = state.cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount + 1 };
        } else {
          return item;
        }
      });
      const updatedItem = state.cart.find((item) => item.id === id);
      return {
        ...state,
        cart: updatedCart,
        total: state.total + updatedItem.price,
        amount: state.amount + 1,
      };
    } else {
      const newItem = { id, title, price, img, amount: 1 };
      return {
        ...state,
        cart: [newItem, ...state.cart],
        total: state.total + price,
        amount: state.amount + 1,
      };
    }
  }
  return state;
};

export default cartReducer;
