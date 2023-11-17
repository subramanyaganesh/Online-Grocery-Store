import { items } from "../../constants";

const initialState = {
  cart: [],
  selectedCategory: {},
  orders: [],
  currentOrderId: 0,
  products: items,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "DELETE_CART":
      return { ...state, cart: [] };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "PLACE_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
        currentOrderId: state.currentOrderId + 1,
      };
    case "CANCEL_ORDER":
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_PRODUCT":
      console.log(action.payload);
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload?.id ? { ...item, ...action.payload } : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
