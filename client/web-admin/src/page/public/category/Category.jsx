import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Table, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";

import { dataCategoryField } from "../../../constants/dataField";
import * as apis from "../../../api";
import { ModalDetail, NavigateHeader, TableProduct } from "../../../components";
import route from "../../../constants/route";

const routes = [{ name: "Dashboard", to: route.PUBLIC }];
function Category(props) {
  const { category } = useSelector((state) => state.category);
  const { token } = useSelector((state) => state.auth.login.currentUser.data);
  const dispatch = useDispatch();
  const [isShowModalDetail, setIsShowModelDetail] = useState(false);
  const [rowData, setRowData] = useState(null);
  const navigate = useNavigate();

  const openModal = (row) => {
    setIsShowModelDetail(true);
    setRowData(row);
  };

  const closeModal = () => {
    setIsShowModelDetail(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await apis.getCategory(dispatch);
    };
    fetchData();
  }, []);

  const handleGetCategoryDetail = (id) => {
    navigate(`/category/${id}`);
  };

  return (
    <Box component="div" className="p-8 flex-1 bg-[#f8f9f9] overflow-hidden">
      <NavigateHeader routes={routes} entry="Categories" />
      <Box className="flex justify-between">
        <Typography
          sx={{
            fontSize: 32,
            lineHeight: "40px",
            fontWeight: 400,
          }}
        >
          Category
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
        <TableProduct
          list={category?.data}
          dataField={dataCategoryField}
          closeModal={closeModal}
          openModal={openModal}
          isCategory
        />
      </Box>
      <ModalDetail
        isShow={isShowModalDetail}
        handleClose={closeModal}
        row={rowData}
        handleGetDetail={handleGetCategoryDetail}
        isCategory
      />
    </Box>
  );
}

Category.propTypes = {};

export default Category;
