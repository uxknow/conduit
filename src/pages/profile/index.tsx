import { FC } from "react";
import { UserInfo } from "../../components/user-info";
import { ArticlePreview } from "../../components/article-preview";
import { Paginate } from "../../components/paginate";
import { Container } from "../../components/container";
import { useGetProfileQuery } from "../../api/profile";
import { useGetArticlesQuery } from "../../api/article";
import { useLocation, useParams } from "react-router-dom";
import { IProfilesDTO } from "../../api/dto/profiles";
import { FeedToogle } from "../../components/feed-toogle";
import { usePageParams } from "../../hooks/page-params";

interface IUsernameParams {
  username: string;
}

export const ProfilePage: FC = () => {
  const { username } = useParams<keyof IUsernameParams>();
  const { pathname } = useLocation();
  const { page, setPage } = usePageParams();
  const limit = 5;

  const {
    data: dataProfile,
    isLoading: isLoadingProfile,
    error: errorProfile,
  } = useGetProfileQuery(username?.slice(1) || "");

  const { data, isLoading, isFetching, error } = useGetArticlesQuery({
    page,
    limit,
    author: !pathname.includes("favorites") ? username?.slice(1) : "",
    favorited: pathname.includes("favorites") ? username?.slice(1) : "",
  });

  const itemsPerPage = Math.ceil((data?.articlesCount || 0) / limit);

  const handleClickPage = ({ selected }: { selected: number }) => {
    setPage(selected);
  };

  if (errorProfile) {
    return (
      <Container className="[&.container]:px-profileContainer">
        Error while loading userinfo
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="[&.container]:px-profileContainer mt-4">
        Error while loading articles
      </Container>
    );
  }

  return (
    <div>
      {!isLoadingProfile && (
        <UserInfo {...(dataProfile as IProfilesDTO)?.profile} />
      )}
      {!isLoadingProfile && (isLoading || isFetching) ? (
        <Container className="[&.container]:px-profileContainer">
          Loading articles...
        </Container>
      ) : (
        <Container className="[&.container]:px-profileContainer">
          <FeedToogle
            myArticles="My Articles"
            favoritedArticles="Favorited Articles"
          />
          {data?.articles.map((article) => (
            <ArticlePreview key={article.slug} {...article} />
          ))}
          {itemsPerPage > 1 && (
            <Paginate
              page={page}
              itemsPerPage={itemsPerPage}
              handleClickPage={handleClickPage}
            />
          )}
        </Container>
      )}
      {!isLoading && !data?.articles.length && (
        <Container className="[&.container]:px-profileContainer mt-4">
          <p>No articles are here... yet.</p>
        </Container>
      )}
    </div>
  );
};
