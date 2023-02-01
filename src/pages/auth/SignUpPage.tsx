import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import { Layout } from 'components/layouts/Layout';
import { Browser } from 'components/common/Browser';
import { Input } from 'components/common/Input';
import { Button } from 'components/common/Button';
import WindowsImg from 'assets/windows_img.png';
import { auth } from 'api/auth';
import { useFormInput } from 'hooks/useFormInput';

interface ValidationAlertProps {
  isValid: boolean;
}

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { inputState: idState, handleInputChange: handleIdChange, handleInputBlur: handleIdBlur } = useFormInput('id');
  const {
    inputState: passwordState,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
  } = useFormInput('password');
  const {
    inputState: nicknameState,
    handleInputChange: handleNicknameChange,
    handleInputBlur: handleNicknameBlur,
  } = useFormInput('nickname');

  const isFormInputValid = () => {
    return idState.isValid && passwordState.isValid && nicknameState.isValid;
  };

  const handleSignUpFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormInputValid()) {
      alert('입력하신 내용을 확인해주세요.');
      return;
    }
    try {
      await auth.signUp({ id: idState.value, password: passwordState.value, nickname: nicknameState.value });
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
              <Input
                title="id"
                name="id"
                type="id"
                value={idState.value}
                changeHandler={handleIdChange}
                blurHandler={handleIdBlur}
              />
              <ValidationAlert isValid={!idState.isValid && idState.isValid !== null}>HEY!!</ValidationAlert>
              <Input
                title="password"
                name="password"
                type="password"
                value={passwordState.value}
                changeHandler={handlePasswordChange}
                blurHandler={handlePasswordBlur}
              />
              <ValidationAlert isValid={!passwordState.isValid && passwordState.isValid !== null}>
                HEY!!
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
                HEY!!
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
const SignUpFormTitle = styled.div`
  text-align: center;
  font-size: 1.6rem;
  margin: 0.5rem 0 1rem;
`;

const ValidationAlert = styled.div<ValidationAlertProps>`
  font-size: 1rem;
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
