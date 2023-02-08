import styled from 'styled-components/macro';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';

export const MyInfoPage = () => {
  return (
    <Layout>
      <BrowserWrapper>
        <Browser>This is my info page!</Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
`;
