import { FC, useEffect } from "react";
import { FormField } from "../../components/form-input";
import { useForm, Controller } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";
import { Container } from "../../components/container";
import { SubmitButton } from "../../components/submit-button";
import { ErrorMessage } from "../../components/error-message";
import { editorSchema } from "../../utils/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateArticleMutation,
  useGetArticleQuery,
  useUpdateArticleMutation,
} from "../../api/article";
import { useNavigate, useParams } from "react-router-dom";

interface IEditorData {
  title: string;
  description: string;
  body: string;
  tagList: string;
}

export const EditorPage: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset
  } = useForm<IEditorData>({
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tagList: "",
    },
    resolver: yupResolver(editorSchema),
  });

  const [createArticle, result] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();

  const { slug } = useParams();
  const { data: dataArticle, isLoading } = useGetArticleQuery(slug || "", {
    skip: !slug,
  });

  useEffect(() => {
    if (!dataArticle) {
      return;
    }
    reset({
      title: dataArticle.article.title,
      body: dataArticle.article.body,
      description: dataArticle.article.description,
      tagList: dataArticle.article.tagList.join(', ')
    })
  }, [dataArticle]);

  const onSubmitEditorData = async (data: IEditorData) => {
    try {
      if (!slug) {
        const { article } = await createArticle(data).unwrap();
        navigate(`/article/${article.slug}`);
      } else {
        const { article } = await updateArticle({
          slug,
          article: data,
        }).unwrap();
        navigate(`/article/${article.slug}`);
      }
    } catch (err) {
      return err;
    }
  };

  const serverErr =
    result.error && "data" in result.error
      ? (result.error.data as Record<string, object>).errors
      : "";
  const serverErrMsg = Object.keys(serverErr).length
    ? `${Object.keys(serverErr)[0]} ${Object.values(serverErr)[0]}`
    : "";
  const errorMsg = serverErrMsg
    ? ""
    : (Object.values(errors)?.[0]?.message as string);

  if (slug && isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container className="max-w-3xl	 mt-6">
      {errors && <ErrorMessage error={serverErrMsg || errorMsg} />}

      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitEditorData)}
        className="flex flex-col gap-5"
      >
        <FormField
          placeholder="Article Title"
          error={(errorMsg?.includes("title") && errorMsg) || ""}
          {...register("title")}
        />
        <FormField
          sizeInput="sm"
          placeholder="Whats this article about?"
          error={(errorMsg?.includes("description") && errorMsg) || ""}
          {...register("description")}
        />
        <Controller
          name="body"
          control={control}
          render={({ field: { value, onChange } }) => (
            <MDEditor
              value={value}
              onChange={onChange}
              className={`${
                errorMsg?.includes("body") ? "border border-red-500" : ""
              } [&.w-md-editor]:focus-within:border [&.w-md-editor]:focus-within:border-softBlue`}
              textareaProps={{
                placeholder: "Write your article (in markdown)",
              }}
            />
          )}
        />
        <FormField
          sizeInput="sm"
          placeholder="Enter tags"
          error={(errorMsg?.includes("tagList") && errorMsg) || ""}
          {...register("tagList")}
        />
        <SubmitButton disabled={isSubmitting}>Publish Article</SubmitButton>
      </form>
    </Container>
  );
};
