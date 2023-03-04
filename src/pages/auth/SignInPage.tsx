import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { auth } from 'apis/auth';
import { useInput } from 'hooks/useInput';
import { Browser } from 'components/common/Browser';
import { Input } from 'components/common/Input';
import { Button } from 'components/common/Button';
import { Layout } from 'components/layouts/Layout';
import { theme } from 'styles/theme';
import { AUTH_ALERT_MESSAGE } from 'constants/constants';
import { CustomError } from 'global/types';
import WindowsImg from 'assets/windows_img.png';

export const SignInPage = () => {
  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <SignInFormWrapper>
            <SignInForm />
          </SignInFormWrapper>
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

export const SignInForm = () => {
  const navigate = useNavigate();
  const { inputValue: id, handleInputChange: handleIdChange } = useInput('');
  const { inputValue: password, handleInputChange: handlePasswordChange } = useInput('');

  const isSignInFormInputValid = () => {
    if (!id.length || !password.length) {
      alert(AUTH_ALERT_MESSAGE.ID_OR_PASSWORD_EMPTY_ALERT);
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

  const formHeader = useMemo(
    () => (
      <>
        <FormHeader>
          <div>
            <WindowsImage src={WindowsImg} />
            <div>Yuzamin97</div>
          </div>
        </FormHeader>
        <PageTitle>- Sign In -</PageTitle>
      </>
    ),
    [],
  );

  const formFooter = useMemo(
    () => (
      <>
        <ButtonWrapper>
          <Button name="Sign In" type="submit" />
        </ButtonWrapper>
        <SignUpButtonWrapper onClick={() => navigate('/auth/signup')}>
          <div>Not signed up yet?</div>
        </SignUpButtonWrapper>
      </>
    ),
    [],
  );

  const inputControlList = [
    {
      title: 'id',
      value: id,
      changeHandler: handleIdChange,
    },
    {
      title: 'password',
      value: password,
      changeHandler: handlePasswordChange,
    },
  ];

  return (
    <Form onSubmit={handleSignInFormSubmit}>
      {formHeader}
      {inputControlList.map((input) =>
        useMemo(
          () => (
            <Input
              key={input.title}
              title={input.title}
              name={input.title}
              type={input.title}
              value={input.value}
              changeHandler={input.changeHandler}
            />
          ),
          [input.value],
        ),
      )}
      {formFooter}
    </Form>
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

const Form = styled.form`
  margin: auto;
  padding: 2rem 0;
`;

const FormHeader = styled.div`
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
