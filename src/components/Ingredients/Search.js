import React, { useEffect, useRef, useState } from "react";
import useHttp from "../../hooks/http";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import "./Search.css";
import BASE_API from "../../API_BASE_URL";

/**
 * The search or filter feature:
 * This feature only implement via ajax call to fire store to
 * get the filterd data
 */
const Search = React.memo(({ onLoadIngredients }) => {
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    // use setTimeout to throttle:
    // only send the request if the input value unchaned for 0.5 sec
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        sendRequest(`${BASE_API}/ingredients.json` + query, "GET");
      }
    }, 500);

    // clear up timer
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]);

  /**
   * props.onLoadIngredients is pass from parent component
   * which is to force this filter to update the display items
   */
  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients]);

  return (
    <section className="search">
      {/* err window */}
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
