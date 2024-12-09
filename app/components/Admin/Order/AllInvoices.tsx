import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Toolbar } from '@mui/material';
import { useTheme } from 'next-themes';
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import Loader from '../../Loader/Loader';
import { format } from 'timeago.js';
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import { AiOutlineMail } from 'react-icons/ai';
type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data, isSuccess } = useGetAllOrdersQuery({});
  const columns = [
    ...(isDashboard
      ? [] // Nếu là dashboard, không thêm cột ID
      : [{ field: 'id', headerName: 'ID', flex: 0.8 }]),
    {
      field: 'userName',
      headerName: 'User Name',
      flex: isDashboard ? 0.5 : 0.5,
    },
    ...(isDashboard
      ? []
      : [
          { field: 'courseName', headerName: 'Course Name', flex: 1 },
          // { field: 'title', headerName: 'Course Title', flex: 1 },
        ]),
    { field: 'price', headerName: 'Price', flex: 0.5 },
    ...(isDashboard
      ? [{ field: 'created_at', headerName: 'Created At', flex: 0.5 }]
      : [
          {
            field: ' ',
            headerName: 'Email',
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`} className='relative top-3'>
                  <AiOutlineMail
                    className="dark:text-white text-black"
                    size={20}
                  />
                </a>
              );
            },
          },
        ]),
  ];
  
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const temp = [];
    data?.results?.forEach((item: any) => {
      temp.push({
        id: item._id,
        userName: item.userName,
        courseName: item.courseName,
        // title: item.title,
        price: item.coursePrice,
        created_at: format(item.createdAt),
      });
    });
    setRows(temp);
  }, [isSuccess]);
  return (
    <div className={!isDashboard ? 'mt-[120px]' : 'mt-[0px]'}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? '0' : '40px'}>
          <Box
            m={isDashboard ? '0' : '40px 0 0 0'}
            height={isDashboard ? '35vh' : '90vh'}
            overflow={'hidden'}
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                outline: 'none',
              },
              '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-sortIcon': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-row': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderBottom:
                  theme === 'dark'
                    ? '1px solid #ffffff30!important'
                    : '1px solid #cccc!important',
              },
              '& .MuiTablePagination-root': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none !important',
              },
              '& .name-column--cell': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-row--borderBottom': {
                backgroundColor:
                  theme === 'dark'
                    ? '#3e4396 !important'
                    : '#A4A9FC !important',
                borderBottom: 'none',
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: theme == 'dark' ? '#1F2A40' : '#F2F0F0',
              },
              '& .MuiDataGrid-footerContainer': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderTop: 'none',
                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
              },
              '& .MuiCheckbox-root': {
                color:
                  theme === 'dark' ? '#b7ebde!important' : '#000!important',
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: '#fff !important',
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              components={isDashboard ? {} : { Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
