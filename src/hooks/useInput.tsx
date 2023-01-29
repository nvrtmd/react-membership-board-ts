import { useState } from 'react';

export const useInput = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleResetInput = () => {
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return { inputValue, setInputValue, handleResetInput, handleInputChange };
};
