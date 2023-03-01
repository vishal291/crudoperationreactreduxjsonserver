import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

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

const TabBody = ({ tableData, columns, handleAction }) => {
  return (
    <TableBody>
      {tableData &&
        tableData.map((data, index) => {
          return (
            <StyledTableRow key={index}>
              {columns.map((e, i) => {
                if (typeof e.cellData === "function") {
                  return (
                    <StyledTableCell
                      key={`row-${index}-col-${i}`}
                      style={{ width: e.width }}
                    >
                      {e.cellData(data, handleAction)}
                    </StyledTableCell>
                  );
                } else {
                  return (
                    <StyledTableCell
                      key={`row-${index}-col-${i}`}
                      style={{ width: e.width }}
                    >
                      {data[e.datakey]}
                    </StyledTableCell>
                  );
                }
              })}
            </StyledTableRow>
          );
        })}
    </TableBody>
  );
};
export default TabBody;
