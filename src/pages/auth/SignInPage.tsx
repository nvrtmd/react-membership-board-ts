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
import { CustomError } from 'global/types';

export const SignInPage = () => {
  const navigate = useNavigate();
  const { inputValue: id, handleInputChange: handleIdChange } = useInput('');
  const { inputValue: password, handleInputChange: handlePasswordChange } = useInput('');

  const isSignInFormInputValid = () => {
    if (!id.length || !password.length) {
      alert('아이디 또는 비밀번호를 입력하세요.');
      return false;
    }
    return true;
  };

  const handleSignInFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignInFormInputValid()) {
      try {
        await auth.signIn({ id, password });
        navigate('/');
      } catch (err) {
        const error = err as CustomError;
        alert(error.message);
        return;
      }
    }
  };

  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <SignInFormWrapper>
            <SignInForm onSubmit={handleSignInFormSubmit}>
              <SignInFormHeader>
                <div>
                  <WindowsImage src={WindowsImg} />
                  <div>Yuzamin97</div>
                </div>
              </SignInFormHeader>
              <PageTitle>- Sign In -</PageTitle>
              <Input title="id" name="id" type="id" value={id} changeHandler={handleIdChange} />
              <Input
                title="password"
                name="password"
                type="password"
                value={password}
                changeHandler={handlePasswordChange}
              />
              <ButtonWrapper>
                <Button name="Sign In" type="submit" />
              </ButtonWrapper>
              <SignUpButtonWrapper onClick={() => navigate('/auth/signup')}>
                <div>Not signed up yet?</div>
              </SignUpButtonWrapper>
            </SignInForm>
          </SignInFormWrapper>
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
  padding: 0 2rem;
`;

const SignInFormWrapper = styled.div`
  min-height: 100%;
  display: flex;
  padding: 0.5rem 2.5rem;
`;

const SignInForm = styled.form`
  margin: auto;
  padding: 2rem 0;
`;

const SignInFormHeader = styled.div`
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
const PageTitle = styled.div`
  text-align: center;
  font-size: 1.6rem;
  margin: 0.5rem 0 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const SignUpButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  font-size: 1rem;
  text-decoration: underline;
  color: ${theme.color.grey};
  &:hover > div {
    cursor: url('https://user-images.githubusercontent.com/67324487/215111457-633e4a12-d4ad-442a-934d-398619fd486b.png'),
      auto;
  }
`;
