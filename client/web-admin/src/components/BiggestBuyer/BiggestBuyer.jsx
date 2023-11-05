import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const BiggestBuyer = ({ rows }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Image</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              let imageSrc = row?.User?.image;
              return (
                <TableRow
                  key={row.Product?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="hover:bg-zinc-400/10 cursor-pointer"
                >
                  <TableCell align="center">
                    <Avatar src={imageSrc} />
                  </TableCell>
                  <TableCell align="center">
                    {row.User?.first_name + " " + row.User?.last_name}
                  </TableCell>
                  <TableCell align="center">{row.User?.email}</TableCell>
                  <TableCell align="center">
                    {new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "VND",
                    }).format(row.total)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BiggestBuyer;
