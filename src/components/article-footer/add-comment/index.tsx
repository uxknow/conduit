import { FC } from "react";
import { SubmitButton } from "../../submit-button";
import { useAppSelector } from "../../../hooks/redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../error-message";
import { useCreateCommentMutation } from "../../../api/article";

interface IAddCommentProps {
  image: string;
  slug: string
}

interface ICommentData {
  comment: string;
}

const validateForm = ({comment}: ICommentData) => {
  let error = {}
  if (!comment) {
    error = {
      comment: {
        message: 'This field is required'
      }
    }
  }
  return error
}

export const AddComment: FC<IAddCommentProps> = ({ image, slug }) => {
  // const user = useAppSelector((state) => state.user);
  // console.log(user);

  const [createComment] = useCreateCommentMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ICommentData>({
    defaultValues: {
      comment: "",
    },
    resolver: (values) => {
      return {
        values,
        errors: validateForm(values)
      };
    },
  });

  const onSubmit = async(data: ICommentData) => {
    if (!slug) {
      return
    }

    try {
      await createComment({slug, comment: data.comment})
      reset()
    } catch(err) {
      return err
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {errors.comment?.message && <ErrorMessage error={errors.comment.message} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="none"
        noValidate
        className="flex flex-col border border-neutral-300 rounded-md"
      >
        <textarea
          className="block resize-y p-5 h-[100px] outline-none"
          placeholder="Write a comment..."
          {...register("comment", { required: true })}
        />
        <div className="flex justify-between items-center py-3 px-5 bg-neutral-100">
          <img
            src={image}
            alt="avatar"
            className="h-8 w-8 object-cover rounded-full"
          />
          <SubmitButton disabled={isSubmitting} sizeBtn="sm">
            Post Comment
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};
