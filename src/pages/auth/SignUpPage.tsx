import styled from 'styled-components/macro';
import { Layout } from 'components/layouts/Layout';
import { Browser } from 'components/common/Browser';
import { Input } from 'components/common/Input';

export const SignUpPage = () => {
  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <SignUpForm>
            <Input title="id" name="id" type="id" />
            <Input title="password" name="password" type="password" />
            <Input title="nickname" name="nickname" type="nickname" />
          </SignUpForm>
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const SignUpForm = styled.form`
  display: flex;
  height: 100%;
`;
