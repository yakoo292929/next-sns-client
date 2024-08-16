export interface ProfileType {
  id: number;
  bio: string;
  prifileImageUrl: string;
  userId: number;
  user: UserType;
}


export interface UserType {
  id: number;
  username: String;
  email: String;
  password: String;
  posts: PostType[];
  profile: ProfileType;
}


export interface PostType {
  id: number;
  content: string;
  createdAt: string;
  autherId: number;
  auther: UserType;
}
