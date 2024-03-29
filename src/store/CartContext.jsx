import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});
function cartReducer(state, action) {
  let existingCartItemIndex;
  let updatedItems;
  switch (action.type) {
    case "ADD_ITEM":
      existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id,
      );
      updatedItems = [...state.items];
      /*
       Trường hợp món được trọn có trong mảng dữ liệu rồi 
      thì existingCartItemIndex sẽ trả ra một số > -1
      */
      if (existingCartItemIndex > -1) {
        updatedItems[existingCartItemIndex] = {
          ...updatedItems[existingCartItemIndex],
          quantity: updatedItems[existingCartItemIndex].quantity + 1,
        };
      } else {
        /*
       Trường hợp món được trọn không có trong mảng dữ liệu rồi 
      thì existingCartItemIndex sẽ trả ra một số = -1
      */
        updatedItems.push({ ...action.item, quantity: 1 });
      }
      console.log(updatedItems);
      break;
    case "REMOVE_ITEM":
      existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id,
      );
      updatedItems = [...state.items];
      /*
      Trường hợp món được chọn có số lượng > 1
      */
      if (updatedItems[existingCartItemIndex].quantity > 1) {
        updatedItems[existingCartItemIndex] = {
          ...updatedItems[existingCartItemIndex],
          quantity: updatedItems[existingCartItemIndex].quantity - 1,
        };
      } else {
        /*
  Trường hợp món được chọn có số lượng = 1
  */
        updatedItems = state.items.filter(
          (item, index) => index !== existingCartItemIndex,
        );
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

  function removeItem(id) {
    dispatchCarAction({ type: "REMOVE_ITEM", id });
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
