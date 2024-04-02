import MealItem from "./MealItem";
import useHttp from "./hooks/useHttp";

const requestConfig = {};

export default function Meals() {
  const dataRequest = useHttp("http://localhost:3000/meals", requestConfig, []);
  const getedData = {
    data: dataRequest.data,
    isLoading: dataRequest.isLoading,
    error: dataRequest.error,
  };

  const loadedMeals = getedData.data;

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
