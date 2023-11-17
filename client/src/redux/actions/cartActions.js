const addToCart = (item) => ({
  type: "ADD_ITEM",
  payload: item,
});

const removeFromCart = (itemId) => ({
  type: "REMOVE_ITEM",
  payload: itemId,
});

const removeAllCartItems = () => ({
  type: "DELETE_CART",
  payload: {},
});

const setSelectedCategory = (category) => ({
  type: "SET_SELECTED_CATEGORY",
  payload: category,
});

const placeOrder = (order) => ({
  type: "PLACE_ORDER",
  payload: order,
});

const cancelOrder = (orderId) => ({
  type: "CANCEL_ORDER",
  payload: orderId,
});

const addProduct = (product) => ({
  type: "ADD_PRODUCT",
  payload: product,
});

const removeProduct = (productId) => ({
  type: "DELETE_PRODUCT",
  payload: productId,
});

const updateProduct = (product) => ({
  type: "UPDATE_PRODUCT",
  payload: product,
});

export {
  addToCart,
  removeFromCart,
  removeAllCartItems,
  setSelectedCategory,
  placeOrder,
  cancelOrder,
  removeProduct,
  updateProduct,
  addProduct,
};
