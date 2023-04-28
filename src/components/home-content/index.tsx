import { FC } from "react";
import { Container } from "../container";
import { ArticlePreview } from "../article-preview";
import { FeedToogle } from "../feed-toogle";
import { useGetArticlesQuery } from "../../api/article";
import { useSearchParams } from "react-router-dom";
import { PopularTags } from "../popular-tags";
import { Paginate } from "../paginate";
import { usePageParams } from "../../hooks/page-params";

export const HomeContent: FC = () => {
  const [searchParams] = useSearchParams();
  const { page, setPage } = usePageParams();
  const limit = 10;

  const { data, error, isLoading, isFetching } = useGetArticlesQuery({
    page,
    limit,
    tag: searchParams.get("tag"),
  });

  const articleCount = data?.articlesCount || 0;
  const itemsPerPage = Math.ceil(articleCount / limit);

  const handleClickPage = ({ selected }: { selected: number }) => {
    setPage(selected);
  };

  if (error) {
    return <Container>Error while loading articles</Container>;
  }

  if (isLoading || isFetching) {
    return <Container>Loading...</Container>;
  }
  return (
    <Container className="flex gap-8 mt-6">
      <div className="w-3/4">
        <FeedToogle
          globalFeed="Global Feed"
          tag={searchParams.get("tag") || ""}
        />
        {data?.articles.map((article: any) => (
          <ArticlePreview key={article.slug} {...article} />
        ))}
        {itemsPerPage > 1 && (
          <Paginate
            page={page}
            itemsPerPage={itemsPerPage}
            handleClickPage={handleClickPage}
          />
        )}
      </div>
      <div className="w-1/4 pl-4">
        <PopularTags />
      </div>
    </Container>
  );
};
