import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { currenctFormatter } from "../util/currencyFormatter";
import UserProgressContext from "../store/UserProgressContext";
export default function OrderCart({}) {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartList = cartCtx.items;
  const cartTotal = cartList.reduce((totalPrice,item)=>totalPrice + item.quantity * item.price,0)
function handleGoToCheckOut(){
    userProgressCtx.showCheckout()
}
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === 'cart'}
      onClose={userProgressCtx.hideCart}
    >
      <h2>Your Cart</h2>
      {cartList.length <= 0 && <p> Cart is Empty</p>}
      {cartList.length >= 1 && (
        <ul>
          {cartList.map((meal) => {
            return (
              <li key={meal.id} className="cart-item">
                <p>
                  {meal.name} - {meal.quantity} X {currenctFormatter.format(meal.price)}
                </p>
                <p className="cart-item-actions ">
                  <button
                    onClick={() => cartCtx.removeItem(meal)}
                    className="text-button"
                  >
                    -
                  </button>
                  <span> {meal.quantity}</span>
                  <button
                    onClick={() => cartCtx.addItem(meal)}
                    className="text-button"
                  >
                    +
                  </button>
                </p>
              </li>
            );
          })}
        </ul>
      )}
      <p className="cart-total">{currenctFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <button className="text-button" onClick={()=> userProgressCtx.hideCart()}>Close</button>
        {cartList.length > 0 && <button className="button" onClick={handleGoToCheckOut}>Go to Checkout</button>}
      </p>
    </Modal>
  );
}
