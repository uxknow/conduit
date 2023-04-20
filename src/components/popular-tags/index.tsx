import { FC } from "react";
import { TagList } from "../article/tag-list";
import { useGetPopularTagsQuery } from "../../api";
import { Container } from "../container";

interface IPopularTagsProps {}

export const PopularTags: FC<IPopularTagsProps> = () => {
  const { data, isLoading, isFetching, error } = useGetPopularTagsQuery();

  if (error) {
    return <Container>Error while loading tags</Container>
  }
  return (
    <div className="bg-lightGray/20 px-2.5 pt-1.5 pb-2.5  rounded-[4px]">
      <p className="mb-1">PopularTags</p>
      {isLoading || isFetching ? (
        "Loading tags..."
      ) : (
        <TagList
          tagList={data?.tags || []}
          tagStyle="DARK"
          tagAs="a"
        />
      )}
    </div>
  );
};
