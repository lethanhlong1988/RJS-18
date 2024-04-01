import { useContext } from "react";

import Modal from "./UI/Modal";
import Button from "./UI/Button";
import Input from "./UI/Input";

import UserProgressContext from "../store/UserProgressContext";

export default function Checkout() {
  const userProgressCtx = useContext(UserProgressContext);

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleClose() {
    console.log("close checkout!");
    userProgressCtx.hideCheckout();
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: x</p>

        <Input label="Full Name" type="text" id="full-name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
