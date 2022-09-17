import { useReducer } from "react";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.ingredients;
    case "ADD_NEW_INGREDIENT":
      return [...currentIngredients, action.ingredient];
    case "DELETE_INGREDIENT":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get here!");
  }
};

const useFilter = () => {
  const [filterIngredients, dispatchFilterIngredients] = useReducer(
    ingredientReducer,
    []
  );

  return [filterIngredients, dispatchFilterIngredients];
};

export default useFilter;
