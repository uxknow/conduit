import { FC } from "react";
import { TagList } from "../tag-list";
import { useGetPopularTagsQuery } from "../../api/article";
import { Container } from "../container";

export const PopularTags: FC = () => {
  const { data, isLoading, isFetching, error } = useGetPopularTagsQuery();

  if (error) {
    return <Container>Error while loading tags</Container>;
  }
  return (
    <div className="bg-whiteSmoke px-2.5 pt-1.5 pb-2.5  rounded-[4px]">
      <p className="mb-1">PopularTags</p>
      {isLoading || isFetching ? (
        "Loading tags..."
      ) : (
        <TagList tagList={data?.tags || []} tagStyle="DARK" tagAs="a" />
      )}
    </div>
  );
};
