import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";

import { NavigateHeader } from "../../../components";
import { Link } from "react-router-dom";
import route from "../../../constants/route";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../../../api";
import RowDropDown from "./RowDropDown";

const routes = [{ name: "Dashboard", to: route.PUBLIC }];

const Order = () => {
  const dispatch = useDispatch();
  const { page, size } = useSelector((state) => state.cart.filter);
  const { token } = useSelector((state) => state.auth.login.currentUser.data);
  const { orders } = useSelector((state) => state.order);
  const { totalPages } = orders;
  useEffect(() => {
    apis.getAllOrder(token, dispatch, page, size);
  }, []);
  console.log(totalPages);
  const handleChangePage = (e, page) => {
    apis.loadMoreOrder(token, dispatch, page, size);
  };
  return (
    <Box component="div" className="p-8 flex-1 bg-[#f8f9f9] overflow-hidden">
      <NavigateHeader routes={routes} entry="Orders" />
      <Box component="div" className="flex justify-between">
        <Typography
          sx={{
            fontSize: 32,
            lineHeight: "40px",
            fontWeight: 400,
          }}
        >
          Orders
        </Typography>
      </Box>
      <Box className="relative mt-5">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>ID</TableCell>
                <TableCell align="left">Total</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Phone number</TableCell>
                <TableCell align="left">Payment</TableCell>
                <TableCell align="left">email</TableCell>
                <TableCell align="left">Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.data?.map((row) => (
                <RowDropDown row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <div className="mt-4">
        <Pagination
          count={totalPages}
          color="primary"
          onChange={(e, page) => handleChangePage(e, page)}
        />
      </div>
    </Box>
  );
};

export default Order;
