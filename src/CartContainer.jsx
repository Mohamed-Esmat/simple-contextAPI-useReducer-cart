import CartItem from "./CartItem";
// import cartItems from "./data";
import { useGlobalContext } from "./store/context";
const CartContainer = () => {
  const { total, cart, clearCart } = useGlobalContext();

  const cartArray = JSON.parse(JSON.stringify(cart));

  if (cartArray.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartArray?.map((cartItem) => {
          return <CartItem key={cartItem.id} {...cartItem} />;
        })}
        {/* {cartArray?.filter(Boolean).map((cartItem) => {
          if (!cartItem) return null; // Skip null items
          return <CartItem key={cartItem.id} {...cartItem} />;
        })} */}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div>
          <h5 className="cart-total">
            total <span>${total.toFixed(2)}</span>
          </h5>
        </div>
        <button className="btn btn-hipster" onClick={() => clearCart()}>
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
