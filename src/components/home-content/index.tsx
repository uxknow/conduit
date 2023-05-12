import { FC, useState } from "react";
import { Container } from "../container";
import { ArticlePreview } from "../article-preview";
import { FeedToogle } from "../feed-toogle";
import {
  useGetArticlesQuery,
  useGetArticlesFeedQuery,
} from "../../api/article";
import { useSearchParams } from "react-router-dom";
import { PopularTags } from "../popular-tags";
import { Paginate } from "../paginate";
import { usePageParams } from "../../hooks/page-params";
import { useAppSelector } from "../../hooks/redux";

export const HomeContent: FC = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const { page, setPage } = usePageParams();
  const [activeFeed, setActiveFeed] = useState(
    isAuth && !searchParams.get("tag") ? "your" : "global"
  );
  const limit = 10;

  const { data, error, isLoading, isFetching } = useGetArticlesQuery({
    page,
    limit,
    tag: searchParams.get("tag") || undefined,
  });

  const {
    data: yourFeedData = null,
    error: yourFeedError = null,
    isLoading: yourFeedIsLoading = false,
    isFetching: yourFeedIsFetching = false,
  } = isAuth ? useGetArticlesFeedQuery({ limit, page }) : {};

  const articleCount =
    activeFeed === "your"
      ? yourFeedData?.articlesCount || 0
      : data?.articlesCount || 0;
  const itemsPerPage = Math.ceil(articleCount / limit);

  const handleClickPage = ({ selected }: { selected: number }) => {
    setPage(selected);
  };

  const isLoad =
    isLoading || isFetching || yourFeedIsLoading || yourFeedIsFetching;

  if (error || yourFeedError) {
    return <Container>Error while loading articles</Container>;
  }

  return (
    <Container className="flex gap-8 mt-6">
      <div className="w-3/4">
        <FeedToogle
          activeTab={activeFeed}
          setActiveTab={setActiveFeed}
          globalFeed="Global Feed"
          tag={searchParams.get("tag") || ""}
        />
        {isLoad ? (
          <Container className="mt-4">Loading articles...</Container>
        ) : activeFeed === "your" ? (
          yourFeedData?.articles.map((article: any) => (
            <ArticlePreview key={article.slug} {...article} />
          ))
        ) : (
          data?.articles.map((article: any) => (
            <ArticlePreview key={article.slug} {...article} />
          ))
        )}
        {((yourFeedData?.articles.length === 0 && activeFeed === "your") ||
          (data?.articles.length === 0 && activeFeed === "global")) &&
          !isLoad && (
            <Container className="mt-4">No articles are here... yet.</Container>
          )}
        {itemsPerPage > 1 && !isLoad && (
          <Paginate
            page={page}
            itemsPerPage={itemsPerPage}
            handleClickPage={handleClickPage}
          />
        )}
      </div>
      <div className="w-1/4 pl-4">
        <PopularTags setActiveTab={setActiveFeed} />
      </div>
    </Container>
  );
};
