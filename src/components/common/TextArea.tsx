import styled from 'styled-components/macro';
import { theme } from 'styles/theme';

interface TextAreaProps {
  placeholder: string;
  name: string;
  changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | number;
  isDisabled?: boolean;
  isComment?: boolean;
}

interface TextAreaBoxProps {
  isComment?: boolean;
}

export const TextArea = ({ placeholder, name, changeHandler, value, isDisabled, isComment }: TextAreaProps) => {
  return (
    <TextAreaBox
      name={name}
      placeholder={isDisabled ? 'Only signed in users can post comment' : placeholder}
      onChange={changeHandler}
      value={value}
      disabled={isDisabled}
      isComment={isComment}
    />
  );
};

const TextAreaBox = styled.textarea<TextAreaBoxProps>`
  cursor: url('https://user-images.githubusercontent.com/67324487/215311257-3abd7f34-8b4f-450c-a527-ed2e72801fbb.png'),
    auto;
  padding: 0.5rem;
  outline: none;
  resize: none;
  background: ${theme.color.white};
  ${({ isComment }) =>
    isComment &&
    `
    background: ${theme.color.lightGrey} !important;
    &:focus {
      background: ${theme.color.white} !important;
  }
  `}
  box-shadow: 2px 2px 0px 0px #808080 inset, -2px -2px 0px 0px #dfdfdf inset;
  -webkit-box-shadow: 2px 2px 0px 0px #808080 inset, -2px -2px 0px 0px #dfdfdf inset;
  -moz-box-shadow: 2px 2px 0px 0px #808080 inset, -2px -2px 0px 0px #dfdfdf inset;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  font-family: DungGeunMo;
`;
