import Error from "./Error";
import MealCart from "./MealCart";
import useHttp from "../Hooks/useHttp";

const requestConfig ={}
export default function Products() {

  const {data: availableMeals,isLoading,error} = useHttp('https://food-order-app-backend-6w66.onrender.com/meals',requestConfig,[])

  if (error) {
    return <Error title='Failed to fetch meals' message={error} />;
  }
  return (
    <>
      {isLoading && <p className="center">Fetching Meals Data</p>}
      {!isLoading && availableMeals.length === 0 && (
        <p>No Meal available...</p>
      )}
      {!isLoading && availableMeals.length > 0 && (
        <ul id="meals">
          {availableMeals.map((meal) => {
            return (
                <MealCart key={meal.id} meal={meal} />
            );
          })}
        </ul>
      )}
    </>
  );
}
