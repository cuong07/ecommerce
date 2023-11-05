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
import { useDispatch, useSelector } from "react-redux";
import { modalSliceAction } from "../../slice/modalSlice";
import ModalDetail from "../ModalDetail/ModalDetail";
import { useNavigate } from "react-router";

const MostProduct = ({ rows }) => {
  const { imageUrl } = useSelector((state) => state.context);
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              let listImage = JSON.parse(row?.Product?.image);
              let imageSrc = imageUrl + listImage[1];
              return (
                <TableRow
                  key={row.Product?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => onClick(row.Product)}
                  className="hover:bg-zinc-400/10 cursor-pointer"
                >
                  <TableCell component="th" scope="row">
                    {row.Product?.id}
                  </TableCell>
                  <TableCell align="left">
                    <Avatar src={imageSrc} />
                  </TableCell>
                  <TableCell align="left">{row.Product?.name}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="left">
                    {row.Product?.description.length > 40
                      ? `${row.Product.description.substring(0, 40)}...`
                      : row.Product.description}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalDetail
        isShow={isOpen}
        handleClose={closeModal}
        row={data}
        handleGetDetail={handleGetDetail}
      />
    </>
  );
};

export default MostProduct;
