import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import { useInput } from 'hooks/useInput';

import { Layout } from 'components/layouts/Layout';
import { Browser } from 'components/common/Browser';
import { Input } from 'components/common/Input';
import { Button } from 'components/common/Button';

export const SignUpPage = () => {
  const { inputValue: id, handleInputChange: handleIdChange } = useInput();
  const { inputValue: password, handleInputChange: handlePasswordChange } = useInput();
  const { inputValue: nickname, handleInputChange: handleNicknameChange } = useInput();

  const handleSignUpFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(id, password, nickname);
  };

  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <SignUpFormWrapper>
            <SignUpForm onSubmit={handleSignUpFormSubmit}>
              <Input title="id" name="id" type="id" value={id} changeHandler={handleIdChange} />
              <Input
                title="password"
                name="password"
                type="password"
                value={password}
                changeHandler={handlePasswordChange}
              />
              <Input
                title="nickname"
                name="nickname"
                type="nickname"
                value={nickname}
                changeHandler={handleNicknameChange}
              />
              <ButtonWrapper>
                <Button name="Submit" type="submit" />
              </ButtonWrapper>
            </SignUpForm>
          </SignUpFormWrapper>
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const SignUpFormWrapper = styled.div`
  height: 100%;
  display: flex;
`;

const SignUpForm = styled.form`
  margin: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;
