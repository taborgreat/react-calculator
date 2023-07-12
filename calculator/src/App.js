import React, { useReducer } from "react";

import "./App.css";
const regex = /[-+*/]$/;
const regexNumb = /[0123456789]$/;

const ACTIONS = {
  ADD_DIGIT: "add-digit",
  ADD_DECIMAL: "add-decimal",
  SET_OPERATION: "set-operation",
  CLEAR: "clear",
  SUBMIT: "submit",
};

function reducer(state, { type, load }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.currOper !== undefined &&state.currOper.length > 30) return state;
      if (
        load === "0" &&
        (state.currOper === undefined || state.currOper === "")
      )
        return state;
      return {
        ...state,
        currOper: `${state.currOper || ""}${load}`,
      };

    case ACTIONS.ADD_DECIMAL:
      const reg = /[.]/;
      if (!reg.test(state.currOper)) {
        return {
          ...state,
          currOper: `${state.currOper || ""}${load}`,
        };
      }
      return state;
    case ACTIONS.SET_OPERATION:
      if (
        (load === "*" || load === "/" || load === "+") &&
        (state.currOper === undefined || state.currOper === "")
      )
        return state;
      if (
        state.currOper.charAt(state.currOper.length - 1) === "."
      )
        return state;
      
      if (
        regex.test(load) &&
        (state.currOper === undefined || state.currOper === "")
      ) {
        return {
          ...state,
          currOper: `${state.prevOper || ""}${load}`,
        };
      }

      if (regex.test(state.currOper)) {
        return {
          ...state,
          currOper: `${state.currOper.slice(0, -1)}${load}`,
        };
      }
      return {
        ...state,
        currOper: `${state.currOper || ""}${load}`,
      };

    case ACTIONS.SUBMIT:
      if(state.currOper === undefined) return state;
      if (regexNumb.test(state.currOper.slice(-1))) {
        return {
          ...state,
          prevOper: `${eval(state.currOper).toFixed(2)}`,
          currOper: "",
        };
      }
      return state;

    case ACTIONS.CLEAR:
      return {
        ...state,
        currOper: "",
        prevOper: "",
      };
    default:
      return state;
  }
}

function DigitButton({ dispatch, digit }) {
  return (
    <button id="numInput"onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, load: digit })}>
      {digit}
    </button>
  );
}
function DecimalButton({ dispatch, dec }) {
  return (
    <button id="numInput" onClick={() => dispatch({ type: ACTIONS.ADD_DECIMAL, load: dec })}>
      {dec}
    </button>
  );
}

function OperationButton({ dispatch, operation }) {
  return (
    <button id="opInput"
      onClick={() => dispatch({ type: ACTIONS.SET_OPERATION, load: operation })}
    >
      {operation}
    </button>
  );
}
function SubmitButton({ dispatch }) {
  return (
    <button id="submit" onClick={() => dispatch({ type: ACTIONS.SUBMIT })}>SUBMIT</button>
  );
}

function ClearButton({ dispatch }) {
  return (
    <button id="clear" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>CLEAR</button>
  );
}

function App() {
  const [{ currOper, prevOper, operation }, dispatch] = useReducer(reducer, {});

  return (
    <div className="App">
      <div id="output">
        <div id="prevOper">{prevOper}</div>
        <div id="currOper">{currOper}</div>
      </div>
      <div id="input">
          <DigitButton digit="0" dispatch={dispatch} />
          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <DecimalButton dec="." dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <OperationButton operation="/" dispatch={dispatch} />
        <ClearButton dispatch={dispatch} />
        <SubmitButton dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
