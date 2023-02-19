import styled from 'styled-components/macro';
import { Layout } from 'components/layouts/Layout';
import FullLogoImg from 'assets/full_logo_img.png';
import GithubImg from 'assets/github_img.png';
import StartImg from 'assets/start_img.png';

export const AboutPage = () => {
  return (
    <Layout>
      <Wrapper>
        <LogoImage src={FullLogoImg} />
        <Title>Window98🌎 콘셉트의 게시판 서비스 'Yuzamin97'에 방문하신 것을 환영합니다.</Title>
        <Contents>
          <StartImage src={StartImg} alt="start_image" />
          Start 버튼을 클릭하여 회원가입 하신 뒤, Board에서 자유롭게 게시글과 댓글을 작성해보세요!
        </Contents>
        <MadeByText>
          Made by
          <GithubUrl href="https://github.com/nvrtmd" target="_blank">
            <GithubImage src={GithubImg} alt="start_image" />
            yuzamin
          </GithubUrl>
        </MadeByText>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3rem;
  text-align: center;
`;

const LogoImage = styled.img`
  width: 40%;
  max-width: 15rem;
  min-width: 10rem;
  margin-bottom: 2rem;
`;

const StartImage = styled.img`
  width: 1.1rem;
  margin-right: 3px;
`;

const GithubImage = styled.img`
  width: 1.1rem;
  margin-right: 3px;
`;

const Title = styled.p`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

const Contents = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const MadeByText = styled.p`
  font-size: 1.2rem;
  display: flex;
`;

const GithubUrl = styled.a`
  margin-left: 5px;
  &:hover {
    text-decoration: underline;
    cursor: url('https://user-images.githubusercontent.com/67324487/215111457-633e4a12-d4ad-442a-934d-398619fd486b.png'),
      auto;
  }
`;
