
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination';
import usePagination from '../hooks/usePagination';

interface TableSkeletonProps<T> {
  data: T[];
}

interface TableProps<T extends Record<string, any>> extends TableSkeletonProps<T> {
  handleSort: (sortProp: keyof T) => void;
  handleDelete: (id: number) => void;
}


const TableCellHeader = styled(TableCell)`
  cursor: pointer;
  transition: all .3s ease-in;
  text-align: center;

  &:hover {
    transform: scale(1.02);
    background-color: #0064fa;
    color: #fff;
  }
`
const MyDeleteIcon = styled(DeleteIcon)`
  transition: all .3s ease-in;
  &:hover {
    color: red;
    transform: scale(1.1);
  }
`

export default function Tablee<T extends Record<string, any>>({ data, handleSort, handleDelete }: TableProps<T>) {
  const titles = data.length > 0 ? Object.keys(data[0]) : [];
  const { 
    paginatedData,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage
  } = usePagination({ array: data });
  

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {titles.map((title) => (
                <TableCellHeader
                  align="right"
                  key={title}
                  onClick={() => handleSort(title as keyof T)}
                >
                  {title}
                </TableCellHeader>
              ))}
              <TableCellHeader align="right">Удалить</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {titles.map((title, colIndex) => (
                    <TableCell align="right" key={colIndex}>
                      {row[title]}
                    </TableCell>
                  ))}
                  <TableCell><MyDeleteIcon onClick={() => handleDelete(row.id)}/></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

// Отображение скелетона в момент загрузки данных
export function TableSkeleton<T extends object>({ data }: TableSkeletonProps<T>) {
  const titles = data.length > 0 ? Object.keys(data[0]) : [];
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {titles.map((title) => (
            <TableCellHeader
              align="right"
              key={title}
            >
              {title}
            </TableCellHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
            {Array.from({ length: 20 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: titles.length }).map((_, colIndex) => (
                    <TableCell align="right" key={colIndex}>
                      <Skeleton 
                        animation="wave"  
                        width={210}
                        height={38}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
      </Table>
    </TableContainer>
  )
}
