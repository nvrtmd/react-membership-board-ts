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

interface ValidationAlertProps {
  isValid: boolean;
}

export const SignUpPage = () => {
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
        console.log(err);
      }
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
              <PageTitle>- Sign Up -</PageTitle>
              <Input
                title="id"
                name="id"
                type="id"
                value={idState.value}
                changeHandler={handleIdChange}
                blurHandler={handleIdBlur}
              />
              <ValidationAlert isValid={!idState.isValid && idState.isValid !== null}>
                영문 4 ~ 12자를 입력하세요.
              </ValidationAlert>
              <Input
                title="password"
                name="password"
                type="password"
                value={passwordState.value}
                changeHandler={handlePasswordChange}
                blurHandler={handlePasswordBlur}
              />
              <ValidationAlert isValid={!passwordState.isValid && passwordState.isValid !== null}>
                숫자 혹은 특수 문자를 포함하여 8자 이상 입력하세요.
              </ValidationAlert>
              <Input
                title="nickname"
                name="nickname"
                type="nickname"
                value={nicknameState.value}
                changeHandler={handleNicknameChange}
                blurHandler={handleNicknameBlur}
              />
              <ValidationAlert isValid={!nicknameState.isValid && nicknameState.isValid !== null}>
                영어/숫자/한글 4~12자를 입력하세요.
              </ValidationAlert>
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
