import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";
import LoadingIndicator from "../UI/LoadingIndicator";

// memo => only re-render when props change
// the default will be depend on whenever parent component changed
// (could be other props change in parent but not related to this component)
const IngredientForm = React.memo(({ onAddIngredient, loading }) => {
  // two local state to handle from input 2 inputs
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  // console.log("IngredientForm run");

  const submitHandler = (e) => {
    e.preventDefault();
    onAddIngredient({ title: enteredTitle, amount: enteredAmount });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={enteredTitle}
              // much simpler, no need to merge manually in _IngredientFormV2.js case
              onChange={(e) => setEnteredTitle(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={enteredAmount}
              onChange={(e) => setEnteredAmount(e.target.value)}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>

            {/* show loading animation when we at loading state */}

            {loading && <LoadingIndicator />}
            {/* use && or use tenary operator */}
            {/* {loading ? <LoadingIndicator /> : null} */}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
