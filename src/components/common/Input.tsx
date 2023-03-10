import { memo, useMemo } from 'react';
import styled from 'styled-components/macro';

interface InputProps {
  placeholder?: string;
  name?: string;
  title?: string;
  type?: string;
  blurHandler?: () => void;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  readOnly?: boolean;
}

export const Input = memo(
  ({ title, name, placeholder, changeHandler, blurHandler, type, value, readOnly }: InputProps) => {
    const inputTitle = useMemo(() => <InputTitle htmlFor={name}>{title}</InputTitle>, []);
    return (
      <InputWrapper>
        {inputTitle}
        <InputBox
          name={name}
          type={type}
          id={name}
          onChange={changeHandler}
          onBlur={blurHandler}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
        />
      </InputWrapper>
    );
  },
);

const InputWrapper = styled.div`
  font-size: 1.2rem;
`;

const InputTitle = styled.label``;

const InputBox = styled.input`
  cursor: url('https://user-images.githubusercontent.com/67324487/215311257-3abd7f34-8b4f-450c-a527-ed2e72801fbb.png'),
    auto;
  padding: 0.5rem;
  outline: none;
  resize: none;
  background: none;
  box-shadow: 2px 2px 0px 0px #808080 inset, -2px -2px 0px 0px #dfdfdf inset;
  -webkit-box-shadow: 2px 2px 0px 0px #808080 inset, -2px -2px 0px 0px #dfdfdf inset;
  -moz-box-shadow: 2px 2px 0px 0px #808080 inset, -2px -2px 0px 0px #dfdfdf inset;
  width: 100%;
  font-size: 1.2rem;
  font-family: DungGeunMo;
`;
