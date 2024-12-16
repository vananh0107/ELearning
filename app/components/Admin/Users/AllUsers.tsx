'use client';
import React, { FC, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { Box, Button, Modal } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'timeago.js';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from '@/redux/features/user/userApi';
import Loader from '../../Loader/Loader';
import { styles } from '@/app/styles/style';
import toast from 'react-hot-toast';
import { FiEdit2 } from 'react-icons/fi';
type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [id, setId] = useState('');
  const [role, setRole] = useState('user');
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userId, setUserId] = useState('');
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});
  useEffect(() => {
    if (updateError) {
      if ('data' in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (isSuccess) {
      refetch();
      toast.success('User role updated successfully');
    }
    if (deleteSuccess) {
      refetch();
      toast.success('User deleted successfully');
      setOpen(false);
    }
    if (deleteError) {
      if ('data' in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, isSuccess, deleteError, deleteError]);
  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Name', flex: 0.4 },
    { field: 'email', headerName: 'Email', flex: 0.6 },
    { field: 'role', headerName: 'Role', flex: 0.3 },
    { field: 'courses', headerName: 'Purchased', flex: 0.22 },
    { field: 'created_at', headerName: 'Joined At', flex: 0.4 },
    {
      field: '',
      headerName: 'Edit',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setEdit(!edit);
                setUserId(params.row.id);
              }}
            >
              <FiEdit2 className="dark:text-white text-black" size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: ' ',
      headerName: 'Delete',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: '  ',
      headerName: 'Email',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a
              href={`mailto:${params.row.email}`}
              className="inline-block mt-4 ml-4"
            >
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === 'admin');
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }
  const handleSubmit = async () => {
    await updateUserRole({ id:userId, role });
    setEdit(false);
    refetch();
  };
  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
    setOpen(false);
    refetch();
  };
  return (
    <div className="mt-[80px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end"></div>
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                outline: 'none',
              },
              '& .css-pqjvzy-MuiSgvIcon-root-MuiSelect-icon': {
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
                borderBottom: 'none',
              },
              '& .name-column--cell': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-row--borderBottom': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderBottom: 'none',
                backgroundColor:
                  theme === 'dark'
                    ? '#3e4396 !important'
                    : '#A4A9FC !important',
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: theme === 'dark' ? '#1F2A40' : '#F2F0F0',
              },
              '& .MuiDataGrid-footerContainer': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderTop: 'none',
                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
              },
              '& .MuiCheckbox-root': {
                color:
                  theme === 'dark' ? '#b7ebde !important' : '#000!important',
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-5 bg-[#0c0026] rounded w-[460px]">
                <h1 className={`${styles.title}  text-white`}>
                  Are you sure you want to delete this user?
                </h1>
                <div className="flex w-full items-center justify-around mb-6  mt-6">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#d62929]`}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
          {edit && (
            <Modal
              open={edit}
              onClose={() => setEdit(!edit)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-6 bg-[#0c0026] rounded-lg shadow-lg w-[400px]">
                <h1 className="text-2xl font-bold text-white text-center mb-6">
                  Update Role
                </h1>

                {/* Dropdown Role Selection */}
                <div className="relative mb-6">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Select Role
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2 bg-gray-700 text-white rounded focus:ring focus:ring-blue-500 outline-none"
                  >
                    <option value="user" className="text-black">
                      User
                    </option>
                    <option value="admin" className="text-black">
                      Admin
                    </option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <button
                    className="w-[45%] py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-[45%] py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
