/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Separator,
} from '@components';

type PaginationBarProps = {
  data: Array<any>;
  itemsPerPage?: number;
  setState: Dispatch<SetStateAction<any>>;
};

interface ChunkArrayParams {
  data: Array<any>;
  chunkSize: number;
}

const chunkArray = ({ data, chunkSize }: ChunkArrayParams) => {
  const result = [];

  for (let i = 0; i <= data.length; i += chunkSize) {
    result.push(data.slice(i, i + chunkSize));
  }

  return result;
};

export const PaginationBar: React.FC<PaginationBarProps> = ({
  data,
  itemsPerPage = 12,
  setState,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  if (currentPage !== 1 && totalPages < currentPage) setCurrentPage(1);
  const handlePagination = (i: number) => {
    setCurrentPage(i);
  };
  const renderPaginationItems = () => {
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === currentPage}
            onClick={() => handlePagination(i)}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return paginationItems;
  };
  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  useEffect(() => {
    setState(chunkArray({ data, chunkSize: itemsPerPage })[currentPage - 1]);
  }, [data, currentPage, setState, itemsPerPage]);

  return (
    <>
      <Separator className="sm:mb-0 xl:my-1" />
      <div className="items-center flex justify-center col-span-full bg-amber-400 h-12 rounded-xl mb-1">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevious}
                className="cursor-pointer"
              />
            </PaginationItem>
            {renderPaginationItems()}
            {totalPages > 30 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext onClick={handleNext} className="cursor-pointer" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};
