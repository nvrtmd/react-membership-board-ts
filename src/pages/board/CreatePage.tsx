import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';

export const CreatePage = () => {
  return (
    <Layout>
      <BrowserWrapper>
        <Browser>This is create page</Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
`;
