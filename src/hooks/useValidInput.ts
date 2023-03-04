import { useReducer, useCallback } from 'react';
import { validator } from 'utils/validation';

interface State {
  value: string;
  isValid: null | boolean;
}

interface Action {
  type: string;
  value: string;
  inputType: string;
}

const inputReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return { value: action.value, isValid: validator(action.inputType, action.value) || false };
    case 'INPUT_SET':
      return { value: action.value, isValid: validator(action.inputType, action.value) || false };
    case 'INPUT_BLUR':
      return { value: state.value, isValid: validator(action.inputType, action.value) || false };
    default:
      return state;
  }
};

const initialState: State = {
  value: '',
  isValid: null,
};

export const useValidInput = (inputType: string) => {
  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
      dispatchInput({ type: 'INPUT_CHANGE', value: e.target.value, inputType });
    },
    [],
  );

  const handleInputBlur = useCallback(() => {
    dispatchInput({ type: 'INPUT_BLUR', value: inputState.value, inputType });
  }, [inputState.value]);

  const handleInputSet = useCallback((inputValue: string) => {
    dispatchInput({ type: 'INPUT_SET', value: inputValue, inputType });
  }, []);

  return { inputState, handleInputBlur, handleInputChange, handleInputSet };
};
