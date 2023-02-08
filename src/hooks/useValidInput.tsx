import { useReducer } from 'react';
import { validator } from 'utils/validation';

interface State {
  value: string;
  isValid: null | boolean | undefined;
}

interface Action {
  actionType: string;
  value: string;
  inputType: string;
}

const inputReducer = (state: State = initialState, action: Action): State => {
  switch (action.actionType) {
    case 'INPUT_CHANGE':
      return { value: action.value, isValid: validator(action.inputType, action.value) };
    case 'INPUT_SET':
      return { value: action.value, isValid: validator(action.inputType, action.value) };
    case 'INPUT_BLUR':
      return { value: state.value, isValid: validator(action.inputType, action.value) };
    case 'INPUT_RESET':
      return { value: '', isValid: false };
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

  const handleResetInput = () => {
    dispatchInput({ actionType: 'INPUT_RESET', value: '', inputType });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    dispatchInput({ actionType: 'INPUT_CHANGE', value: e.target.value, inputType });
  };

  const handleInputBlur = () => {
    dispatchInput({ actionType: 'INPUT_BLUR', value: inputState.value, inputType });
  };
  const handleInputSet = (inputValue: string) => {
    dispatchInput({ actionType: 'INPUT_SET', value: inputValue, inputType });
  };

  return { inputState, handleInputBlur, handleResetInput, handleInputChange, handleInputSet };
};
