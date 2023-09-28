import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import route from "../../../../constants/route";
import { motion } from "framer-motion";
import { EditForm } from "../../../../components";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import * as apis from "../../../../api";
import { useDispatch, useSelector } from "react-redux";

const CreateProduct = (props) => {
  const { token } = useSelector((state) => state.auth.login.currentUser.data);
  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.category);
  const { discountList } = useSelector((state) => state.discount);

  useEffect(() => {
    const fetchData = async () => {
      await apis.getCategory(dispatch);
      await apis.getDiscount(dispatch);
    };
    fetchData();
  }, []);

  const handleSubmit = (product) => {
    // console.log(product);
    apis.createProduct(token, dispatch, product);
  };

  return (
    <>
      <Box component="div" className="p-8 bg-[#f8f9f9] flex flex-col gap-4">
        <Box component="div" className="">
          <Box
            component={Link}
            className="text-[#898A9A] m-0 p-0 text-sm"
            to={route.PUBLIC}
          >
            Dashboard
          </Box>
          <NavigateNextIcon
            sx={{
              width: 18,
              height: 18,
            }}
          />
          <Box
            component={Link}
            className="text-[#898A9A] m-0 p-0 text-sm"
            to={route.PRODUCT}
          >
            {" "}
            Products
          </Box>
          <NavigateNextIcon
            sx={{
              width: 18,
              height: 18,
            }}
          />
          <Typography className="text-black m-0 p-0 text-sm" component="span">
            {" "}
            Create
          </Typography>
        </Box>
        <Box component="div" className="flex justify-between">
          <Typography
            sx={{
              fontSize: 32,
              lineHeight: "40px",
              fontWeight: 400,
            }}
          >
            Create product
          </Typography>
          {/* <Box component="div" className="flex gap-4">
            <Box component={Link}>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.4 },
                }}
                whileTap={{ scale: 0.9 }}
                className="py-1 px-8 border border-blue-400 rounded-md text-blue-400 flex items-center gap-1"
              >
                <TvIcon />
                <span>Show</span>
              </motion.button>
            </Box>
            <Box component={Link}>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.4 },
                }}
                whileTap={{ scale: 0.9 }}
                className="py-1 px-8 border border-red-500 text-red-500 rounded-md flex items-center gap-1  "
              >
                <DeleteForeverIcon />
                <span>delete</span>
              </motion.button>
            </Box>
          </Box> */}
        </Box>
        <Box component="div">
          <EditForm
            category={category?.data}
            discount={discountList?.data}
            onSubmit={handleSubmit}
          />
        </Box>
      </Box>
      {/* {isFetching && <Box>loadding</Box>} */}
    </>
  );
};

CreateProduct.propTypes = {};

export default CreateProduct;
