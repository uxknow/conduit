export interface ICommentsDTO {
  comments: IComment[]
}

export interface IComment {
  id: number
  createdAt: Date
  updatedAt: Date
  body: string
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}

export interface INewCommentDTO {
  body: string
}