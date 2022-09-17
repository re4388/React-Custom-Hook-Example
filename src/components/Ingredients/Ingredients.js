import React, { useCallback, useEffect, useMemo, useReducer } from "react";

import IngredientForm from "./IngredientForm";
import IngredientsList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";
import useFilter from "../../hooks/filter";
import BASE_API from "../../API_BASE_URL";

const Ingredients = () => {
  const [filterIngredients, dispatchFilterIngredients] = useFilter();

  const {
    isLoading,
    error,
    data,
    sendRequest,
    ingredientOringredientId,
    isAddIngredient,
    clear
  } = useHttp();

  // filter display item after http result complete
  useEffect(() => {
    const addIngredientSuccessCase = !isLoading && !error && isAddIngredient;
    const removeIngredientSuccessCase =
      !isLoading && !error && !isAddIngredient;

    if (removeIngredientSuccessCase) {
      dispatchFilterIngredients({
        type: "DELETE_INGREDIENT",
        id: ingredientOringredientId
      });
    } else if (addIngredientSuccessCase) {
      dispatchFilterIngredients({
        type: "ADD_NEW_INGREDIENT",
        ingredient: { id: data.name, ...ingredientOringredientId }
      });
    }
  }, [
    data,
    ingredientOringredientId,
    isAddIngredient,
    isLoading,
    error,
    dispatchFilterIngredients
  ]);

  const filteredIngredientsHandler = useCallback(
    (filteredIngredients) => {
      dispatchFilterIngredients({
        type: "SET_FILTER",
        ingredients: filteredIngredients
      });
    },
    [dispatchFilterIngredients]
  );

  const addIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(
        `${BASE_API}/ingredients.json`,
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        true // isAddIngredient
      );
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      sendRequest(
        `${BASE_API}/ingredients/${ingredientId}.json`,
        "DELETE",
        null,
        ingredientId,
        false // isAddIngredient
      );
    },
    [sendRequest]
  );

  const ingredientList = useMemo(() => {
    return (
      <IngredientsList
        ingredients={filterIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [filterIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
