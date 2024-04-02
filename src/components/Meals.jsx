import MealItem from "./MealItem";
import useHttp from "./hooks/useHttp";
import Error from "./UI/Error";

const requestConfig = {};

export default function Meals() {
  const dataRequest = useHttp("http://localhost:3000/meals", requestConfig, []);
  const getedData = {
    data: dataRequest.data,
    isLoading: dataRequest.isLoading,
    error: dataRequest.error,
  };

  const loadedMeals = getedData.data;
  const isLoading = getedData.isLoading;
  const error = getedData.error;

  if (isLoading) {
    return <p>Fetching meals... </p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
