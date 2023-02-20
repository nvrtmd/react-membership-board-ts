import { useState, useCallback } from 'react';

export const useInput = (initialValue: string) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const handleResetInput = useCallback(() => {
    setInputValue('');
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [],
  );

  return { inputValue, setInputValue, handleResetInput, handleInputChange };
};
