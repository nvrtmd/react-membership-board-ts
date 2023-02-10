export interface NewPost {
  title: string;
  contents: string;
}

export interface NewComment {
  contents: string;
}

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
  comments?: Comment[];
  comments_count: number;
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

export interface CustomError {
  code: string;
  message: string;
}
