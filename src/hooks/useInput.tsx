import { useState } from 'react';

export const useInput = (initialValue: string) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const handleResetInput = () => {
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return { inputValue, setInputValue, handleResetInput, handleInputChange };
};
