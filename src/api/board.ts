import axios from 'axios';

const board = {
  getPostList: async () => {
    try {
      const postListData = await axios.get('/post/list');
      return postListData.data.data;
    } catch {
      throw {
        error: '서버로부터 게시글 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
};

export { board };
