import styled from 'styled-components/macro';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';

export const ModifyPage = () => {
  return (
    <Layout>
      <BrowserWrapper>
        <Browser>Hello, This is modify page.</Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
`;
