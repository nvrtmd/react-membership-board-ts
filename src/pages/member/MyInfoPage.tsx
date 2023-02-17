import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import { member } from 'api/member';
import { useValidInput } from 'hooks/useValidInput';
import { Input } from 'components/common/Input';
import { Button } from 'components/common/Button';
import { theme } from 'styles/theme';
import { CustomError } from 'global/types';
import WindowsImg from 'assets/windows_img.png';

interface ValidationAlertProps {
  isValid: boolean;
}

export const MyInfoPage = () => {
  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <MemberInfoModifyFormWrapper>
            <MemberInfoModifyForm />
          </MemberInfoModifyFormWrapper>
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

export const MemberInfoModifyForm = () => {
  const {
    inputState: idState,
    handleInputChange: handleIdChange,
    handleInputBlur: handleIdBlur,
    handleInputSet: handleIdSet,
  } = useValidInput('id');
  const {
    inputState: nicknameState,
    handleInputChange: handleNicknameChange,
    handleInputBlur: handleNicknameBlur,
    handleInputSet: handleNicknameSet,
  } = useValidInput('nickname');
  const [isModifyMode, setIsModifyMode] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchMemberData = async () => {
    try {
      const fetchedData = await member.getMemberInfo();
      handleIdSet(fetchedData.member_id);
      handleNicknameSet(fetchedData.member_nickname);
    } catch {
      console.log('비로그인 회원입니다.');
    }
  };

  useEffect(() => {
    fetchMemberData();
  }, []);

  const isMemberInfoModifyFormInputValid = () => {
    return idState.isValid && nicknameState.isValid;
  };

  const handleMemberInfoModifyFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isMemberInfoModifyFormInputValid()) {
        try {
          await member.modifyMemberInfo({ id: idState.value, nickname: nicknameState.value });
          alert('회원 정보가 수정되었습니다.');
          handleIsModifyModeToggle();
          fetchMemberData();
        } catch (err) {
          const error = err as CustomError;
          alert(error.message);
          return;
        }
      } else {
        alert('입력하신 내용이 올바른지 확인해주세요.');
      }
    },
    [idState.isValid, nicknameState.isValid],
  );

  const handleIsModifyModeToggle = useCallback(() => {
    setIsModifyMode((prev) => !prev);
  }, []);

  const handleDeleteAccountButtonClick = useCallback(async () => {
    try {
      if (confirm('정말로 탈퇴하시겠습니까?')) {
        await member.deleteAccount();
        navigate('/');
      } else {
        return;
      }
    } catch (err) {
      const error = err as CustomError;
      alert(error.message);
    }
  }, []);

  const formHeader = useMemo(
    () => (
      <>
        <FormHeader>
          <div>
            <WindowsImage src={WindowsImg} />
            <div>Yuzamin97</div>
          </div>
        </FormHeader>

        <PageTitle>- My Info -</PageTitle>
      </>
    ),
    [],
  );

  const formFooter = useMemo(
    () =>
      isModifyMode ? (
        <ButtonWrapper>
          <Button name="Cancel" type="button" restoreHandler={handleIsModifyModeToggle} />
          <Button name="Modify" type="submit" />
        </ButtonWrapper>
      ) : (
        <ModifyInfoButtonWrapper>
          <div>
            <ModifyInfoButton onClick={handleIsModifyModeToggle}>Modify Info</ModifyInfoButton>
            <DeleteAccountButton onClick={handleDeleteAccountButtonClick}>Delete Account</DeleteAccountButton>
          </div>
        </ModifyInfoButtonWrapper>
      ),
    [isModifyMode],
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
      title: 'nickname',
      value: nicknameState.value,
      changeHandler: handleNicknameChange,
      blurHandler: handleNicknameBlur,
      isValid: !nicknameState.isValid && nicknameState.isValid !== null,
      alertMessage: '영어/숫자/한글 4~12자를 입력하세요.',
    },
  ];

  return (
    <Form onSubmit={handleMemberInfoModifyFormSubmit}>
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
                readOnly={!isModifyMode}
              />
              <ValidationAlert isValid={input.isValid}>{input.alertMessage}</ValidationAlert>
            </>
          ),
          [input.value, input.isValid, isModifyMode],
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

const MemberInfoModifyFormWrapper = styled.div`
  min-height: 100%;
  display: flex;
  padding: 0.5rem 2.5rem;
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

const Form = styled.form`
  margin: auto;
  padding: 2rem 0;
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

const ModifyInfoButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const ModifyInfoButton = styled.div`
  font-size: 1.2rem;
  &:hover {
    color: ${theme.color.navy};
  }
  text-align: center;
  text-decoration: underline;
  cursor: url('https://user-images.githubusercontent.com/67324487/215111457-633e4a12-d4ad-442a-934d-398619fd486b.png'),
    auto;
`;

const DeleteAccountButton = styled.div`
  text-align: center;
  cursor: url('https://user-images.githubusercontent.com/67324487/215111457-633e4a12-d4ad-442a-934d-398619fd486b.png'),
    auto;
  font-size: 1rem;
  &:hover {
    color: ${theme.color.black};
    text-decoration: underline;
  }
  color: ${theme.color.grey};
  margin-top: 1rem;
`;
