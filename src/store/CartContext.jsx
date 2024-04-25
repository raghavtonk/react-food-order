import { createContext, useReducer, useState } from "react";

const CartContext = createContext({
  items: [],
  modalState: false,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: ()=>{},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    let foundCheck = false;
    const updatedList = state.map((meal) => {
      if (meal.id === action.payload.id) {
        foundCheck = true;
        return { ...meal, quantity: meal.quantity + 1 };
      }
      return meal;
    });
    if (!foundCheck) {
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1,
        },
      ];
    } else {
      return updatedList;
    }
  }

  if (action.type === "REMOVE_ITEM") {
    let checkItem = true;
    let updatedList = state.map((meal) => {
      if (meal.id === action.payload.id && meal.quantity > 1) {
        return { ...meal, quantity: meal.quantity - 1 };
      }
      if (meal.id === action.payload.id && meal.quantity === 1) {
        checkItem = false;
        return null;
      }
      return meal;
    });
    if (!checkItem) {
      updatedList = updatedList.filter((meal) => meal != null);
    }
    return updatedList;
  }
  if(action.type === 'CLEAR_CART'){
    return([]);
  }
  return state;
}
export function CartContexProvider({ children }) {
 
  const [cart,dispatchCartAction] =useReducer(cartReducer, []);
  
  function addItem(item){
    dispatchCartAction({type:'ADD_ITEM',payload:item})
  }
  function removeItem(item){
    dispatchCartAction({type:'REMOVE_ITEM',payload:item})
  }
 function clearCart(){
  dispatchCartAction({type: 'CLEAR_CART'})
 }
  const cartContext= {
    items: cart,
    addItem,
    removeItem,
    clearCart
  }
  return <CartContext.Provider value={cartContext}>
    {children}
  </CartContext.Provider>;
}

export default CartContext;
