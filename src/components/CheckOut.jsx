import { useContext } from "react";
import Modal from "../UI/Modal.jsx";
import Input from "../UI/Input.jsx";
import { currenctFormatter } from "../util/currencyFormatter";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../Hooks/useHttp";
import Error from "./Error.jsx";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function CheckOut() {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  const userProgressCtx = useContext(UserProgressContext);
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customData,
        },
      })
    );
  }
  function handleClose(){
    userProgressCtx.hideCheckout()
  }
  function handleFinish(){
    userProgressCtx.hideCheckout()
    cartCtx.clearCart();
    clearData()
  }
  let  actions =(
    <>
    <button
            type="button"
            className="text-button"
            onClick={handleClose}
          >
            Close
          </button>
          <button className="button">Submit Order</button>
          </>
  )
  if(isSending){
    actions= <span>Sending order data...</span>
  }
  if(data && !error){
    return(
        <Modal open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully</p>
            <p>We will get back to you with more details via email within the next few minutes.</p>
            <p className="modal-actions">
                <button className="button" onClick={handleClose}>Okay</button>
            </p>
        </Modal>
    )
  }
  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <h3>CheckOut</h3>
        <p>Total Amount: {currenctFormatter.format(cartTotal)}</p>

        <Input lable="Full Name" type="text" id="name" />
        <Input lable="E-Mail Address" type="email" id="email" />
        <Input lable="Street" type="text" id="street" />
        <div className="control-row">
          <Input lable="Postal Code" type="text" id="postal-code" />
          <Input lable="City" type="text" id="city" />
        </div>
        {error && <Error title='Failed to submit order' message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
