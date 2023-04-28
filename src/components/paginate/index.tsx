import { FC } from "react";
import ReactPaginate from "react-paginate";

interface IPaginateProps {
  page: number;
  itemsPerPage: number;
  handleClickPage: (selected: { selected: number }) => void;
}

export const Paginate: FC<IPaginateProps> = ({
  page,
  itemsPerPage,
  handleClickPage,
}) => {
  return (
    <ReactPaginate
      pageCount={itemsPerPage}
      onPageChange={handleClickPage}
      forcePage={page}
      nextLabel=""
      previousLabel=""
      pageRangeDisplayed={itemsPerPage}
      containerClassName="flex text-lightGreen my-6 h-10"
      pageClassName="group my-auto"
      pageLinkClassName="px-3 py-2 border border-gainsboro  hover:bg-gainsboro group-[&:nth-child(2)]:rounded-l group-[&:nth-last-child(2)]:rounded-r"
      activeClassName="group active"
      activeLinkClassName="group-[.active]:bg-lightGreen group-[.active]:text-white group-[.active]:border-lightGreen pointer-events-none"
    />
  );
};
