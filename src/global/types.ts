export interface Post {
  post_idx: number;
  post_title: string;
  post_contents: string;
  createdAt: Date;
  updatedAt: Date;
  member_idx: number;
  post_writer: {
    member_id: string;
    member_nickname: string;
  };
}
