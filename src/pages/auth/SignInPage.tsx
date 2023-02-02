import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import { Layout } from 'components/layouts/Layout';
import { Browser } from 'components/common/Browser';

export const SignInPage = () => {
  return (
    <Layout>
      <BrowserWrapper>
        <Browser></Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
`;
