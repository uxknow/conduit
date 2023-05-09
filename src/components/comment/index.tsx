import { FC } from "react";
import { UserBadge } from "../user-badge";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteCommentMutation } from "../../api/article";
import { useParams } from "react-router-dom";

interface ICommentProps {
  body: string;
  username: string;
  image: string;
  createdAt: Date;
  id: number;
}

export const Comment: FC<ICommentProps> = ({
  body,
  username,
  image,
  createdAt,
  id,
}) => {
  const isAuthUser = localStorage.getItem("name") === username;
  const { slug } = useParams();
  const [deleteComment] = useDeleteCommentMutation();

  const onDeleteCommentClick = async () => {
    if (!slug) {
      return;
    }
    try {
      await deleteComment({ slug, id });
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="border border-neutral-300 rounded w-full">
      <div className="p-5">
        <p>{body}</p>
      </div>
      <div className="flex items-center justify-between border-t py-3 px-5 text-xs bg-neutral-100">
        <UserBadge
          username={username}
          image={image}
          createdAt={new Date(createdAt)}
          direction="row"
        />
        {isAuthUser && (
          <RiDeleteBin6Line
            onClick={onDeleteCommentClick}
            className="text-base cursor-pointer text-midGray hover:text-black"
          />
        )}
      </div>
    </div>
  );
};
