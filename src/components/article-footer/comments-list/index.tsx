import { FC } from "react";
import { IComment } from "../../../api/dto/comments";
import { Comment } from "../../comment";

interface ICommentsProps {
  comments: IComment[];
}

export const CommentsList: FC<ICommentsProps> = ({ comments }) => {
  return (
    <>
      {comments?.length !== 0 &&
        comments?.map(({ id, body, createdAt, author }) => (
          <Comment
            key={id}
            body={body}
            createdAt={createdAt}
            username={author.username}
            image={author.image}
          />
        ))}
    </>
  );
};
