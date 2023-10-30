import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SearchFilter from "./SearchFilter";
import {
  FaSort,
  FaArrowUp,
  FaArrowDown,
  FaTrash,
  FaEdit,
  FaWindowClose,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  updateUser,
  updateUsers,
} from "../../App/features/adminSlice";
import Loader from "../subs/Loader";
import { Link } from "react-router-dom";

const Users = () => {
  const { loading, users } = useSelector((s) => s.admin);
  const [columnFilters, setColumnFilters] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [userEditing, setUserEditing] = useState();
  const [editBox, setEditBox] = useState(false);
  const [editId, setEditId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length < 1) {
      dispatch(getAllUsers());
    }
  }, []);

  const handleDelete = (id) => {
    const updatedUsersList = users.filter((user) => user._id !== id);
    //Update in store
    dispatch(updateUsers(updatedUsersList));
    //Update in db needs reload to see changes
    dispatch(deleteUser({ id }));
  };

  const handleEdit = (id) => {
    setEditBox(true);
    setEditId(id);
    const user = users.find((item) => item._id === id);
    setUserEditing(user);
    setNewRole(user.role);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (userEditing.role === newRole) {
      setEditBox(false);
      return;
    }
    const p = { ...userEditing, role: newRole };

    let updatedUsersList = users.filter((user) => user._id !== editId);
    updatedUsersList.push(p);
    console.log(p);
    dispatch(updateUsers(updatedUsersList));
    dispatch(updateUser(p));
    setEditBox(false);
    setEditId(null);
  };

  const columns = [
    {
      accessorKey: "avatar",
      header: "Profile",
      enableSorting: false,

      cell: (props) => (
        <Link className="flex-center" to={`/user/${props.row.original._id}`}>
          <img
            src={props.getValue().url}
            className="md:w-16 md:h-16 h-14 w-14 rounded-full border-[1px] border-black"
          />
        </Link>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: (props) => <p>{props.getValue()}</p>,
      enableSorting: false,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (props) => (
        <p
          className={`${
            props.getValue() === "admin" ? "font-semibold text-lg" : ""
          }`}
        >
          {props.getValue()}
        </p>
      ),
    },
    {
      accessorKey: "_id",
      header: "Actions",
      enableSorting: false,
      cell: (props) => (
        <div className="space-x-2">
          <button className="text-blue-500 hover:text-blue-700">
            <FaEdit onClick={() => handleEdit(props.getValue())} />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <FaTrash onClick={() => handleDelete(props.getValue())} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    initialState: { pageSize: 5 },
    state: {
      columnFilters,
    },
    // initialState: {
    //   pageSize: 5, // Set the initial number of items per page
    // },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <h1 className="text-center text-4xl font-semibold  text-slate-700 py-12">
        Users
      </h1>

      <SearchFilter
        setColumnFilters={setColumnFilters}
        columnFilters={columnFilters}
        sid={"name"}
      />
      {editBox && (
        <div
          className="fixed-center-cover flex p-4"
          // onClick={() => setEditBox(false)}
        >
          <form
            onSubmit={submitHandler}
            className="bg-cyan-200 text-xl px-12 py-8 rounded-lg relative"
          >
            <span
              className="absolute top-0 right-0 p-4 rounded cursor-pointer"
              onClick={() => setEditBox(false)}
            >
              <FaWindowClose />
            </span>
            <h1 className="font-semibold">
              Choose role for {userEditing.name}
            </h1>

            <select
              name="role"
              id=""
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="block w-full py-2 px-3 bg-white border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <input
              type="submit"
              className=" px-4 py-2 cursor-pointer hover:-translate-y-3 transition-all mt-4 block w-full text-center text-white font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring focus:ring-cyan-200"
            />
          </form>
        </div>
      )}

      {!loading && users.length > 0 ? (
        <>
          <div className="bg-white rounded-lg shadow-lg  mb-5 overflow-x-auto">
            <table className="w-full table-fixed bg-slate-300">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-slate-600 text-white">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="py-3 px-2 sm:py-4 sm:px-3">
                        <p className="flex-center flex-row">
                          {header.column.columnDef.header}
                          {header.column.getCanSort() && (
                            <FaSort
                              className="cursor-pointer"
                              onClick={header.column.getToggleSortingHandler()}
                            />
                          )}
                          {
                            {
                              asc: <FaArrowUp />,
                              desc: <FaArrowDown />,
                            }[header.column.getIsSorted()]
                          }
                        </p>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`${
                      row.id % 2 === 0 ? "bg-white" : ""
                    } text-center`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className=" py-3 px-2 sm:py-4 sm:px-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex-center py-4 bg-slate-600 font-semibold text-white">
              <p className="flex gap-5 flex-row">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="cursor-pointer"
                >
                  {"<"}
                </button>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="cursor-pointer"
                >
                  {">"}
                </button>
              </p>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Users;
