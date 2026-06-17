"use client"
import React, { useCallback, useReducer } from "react";

// Reducer to manage form state
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      const updatedInputs = {
        ...state.inputs,
        [action.inputID]: {
          value: action.value,
          isValid: action.isValid,
        },
      };


      const isFormValid = Object.values(updatedInputs).every(input => input.isValid);

      return {
        ...state,
        inputs: updatedInputs,
        isFormValid,
      };

    case "RESET_FORM":
      return {
        inputs: action.initialInputs,
        isFormValid: action.initialFormIsValid,
      };

    default:
      return state;
  }
};

export default function useForm(initialInputs, initialFormIsValid) {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isFormValid: initialFormIsValid,
  });

  const onInputHandler = useCallback((inputID, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputID,
      value,
      isValid,
    });
  }, []);

  // Optional: reset the form state
  const resetForm = useCallback(() => {
    dispatch({
      type: "RESET_FORM",
      initialInputs,
      initialFormIsValid,
    });
  }, [initialInputs, initialFormIsValid]);

  return [formState, onInputHandler, resetForm];
}
