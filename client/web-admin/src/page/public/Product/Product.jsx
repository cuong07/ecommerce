import React, { useEffect } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Pagination,
  PaginationItem,
  TablePagination,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { TableProduct } from "../../../components";
import * as apis from "../../../api/product";
import { useDispatch, useSelector } from "react-redux";
import { dataProductField } from "../../../constants/dataProductField";

const Product = (props) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.login.currentUser.data);
  const { page, size } = useSelector((state) => state.product.filter);
  const { list, pageNumber } = useSelector((state) => state.product);
  const { totalCount, totalPages, currentPage } = list;

  useEffect(() => {
    apis.getListProducts(token, dispatch, page, size);
  }, [token, page]);

  const handleChangePage = (e, page) => {
    apis.loadMoreProduct(token, dispatch, page, size);
  };

  return (
    <div className="p-8">
      <div>
        <Typography
          component="span"
          sx={{
            fontSize: 12,
          }}
        >
          Dashboard
        </Typography>
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
      <div>
        <Typography
          sx={{
            fontSize: 32,
            lineHeight: "40px",
            fontWeight: 400,
          }}
        >
          Products
        </Typography>
      </div>
      <div>
        <TableProduct dataField={dataProductField} list={list} />
      </div>
      <div>
        <Pagination
          count={totalPages}
          color="primary"
          onChange={(e, page) => handleChangePage(e, page)}
        />
      </div>
    </div>
  );
};

Product.propTypes = {};

export default Product;
