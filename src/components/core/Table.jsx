import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange, noFirstAndLastPageControls } = props;

  const handleFirstPageButtonClick = (
    event,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      {!noFirstAndLastPageControls && <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>}
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      {!noFirstAndLastPageControls && <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>}
    </Box>
  );
}

const Table = ({ columns, rows, rowsPerPage, withEdit, withDelete, noFirstAndLastPageControls }) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!rows.length) {
      setPage(0);
      return;
    }
    const lastPageForExpensesWithCategoryNamesFiltered = Math.ceil(rows.length / rowsPerPage) - 1;    
    if (lastPageForExpensesWithCategoryNamesFiltered < page) {
      setPage(lastPageForExpensesWithCategoryNamesFiltered);
    }
  }, [rows.length])

  const handleChangePage = (_, newPage) => setPage(newPage);

  const TablePaginationActionsMemoised = useCallback(
    (props) => <TablePaginationActions {...props} noFirstAndLastPageControls={noFirstAndLastPageControls} />, 
    [noFirstAndLastPageControls]
  );

  console.log("Table", rows);
  
  return (
    <div className="table-section">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column => (<th key={column.name}>{column.name}</th>)))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? 
            rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <tr key={row.id}>
                  {withEdit && (
                    <td>
                      <button 
                        className={row.deleted && "button-disabled"}
                        disabled={row.deleted} 
                        onClick={row.editHandler}
                      >
                        Edit
                      </button>
                    </td>)}
                  {
                    row.columns.map((cell) => (
                      <td {...(withDelete && row.deleted ? {className: "table-row-deleted"}: {})} key={cell.id}>{cell.value}</td>
                    ))
                  }
                  {withDelete && (
                    <td>
                      <button onClick={row.deleteHandler}>
                        {row.deleted ? "Undo" : "Delete"}
                      </button>
                    </td>)}
                </tr>
            )) : <tr>
          <td colSpan={6}>{'No data to display...'}</td>
        </tr>}
        </tbody>
      </table>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={() => {}}
        ActionsComponent={TablePaginationActionsMemoised}
      />
    </div>
  );
};

export default Table;
