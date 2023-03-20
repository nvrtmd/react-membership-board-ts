import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { member } from 'apis/member';
import { useValidInput } from 'hooks/useValidInput';
import { Browser } from 'components/common/Browser';
import { Input } from 'components/common/Input';
import { Button } from 'components/common/Button';
import { theme } from 'styles/theme';
import WindowsImg from 'assets/windows_img.png';
import { MEMBER_ALERT_MESSAGE, VALIDATION_ALERT_MESSAGE } from 'constants/constants';
import { CustomError } from 'global/types';

interface ValidationAlertProps {
  isValid: boolean;
}

export const MyInfoPage = () => {
  return (
    <BrowserWrapper>
      <Browser>
        <MemberInfoModifyFormWrapper>
          <MemberInfoModifyForm />
        </MemberInfoModifyFormWrapper>
      </Browser>
    </BrowserWrapper>
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

  let originalMemberData: { member_id: string; member_nickname: string };

  const fetchMemberData = async () => {
    try {
      const fetchedData = await member.getMemberInfo();
      handleIdSet(fetchedData.member_id);
      handleNicknameSet(fetchedData.member_nickname);
      originalMemberData = fetchedData;
    } catch {
      console.log(MEMBER_ALERT_MESSAGE.NOT_SIGNED_IN_USER_ALERT);
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
          alert(MEMBER_ALERT_MESSAGE.MEMBER_INFO_MODIFIED_ALERT);
          handleIsModifyModeToggle();
          fetchMemberData();
        } catch (err) {
          const error = err as CustomError;
          alert(error.message);
          return;
        }
      } else {
        alert(MEMBER_ALERT_MESSAGE.CHECK_YOUR_INPUT_ALERT);
      }
    },
    [idState.value, idState.isValid, nicknameState.value, nicknameState.isValid],
  );

  const handleIsModifyModeToggle = useCallback(() => {
    setIsModifyMode((prev) => !prev);
  }, []);

  const handleCancelButtonClick = useCallback(() => {
    handleIdSet(originalMemberData.member_id);
    handleNicknameSet(originalMemberData.member_nickname);
    handleIsModifyModeToggle();
  }, []);

  const handleDeleteAccountButtonClick = useCallback(async () => {
    try {
      if (confirm(MEMBER_ALERT_MESSAGE.DELETE_ACCOUNT_CONFIRM)) {
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
          <Button name="Cancel" type="button" restoreHandler={handleCancelButtonClick} />
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
      alertMessage: VALIDATION_ALERT_MESSAGE.ID_VALIDATION_ALERT,
    },
    {
      title: 'nickname',
      value: nicknameState.value,
      changeHandler: handleNicknameChange,
      blurHandler: handleNicknameBlur,
      isValid: !nicknameState.isValid && nicknameState.isValid !== null,
      alertMessage: VALIDATION_ALERT_MESSAGE.NICKNAME_VALIDATION_ALERT,
    },
  ];

  return (
    <Form onSubmit={handleMemberInfoModifyFormSubmit}>
      {formHeader}
      {inputControlList.map((input) =>
        useMemo(
          () => (
            <div key={input.title}>
              <Input
                title={input.title}
                name={input.title}
                type={input.title}
                value={input.value}
                changeHandler={input.changeHandler}
                blurHandler={input.blurHandler}
                readOnly={!isModifyMode}
              />
              <ValidationAlert isValid={input.isValid}>{input.alertMessage}</ValidationAlert>
            </div>
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
