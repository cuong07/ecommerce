import React, { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  Button,
  Pagination,
  PaginationItem,
  TablePagination,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { ModalDetail, TableProduct } from "../../../components";
import * as apis from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { dataProductField } from "../../../constants/dataField";
import DrawerRight from "../../../components/DrawerRight/DrawerRight";
import { Link } from "react-router-dom";

const Product = (props) => {
  const dispatch = useDispatch();

  const [rowData, setRowData] = useState(null);
  const [isShowModalDetail, setIsShowModelDetail] = useState(false);
  const openModal = (row) => {
    setIsShowModelDetail(true);
    setRowData(row);
  };

  const closeModal = () => {
    setIsShowModelDetail(false);
  };

  const { token } = useSelector((state) => state.auth.login.currentUser.data);
  const { page, size } = useSelector((state) => state.product.filter);
  const { list, pageNumber } = useSelector((state) => state.product);
  const { totalCount, totalPages, currentPage } = list;

  useEffect(() => {
    apis.getListProducts(token, dispatch, page, size);
    apis.getCategory(dispatch);
  }, [token, page]);

  const handleChangePage = (e, page) => {
    apis.loadMoreProduct(token, dispatch, page, size);
  };

  const handleGetProductDetail = (id) => {
    apis.getProductById(token, dispatch, id);
  };

  return (
    <div className="p-8 flex-1 bg-[#f8f9f9] overflow-hidden">
      <div>
        <div>
          <Box
            component={Link}
            sx={{
              fontSize: 12,
              color: "black",
              padding: 0,
              margin: 0,
            }}
            to="/"
          >
            Dashboard
          </Box>
          <NavigateNextIcon
            sx={{
              width: 18,
              height: 18,
            }}
          />
          <Typography
            component="a"
            sx={{
              fontSize: 12,
            }}
          >
            {" "}
            Products
          </Typography>
        </div>
        <Typography
          sx={{
            fontSize: 32,
            lineHeight: "40px",
            fontWeight: 400,
          }}
        >
          Products
        </Typography>
        <div className="relative mt-5">
          <TableProduct
            dataField={dataProductField}
            list={list}
            openModal={openModal}
            closeModal={closeModal}
          />
        </div>
        <div>
          <Pagination
            count={totalPages}
            color="primary"
            onChange={(e, page) => handleChangePage(e, page)}
          />
        </div>
      </div>
      <ModalDetail
        isShow={isShowModalDetail}
        handleClose={closeModal}
        row={rowData}
        handleGetProductDetail={handleGetProductDetail}
      />
    </div>
  );
};

Product.propTypes = {};

export default Product;
