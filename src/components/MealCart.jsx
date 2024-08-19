import { currenctFormatter } from "../util/currencyFormatter";
import CartContext from "../store/CartContext";
import { useContext } from "react";
export default function MealCart({ meal }) {
    const cartCtx = useContext(CartContext);
  return (
    <li className="meal-item">
      <article>
        <img src={`https://food-order-app-backend-6w66.onrender.com/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currenctFormatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <button className="button" onClick={() => cartCtx.addItem(meal)}>Add to Cart</button>
        </p>
      </article>
    </li>
  );
}
