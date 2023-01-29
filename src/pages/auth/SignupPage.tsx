import styled from 'styled-components/macro';
import { Layout } from 'components/layouts/Layout';
import { Browser } from 'components/common/Browser';
import { Input } from 'components/common/Input';

export const SignupPage = () => {
  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <Input title="아이디" />
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
`;
