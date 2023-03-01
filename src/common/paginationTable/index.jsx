import React, { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import TabBody from "./TabBody";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableHeader = ({ tableHeader }) => {
  return (
    <TableHead>
      <TableRow>
        {tableHeader.map((data, index) => {
          return <StyledTableCell key={index}>{data.label}</StyledTableCell>;
        })}
      </TableRow>
    </TableHead>
  );
};

const PaginationTable = (props) => {
  const { tableProps } = props;
  const { columns, data, handleAction } = tableProps;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHeader tableHeader={columns} />
          <TabBody
            tableData={data}
            columns={columns}
            handleAction={handleAction}
          />
          <TableBody>
            {/* {usersList.map((user) => ( */}
            <StyledTableRow
            // key={user.id}
            >
              <StyledTableCell component="th" scope="row">
                {/* {user.name} */}
              </StyledTableCell>
              <StyledTableCell align="center">
                {/* {user.email} */}
              </StyledTableCell>
              <StyledTableCell align="center">
                {/* {user.phone} */}
              </StyledTableCell>
              <StyledTableCell align="center">
                {/* {user.website} */}
              </StyledTableCell>
              {/* <StyledTableCell align="center">
                <Button
                  sx={{ mr: 2 }}
                  variant="contained"
                  color="success"
                  //   onClick={() => this.handleEdit(user.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "red" }}
                  //   onClick={() => this.deleteUser(user.id)}
                >
                  Delete
                </Button>
              </StyledTableCell> */}
            </StyledTableRow>
            {/* ) */}
            {/* ) */}
            {/* } */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PaginationTable;
