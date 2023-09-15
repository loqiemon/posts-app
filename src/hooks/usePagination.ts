
import React, { useState } from 'react'

interface usePaginationProps<T> {
    array: T[];
}

interface PaginationResult<T> {
    paginatedData: T[];
    rowsPerPage: number;
    page: number;
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function usePagination<T>({ array }: usePaginationProps<T>): PaginationResult<T> {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log(event)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = array.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return ({
    paginatedData,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage
  })
}

export default usePagination
