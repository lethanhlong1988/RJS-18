import Button from "./UI/Button";
import Input from "./UI/Input";

export default function Checkout() {
  return (
    <div>
      <form action="">
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
          <Button type="button" textOnly>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </div>
  );
}
