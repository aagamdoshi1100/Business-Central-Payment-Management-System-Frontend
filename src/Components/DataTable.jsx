import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { MenuItem, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";

const DataTable = ({ columns, rows, title, additionalData }) => {
  const location = useLocation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {}, [columns, rows, title]);
  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ cursor: "pointer" }}>
            {rows.length > 0 ? (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id ?? rowIndex}
                    onClick={
                      location.pathname === "/roles-and-permissions"
                        ? () =>
                            additionalData?.updateUserPermission(
                              row?._id,
                              row?.accessEnabled
                            )
                        : () =>
                            additionalData?.setIsFinalFormEnabled({
                              flag: true,
                              data: row,
                            })
                    }
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "assignedTo") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <TextField
                              select
                              sx={{ minWidth: 140 }}
                              size="small"
                              label="Select Agent"
                              defaultValue={value?._id ?? ""}
                              onChange={(e) =>
                                additionalData.handleAgentChange(
                                  e,
                                  row["caseNumber"]
                                )
                              }
                            >
                              {additionalData?.agents?.length > 0 ? (
                                additionalData?.agents?.map((ag) => (
                                  <MenuItem key={ag._id} value={ag._id}>
                                    {ag.name}
                                  </MenuItem>
                                ))
                              ) : (
                                <MenuItem disabled>
                                  No agents available
                                </MenuItem>
                              )}
                            </TextField>
                          </TableCell>
                        );
                      }

                      if (
                        column.id === "dueDate" ||
                        column.id === "createdAt"
                      ) {
                        return (
                          <TableCell key={column.id}>
                            {value?.split("T")?.[0]}
                          </TableCell>
                        );
                      }

                      if (column.id === "accessEnabled") {
                        return (
                          <TableCell key={column.id}>
                            {value ? (
                              <p style={{ color: "red" }}>Disable Account</p>
                            ) : (
                              <p style={{ color: "green" }}>Enable Account</p>
                            )}
                          </TableCell>
                        );
                      }

                      if (column.id === "status") {
                        return (
                          <TableCell
                            key={column.id}
                            sx={{
                              color:
                                value === "In progress" ? "green" : "#1976d2",
                            }}
                          >
                            {value?.split("T")?.[0]}
                          </TableCell>
                        );
                      }

                      if (column.id === "serviceProvider") {
                        return (
                          <TableCell key={column.id}>{value?.name}</TableCell>
                        );
                      }

                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={columns.length}
                  sx={{ py: 3, color: "gray" }}
                >
                  No Case Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default DataTable;
