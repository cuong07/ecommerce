import React, { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Pagination, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

import { ModalDetail, TableProduct } from "../../../components";
import * as apis from "../../../api";
import { dataProductField } from "../../../constants/dataField";
import route from "../../../constants/route";

const Product = () => {
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
  const { list } = useSelector((state) => state.product);
  const { totalCount, totalPages } = list;

  const handleGetProductDetail = (id) => {
    apis.getProductById(token, dispatch, id);
  };

  useEffect(() => {
    apis.getListProducts(token, dispatch, page, size);
    apis.getCategory(dispatch);
    apis.getDiscount(dispatch);
  }, [token, page, size]);

  const handleChangePage = (e, page) => {
    apis.loadMoreProduct(token, dispatch, page, size);
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
        <Box component="div" className="flex justify-between">
          <Typography
            sx={{
              fontSize: 32,
              lineHeight: "40px",
              fontWeight: 400,
            }}
          >
            Products
          </Typography>
          <Box component="div">
            <Box component="div" className="flex gap-4">
              <Box component={Link} to={route.PRODUCT_CREATE}>
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
        <div className="relative mt-5">
          {list && (
            <TableProduct
              dataField={dataProductField}
              list={list?.data}
              openModal={openModal}
              closeModal={closeModal}
            />
          )}
        </div>
        <div className="mt-4">
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

export default Product;
