import { useContext, useReducer, createContext } from "react";
import cartReducer from "./cart-reducer";
import cartItems from "../data";
import {
  CLEAR_CART,
  ADD_ITEM,
  DECREASE,
  INCREASE,
  DISPLAY_ITEMS,
  LOADING,
  REMOVE_ITEM,
} from "./actions";

const initialState = {
  loading: false,
  cart: JSON.parse(JSON.stringify(cartItems)), // Deep copy to avoid mutation
  total: cartItems.reduce(
    (total, item) => total + +item.price * item.amount,
    0
  ),
  amount: cartItems.reduce((total, item) => total + item.amount, 0),
};

const AppContext = createContext({
  ...initialState,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  increase: () => {},
  decrease: () => {},
  displayItems: () => {},
  setLoading: () => {},
});

export const AppProvider = ({ children }) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatchCart({ type: ADD_ITEM, payload: item });
  };
  const removeItem = (id) => {
    dispatchCart({ type: REMOVE_ITEM, payload: { id } });
  };
  const clearCart = () => {
    dispatchCart({ type: CLEAR_CART });
  };
  const increase = (id) => {
    dispatchCart({ type: INCREASE, payload: { id } });
  };
  const decrease = (id) => {
    dispatchCart({ type: DECREASE, payload: { id } });
  };
  const displayItems = (items) => {
    dispatchCart({ type: DISPLAY_ITEMS, payload: items });
  };

  const setLoading = (isLoading) => {
    dispatchCart({ type: LOADING, payload: isLoading });
  };
  const ctxValue = {
    ...cartState,
    addItem,
    removeItem,
    clearCart,
    increase,
    decrease,
    displayItems,
    setLoading,
  };
  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
