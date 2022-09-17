import React from "react";

import "./ErrorModal.css";

// use React.memo
// so only onClose and children change
// this component will rerender
const ErrorModal = React.memo(({ onClose, children }) => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={onClose} />
      <div className="error-modal">
        <h2>An Error Occurred!</h2>
        <p>{children}</p>

        <div className="error-modal__actions">
          <button type="button" onClick={onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;
