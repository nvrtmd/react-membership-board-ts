import styled from 'styled-components/macro';

interface TextAreaProps {
  placeholder: string;
  name: string;
  changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | number;
}

export const TextArea = ({ placeholder, name, changeHandler, value }: TextAreaProps) => {
  return <TextAreaBox name={name} placeholder={placeholder} onChange={changeHandler} value={value} />;
};

const TextAreaBox = styled.textarea`
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
  height: 100%;
  font-size: 1.2rem;
  font-family: DungGeunMo;
`;
