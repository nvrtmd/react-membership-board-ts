import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import { Layout } from 'components/layouts/Layout';
import { Browser } from 'components/common/Browser';
import { Input } from 'components/common/Input';
import { Button } from 'components/common/Button';
import WindowsImg from 'assets/windows_img.png';
import { auth } from 'api/auth';
import { useValidInput } from 'hooks/useValidInput';
import { CustomError } from 'global/types';

interface ValidationAlertProps {
  isValid: boolean;
}

export const SignUpPage = () => {
  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <SignUpFormWrapper>
            <SignUpForm />
          </SignUpFormWrapper>
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const { inputState: idState, handleInputChange: handleIdChange, handleInputBlur: handleIdBlur } = useValidInput('id');
  const {
    inputState: passwordState,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
  } = useValidInput('password');
  const {
    inputState: nicknameState,
    handleInputChange: handleNicknameChange,
    handleInputBlur: handleNicknameBlur,
  } = useValidInput('nickname');

  const isSignUpFormInputValid = () => {
    if (idState.isValid && passwordState.isValid && nicknameState.isValid) {
      return true;
    } else {
      alert('입력하신 내용을 확인해주세요.');
      return false;
    }
  };

  const handleSignUpFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUpFormInputValid()) {
      try {
        await auth.signUp({ id: idState.value, password: passwordState.value, nickname: nicknameState.value });
        navigate('/auth/signin');
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
        <PageTitle>- Sign Up -</PageTitle>
      </>
    ),
    [],
  );

  const formFooter = useMemo(
    () => (
      <>
        <ButtonWrapper>
          <Button name="Sign Up" type="submit" />
        </ButtonWrapper>
        <SignInButtonWrapper onClick={() => navigate('/auth/signin')}>
          <div>Already signed up?</div>
        </SignInButtonWrapper>
      </>
    ),
    [],
  );

  const inputControlList = [
    {
      title: 'id',
      value: idState.value,
      changeHandler: handleIdChange,
      blurHandler: handleIdBlur,
      isValid: !idState.isValid && idState.isValid !== null,
      alertMessage: '영문 4 ~ 12자를 입력하세요.',
    },
    {
      title: 'password',
      value: passwordState.value,
      changeHandler: handlePasswordChange,
      blurHandler: handlePasswordBlur,
      isValid: !passwordState.isValid && passwordState.isValid !== null,
      alertMessage: '숫자/특수문자 포함 8자 이상 입력하세요.',
    },
    {
      title: 'nickname',
      value: nicknameState.value,
      changeHandler: handleNicknameChange,
      blurHandler: handleNicknameBlur,
      isValid: !nicknameState.isValid && nicknameState.isValid !== null,
      alertMessage: '영어/숫자/한글 4~12자를 입력하세요.',
    },
  ];
  return (
    <Form onSubmit={handleSignUpFormSubmit}>
      {formHeader}
      {inputControlList.map((input) =>
        useMemo(
          () => (
            <>
              <Input
                key={input.title}
                title={input.title}
                name={input.title}
                type={input.title}
                value={input.value}
                changeHandler={input.changeHandler}
                blurHandler={input.blurHandler}
              />
              <ValidationAlert isValid={input.isValid}>{input.alertMessage}</ValidationAlert>
            </>
          ),
          [input.value, input.isValid],
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

const SignUpFormWrapper = styled.div`
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

const ValidationAlert = styled.div<ValidationAlertProps>`
  font-size: 0.8rem;
  visibility: hidden;
  color: ${theme.color.red};
  ${({ isValid }) =>
    isValid &&
    `
    visibility: visible !important;
  `}
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const SignInButtonWrapper = styled.div`
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
