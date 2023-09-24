import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import TvIcon from "@mui/icons-material/Tv";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import EditForm from "../../../../components/EditForm/EditForm";
import * as apis from "../../../../api";

const EditProduct = (props) => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});

  const { token } = useSelector((state) => state.auth.login.currentUser.data);
  const { productDetail, isFetching } = useSelector((state) => state.product);
  const { category } = useSelector((state) => state.category);
  const { discountList } = useSelector((state) => state.discount);

  const handleSubmitEdit = (product) => {
    apis.updateProduct(token, dispatch, product);
  };

  const handleUpdateImage = (data) => {
    apis.updateImageProduct(token, dispatch, data);
  };
  console.log(productDetail);

  useEffect(() => {
    setProduct(productDetail);
  }, [productDetail]);
  return (
    <>
      <Box component="div" className="p-8 bg-[#f8f9f9] flex flex-col gap-4">
        <Box component="div" className="">
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
          <Box
            component={Link}
            sx={{
              fontSize: 12,
            }}
            to="/product"
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
          <Typography
            sx={{
              fontSize: 12,
            }}
            component="span"
          >
            {" "}
            Edit
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
            Edit
          </Typography>
          <Box component="div" className="flex gap-4">
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
                className="py-1 px-8 border border-red-500 text-red-500 rounded-md flex items-center gap-1"
              >
                <DeleteForeverIcon />
                <span>delete</span>
              </motion.button>
            </Box>
          </Box>
        </Box>
        <Box component="div">
          <EditForm
            productId={id}
            product={product.data}
            category={category?.data}
            discount={discountList?.data}
            handleSubmitEdit={handleSubmitEdit}
            handleUpdateImage={handleUpdateImage}
          />
        </Box>
      </Box>
      {isFetching && <Box>loadding</Box>}
    </>
  );
};

EditProduct.propTypes = {};

export default EditProduct;
