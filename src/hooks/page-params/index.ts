import { useSearchParams } from "react-router-dom"

export const usePageParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.has("page") ? Number(searchParams.get("page")) - 1 : 0

  const setPage = (value: number) => {
    if (value > 0) {
      searchParams.set("page", String(value + 1));
    } else {
      searchParams.delete("page");
    }
    setSearchParams(searchParams);
  }

  //Другой способ задать  searchParams
  // const serializeSearchParams = (prev: Record<string, string>) => {
  //   const newParams = new URLSearchParams(prev);
  //   return newParams.toString();
  // };
  
  // const setPage = (value: number) => {
  //   setSearchParams(serializeSearchParams({page: String(value + 1)}))
  // }

  return {page, setPage} 
}