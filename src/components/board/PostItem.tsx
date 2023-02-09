import styled from 'styled-components/macro';
import moment from 'moment';
import { theme } from 'styles/theme';
import { Post } from 'global/types';

interface PostItemProps {
  data: Post;
  clickHandler: (postIdx: number) => void;
}

export const PostItem = ({ data, clickHandler }: PostItemProps) => {
  return (
    <PostWrapper onClick={() => clickHandler(data.post_idx)}>
      <PostIndex>{data.post_idx}</PostIndex>
      <PostTitle>
        {data.post_title} <PostCommentsCount> ({data.comments_count})</PostCommentsCount>
      </PostTitle>
      <PostContents>{data.post_contents}</PostContents>
      <PostInfo>
        <div>by {data.post_writer ? data.post_writer.member_nickname : 'deleted account'}</div>
        <div>{moment(data.updatedAt).format('YY.MM.DD HH:mm')}</div>
      </PostInfo>
    </PostWrapper>
  );
};

const PostWrapper = styled.div`
  border: 1px solid green;
  max-width: 100%;
  margin: 2rem 0;
  padding: 2rem;
  box-shadow: -0.4rem 0 0 0 black, 0.4rem 0 0 0 black, 0 -0.4rem 0 0 black, 0 0.4rem 0 0 black;
  cursor: url('https://user-images.githubusercontent.com/67324487/215111457-633e4a12-d4ad-442a-934d-398619fd486b.png'),
    auto;

  &:hover > div,
  &:hover > div > div {
    color: ${theme.color.white};
    cursor: url('https://user-images.githubusercontent.com/67324487/215111457-633e4a12-d4ad-442a-934d-398619fd486b.png'),
      auto;
  }

  &:hover {
    background: ${theme.color.navy};
  }
`;

const PostIndex = styled.div`
  font-size: 1.2rem;
  color: ${theme.color.grey};
`;

const PostTitle = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
`;

const PostCommentsCount = styled.div`
  color: ${theme.color.grey};
  font-size: 1.2rem;
  margin-left: 0.5rem;
`;

const PostContents = styled.div`
  font-size: 1.45rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostInfo = styled.div`
  color: ${theme.color.grey};
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  &:hover > div {
    cursor: url('https://user-images.githubusercontent.com/67324487/215111457-633e4a12-d4ad-442a-934d-398619fd486b.png'),
      auto;
  }
`;
