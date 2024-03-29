import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
});
function cartReducer(state, action) {
  const updatedItems = [...state.items];
  switch (action.type) {
    case "ADD_ITEM":
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id,
      );
      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }
      break;

    default:
      break;
  }
  return { ...state, items: updatedItems };
}
export function CartContextProvider({ children }) {
  const [cart, dispatchCarAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCarAction({ type: "ADD_ITEM", item });
  }
  const cartContext = {
    items: cart.items,
    addItem,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
