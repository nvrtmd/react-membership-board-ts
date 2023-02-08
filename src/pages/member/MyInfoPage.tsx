import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import { member } from 'api/member';
import { useValidInput } from 'hooks/useValidInput';
import { Input } from 'components/common/Input';
import { Button } from 'components/common/Button';
import { theme } from 'styles/theme';

interface ValidationAlertProps {
  isValid: boolean;
}

export const MyInfoPage = () => {
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
    if (idState.isValid && nicknameState.isValid) {
      return true;
    } else {
      alert('입력하신 내용을 확인해주세요.');
      return false;
    }
  };

  const handleMemberInfoModifyFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isMemberInfoModifyFormInputValid()) {
      try {
        await member.modifyMemberInfo({ id: idState.value, nickname: nicknameState.value });
        alert('회원 정보가 수정되었습니다.');
        handleIsModifyModeToggle();
        fetchMemberData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleIsModifyModeToggle = () => {
    setIsModifyMode((prev) => !prev);
  };

  const handleDeleteAccountButtonClick = () => {
    console.log('Delete Account!');
  };

  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <MemberInfoModifyFormWrapper>
            <MemberInfoModifyForm onSubmit={handleMemberInfoModifyFormSubmit}>
              <PageTitle>- My Info -</PageTitle>
              <Input
                title="id"
                name="id"
                type="id"
                value={idState.value}
                changeHandler={handleIdChange}
                blurHandler={handleIdBlur}
                readOnly={!isModifyMode}
              />
              <ValidationAlert isValid={!idState.isValid && idState.isValid !== null}>
                영문 4 ~ 12자를 입력하세요.
              </ValidationAlert>
              <Input
                title="nickname"
                name="nickname"
                type="nickname"
                value={nicknameState.value}
                changeHandler={handleNicknameChange}
                blurHandler={handleNicknameBlur}
                readOnly={!isModifyMode}
              />
              <ValidationAlert isValid={!nicknameState.isValid && nicknameState.isValid !== null}>
                영어/숫자/한글 4~12자를 입력하세요.
              </ValidationAlert>
              {isModifyMode ? (
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
              )}
            </MemberInfoModifyForm>
          </MemberInfoModifyFormWrapper>
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const MemberInfoModifyFormWrapper = styled.div`
  min-height: 100%;
  display: flex;
`;

const MemberInfoModifyForm = styled.form`
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
