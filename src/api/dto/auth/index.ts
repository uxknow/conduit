export interface IAuthDTO {
  user: IUser;
}

export interface IUser {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}
