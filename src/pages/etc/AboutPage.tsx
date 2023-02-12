import styled from 'styled-components/macro';
import { Layout } from 'components/layouts/Layout';
import FullLogoImg from 'assets/full_logo_img.png';

export const AboutPage = () => {
  return (
    <Layout>
      <Wrapper>
        <LogoImage src={FullLogoImg} />
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  background: red;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 20%;
`;
