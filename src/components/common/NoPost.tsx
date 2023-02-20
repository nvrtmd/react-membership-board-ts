import styled from 'styled-components/macro';
import NoPostImg from 'assets/no_post_img.png';

export const NoPost = () => {
  return (
    <NoPostWrapper>
      <NoPostBox>
        <NoPostImage src={NoPostImg} />
        <div>No Post</div>
      </NoPostBox>
    </NoPostWrapper>
  );
};

const NoPostWrapper = styled.div`
  display: table-cell;
`;

const NoPostBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoPostImage = styled.img`
  width: 30%;
  max-width: 35%;
  min-width: 20%;
`;
