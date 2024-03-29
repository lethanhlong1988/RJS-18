import { useContext } from "react";

import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const userProgressCtx = useContext(UserProgressContext);
  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReacFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart (0)
        </Button>
      </nav>
    </header>
  );
}
