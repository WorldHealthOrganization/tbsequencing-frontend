import React, { memo } from 'react';
import MUIPagination from '@mui/material/Pagination';
import { pagination } from '../../../../components/DataGrid/styles';

interface IPaginationProps {
  onPageClick?: (page: number) => void;
  pageCount?: number;
  page?: number;
}

const Pagination = ({ onPageClick, pageCount, page = 1 }:IPaginationProps) => (
  <MUIPagination
    onChange={(e, nextPage) => onPageClick && onPageClick(nextPage)}
    sx={pagination.paginationComponent}
    count={pageCount || 1}
    page={page}
    variant="outlined"
    shape="rounded"
  />
);

export default memo(Pagination);
