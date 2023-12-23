'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

type PropsPagination = {
  limit: number;
  count: number;
};

const Pagination = ({ limit }: PropsPagination) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const createPageURL = (pageNumber: number | string) => {
    params.set('page', pageNumber.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  const queryPage = Number(params.get('page'));

  useEffect(() => {
    setCurrentPage(queryPage || 1);
  }, [queryPage]);

  const [currentPage, setCurrentPage] = useState<number>(queryPage);

  const onChangePagination = (newPage: number) => {
    setCurrentPage(newPage);
    createPageURL(newPage);
  };

  return (
    <ResponsivePagination
      current={currentPage}
      total={limit}
      onPageChange={onChangePagination}
    />
  );
};

export default Pagination;
