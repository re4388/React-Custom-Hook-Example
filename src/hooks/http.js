import { useReducer, useCallback } from "react";

const initialState = {
  isLoading: false,
  error: null,
  data: null,
  ingredientOringredientId: null,
  isAddIngredient: null
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "BEOFRE_REQUEST":
      return {
        isLoading: true,
        error: null,
        data: null,
        ingredientOringredientId: null,
        isAddIngredient: action.isAddIngredient
      };
    case "SUCCESS_REQUEST":
      return {
        ...curHttpState,
        isLoading: false,
        data: action.responseData,
        ingredientOringredientId: action.ingredientOringredientId
      };
    case "ERROR_STATE":
      return { isLoading: false, error: action.errorMessage };
    case "INIT_STATE":
      return initialState;
    default:
      throw new Error("Should not be reached!");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttpState] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => {
    dispatchHttpState({ type: "INIT_STATE" });
  }, []);

  // const [httpState, dispatchHttpState] = useReducer(httpReducer, {
  //   loading: false,
  //   error: null,
  //   data: null,
  //   extra: null,
  //   isAddIngredient: null
  // });

  const sendRequest = useCallback(
    async (url, method, body, ingredientOringredientId, isAddIngredient) => {
      dispatchHttpState({
        type: "BEOFRE_REQUEST",
        isAddIngredient: isAddIngredient
      });
      try {
        let response = await fetch(url, {
          method: method,
          body: body,
          headers: {
            "Content-Type": "application/json"
          }
        });
        let responseJson = await response.json();
        dispatchHttpState({
          type: "SUCCESS_REQUEST",
          responseData: responseJson,
          ingredientOringredientId: ingredientOringredientId
        });
      } catch (error) {
        dispatchHttpState({
          type: "ERROR_STATE",
          errorMessage: "Something went wrong!"
        });
      }
    },
    []
  );

  return {
    isLoading: httpState.isLoading,
    data: httpState.data,
    error: httpState.error,
    ingredientOringredientId: httpState.ingredientOringredientId,
    isAddIngredient: httpState.isAddIngredient,

    sendRequest: sendRequest,
    clear: clear
  };
};

export default useHttp;
