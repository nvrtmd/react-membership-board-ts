export interface NewPost {
  post_title: string;
  post_contents: string;
}
export interface Post extends NewPost {
  post_idx: number;
  createdAt: Date;
  updatedAt: Date;
  member_idx: number;
  post_writer: {
    member_id: string;
    member_nickname: string;
  };
  comments: Comment[];
}

export interface Comment {
  comment_contents: string;
  comment_idx: number;
  comment_writer: {
    member_id: string;
    member_nickname: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Member {
  id: string;
  nickname?: string;
  password?: string;
}
