import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ModalDetail } from "../../../components";
import { modalSliceAction } from "../../../slice/modalSlice";

const RowDropDown = ({ row }) => {
  const [open, setOpen] = useState(false);
  const { isOpen, data } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = (row) => {
    dispatch(modalSliceAction.openModal(row));
  };

  const closeModal = () => {
    dispatch(modalSliceAction.closeModal());
  };
  const handleGetDetail = (id) => {
    return navigate(`/product/${id}`);
  };
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="left">
          {new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "VND",
          }).format(row.total)}
        </TableCell>
        <TableCell align="left">
          {row.User.first_name + " " + row.User.last_name}
        </TableCell>
        <TableCell align="left">{row.User.telephone}</TableCell>
        <TableCell align="left">{row.PaymentDetail.provider}</TableCell>
        <TableCell align="left">{row.User.email}</TableCell>
        <TableCell align="left">
          {moment(row?.createdAt).format("LLL")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order item
              </Typography>
              {row?.OrderItems.length > 0 && (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Id</TableCell>
                      <TableCell align="left">Name Product</TableCell>
                      <TableCell align="left">Price</TableCell>
                      <TableCell align="left">Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row?.OrderItems.map((item) => (
                      <TableRow
                        key={item.id}
                        onClick={() => onClick(item.Product)}
                        className="hover:bg-zinc-400/10 cursor-pointer"
                      >
                        <TableCell component="th" scope="row" align="left">
                          {item.id}
                        </TableCell>
                        <TableCell align="left">{item.Product.name}</TableCell>
                        <TableCell align="left">
                          {new Intl.NumberFormat("it-IT", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.Product.price)}
                        </TableCell>
                        <TableCell align="left">{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {row?.OrderItems.length == 0 && (
                <Box component="div">
                  The booked items do not exist or have been deleted!
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <ModalDetail
        isShow={isOpen}
        handleClose={closeModal}
        row={data}
        handleGetDetail={handleGetDetail}
      />
    </>
  );
};

export default RowDropDown;
