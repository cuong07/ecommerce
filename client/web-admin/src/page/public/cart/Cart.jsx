import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

import route from "../../../constants/route";
import * as apis from "../../../api";
import { NavigateHeader, RowDropDown } from "../../../components";
import { Link } from "react-router-dom";

const routes = [{ name: "Dashboard", to: route.PUBLIC }];
const Cart = () => {
  const dispatch = useDispatch();
  const { page, size } = useSelector((state) => state.cart.filter);
  const { token } = useSelector((state) => state.auth.login.currentUser.data);
  const { carts } = useSelector((state) => state.cart);
  useEffect(() => {
    apis.getAllCart(token, dispatch, page, size);
  }, []);

  return (
    <Box component="div" className="p-8 flex-1 overflow-hidden">
      <NavigateHeader routes={routes} entry="Carts" />
      <Box component="div" className="flex justify-between">
        <Typography
          sx={{
            fontSize: 32,
            lineHeight: "40px",
            fontWeight: 400,
          }}
        >
          Carts
        </Typography>
        <Box component="div">
          <Box component="div" className="flex gap-4">
            <Box component={Link} to={route.CATEGORY_CREATE}>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.4 },
                }}
                whileTap={{ scale: 0.9 }}
                className="py-1 px-8 border border-[#3b58d6] rounded-md text-[#3b58d6] flex items-center gap-1"
              >
                <AddIcon />
                <span>Create</span>
              </motion.button>
            </Box>
            <Box component={Link}>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.4 },
                }}
                whileTap={{ scale: 0.9 }}
                className="py-1 px-8  rounded-md text-[#3b58d6] flex items-center gap-1"
              >
                <FilterListIcon />
                <span>Filter</span>
              </motion.button>
            </Box>
          </Box>
        </Box>
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
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carts?.data?.map((row) => (
                <RowDropDown row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Cart;
