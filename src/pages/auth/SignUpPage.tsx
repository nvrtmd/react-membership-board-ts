import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import { useInput } from 'hooks/useInput';
import { Layout } from 'components/layouts/Layout';
import { Browser } from 'components/common/Browser';
import { Input } from 'components/common/Input';
import { Button } from 'components/common/Button';
import WindowsImg from 'assets/windows_img.png';
import { auth } from 'api/auth';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { inputValue: id, handleInputChange: handleIdChange } = useInput();
  const { inputValue: password, handleInputChange: handlePasswordChange } = useInput();
  const { inputValue: nickname, handleInputChange: handleNicknameChange } = useInput();

  const handleSignUpFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await auth.signUp({ id, password, nickname });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <SignUpFormWrapper>
            <SignUpForm onSubmit={handleSignUpFormSubmit}>
              <SignUpFormHeader>
                <div>
                  <WindowsImage src={WindowsImg} />
                  <div>Yuzamin 97</div>
                </div>
              </SignUpFormHeader>
              <SignUpFormTitle>- Sign Up -</SignUpFormTitle>
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
  min-height: 100%;
  display: flex;
`;

const SignUpForm = styled.form`
  margin: auto;
  padding: 2rem 0;
`;

const SignUpFormHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const WindowsImage = styled.img`
  width: 4rem;
  display: flex;
  margin: auto;
`;
const SignUpFormTitle = styled.div`
  text-align: center;
  font-size: 1.6rem;
  margin: 0.5rem 0 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;
