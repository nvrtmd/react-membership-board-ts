import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import { Layout } from 'components/layouts/Layout';
import { Browser } from 'components/common/Browser';
import { Input } from 'components/common/Input';
import { Button } from 'components/common/Button';

export const SignUpPage = () => {
  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <SignUpFormWrapper>
            <SignUpForm>
              <Input title="id" name="id" type="id" />
              <Input title="password" name="password" type="password" />
              <Input title="nickname" name="nickname" type="nickname" />
              <ButtonWrapper>
                <Button name="Submit" />
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
