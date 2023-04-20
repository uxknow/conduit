import { FC, useState, useEffect } from "react";
import { Container } from "../container";
import { Article } from "../article";
import { FeedToogle } from "../feed-toogle";
import { useGetArticlesQuery } from "../../api";
import ReactPaginate from "react-paginate";
import { PAGE_LIMIT } from "../../api/consts";
import { useSearchParams } from "react-router-dom";
import { PopularTags } from "../popular-tags";

export const HomeContent: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    searchParams.has("page") ? Number(searchParams.get("page")) - 1 : 0
  );

  const { data, error, isLoading, isFetching } = useGetArticlesQuery({ page, tag: searchParams.get('tag')});
  
  const articleCount = data?.articlesCount || 0;
  const itemsPerPage = Math.ceil(articleCount / PAGE_LIMIT);
    
  const setParams = (value: number) => {
    if (value > 0) {
      searchParams.set("page", String(value + 1));
     } else {
        searchParams.delete("page");
      }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    setPage(0);
  }, [searchParams.get('tag')]);

  //Другой способ задать  searchParams
  // const serializeSearchParams = (prev: Record<string, string>) => {
  //   const newParams = new URLSearchParams(prev);
  //   return newParams.toString();
  // };

  const handleClickPage = ({ selected }: { selected: number }) => {
    setPage(selected);
    setParams(selected);
    // или setSearchParams(serializeSearchParams({page: String(selected + 1)}))
  };
  console.log(page, itemsPerPage, data)
  if (error) {
    return <Container>Error while loading articles</Container>;
  }

  if (isLoading || isFetching) {
    return <Container>Loading...</Container>;
  }
  return (
    <Container className="flex gap-8">
      <div className="w-3/4">
        <FeedToogle />
        {data?.articles.map((article: any) => (
          <Article key={article.slug} {...article} />
        ))}
        <ReactPaginate
          pageCount={itemsPerPage}
          onPageChange={handleClickPage}
          forcePage={page}
          nextLabel=""
          previousLabel=""
          pageRangeDisplayed={itemsPerPage}
          containerClassName="flex text-green my-6 h-10"
          pageClassName="group my-auto"
          pageLinkClassName="px-3 py-2 border border-linghtGray hover:bg-lightGray/30 group-[&:nth-child(2)]:rounded-l group-[&:nth-last-child(2)]:rounded-r"
          activeClassName="group active"
          activeLinkClassName="group-[.active]:bg-green group-[.active]:text-white group-[.active]:border-green pointer-events-none"
        />
      </div>
      <div className="w-1/4 pl-4">
        <PopularTags/>
      </div>
    </Container>
  );
};

//Math.min(page, itemsPerPage)