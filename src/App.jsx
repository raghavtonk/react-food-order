import CheckOut from "./components/CheckOut";
import Header from "./components/Header";
import OrderCart from "./components/OrderCart";
import Products from "./components/Products";
import { CartContexProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
function App() {
  return (
    <UserProgressContextProvider>
      <CartContexProvider>
        <Header />
        <Products />
        <OrderCart />
        <CheckOut />
      </CartContexProvider>
    </UserProgressContextProvider>
  );
}

export default App;
