import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import TvIcon from "@mui/icons-material/Tv";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import EditForm from "../../../../components/EditForm/EditForm";
import * as apis from "../../../../api";
import { NavigateHeader } from "../../../../components";
import route from "../../../../constants/route";

const routes = [
  { name: "Dashboard", to: route.PUBLIC },
  { name: "Products", to: route.PRODUCT },
];

function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  const { token } = useSelector((state) => state.auth.login.currentUser.data);
  const { productDetail, isFetching } = useSelector((state) => state.product);
  const { category } = useSelector((state) => state.category);
  const { discountList } = useSelector((state) => state.discount);
  useEffect(() => {
    const fetchData = async () => {
      await apis.getProductById(token, dispatch, id);
      await apis.getCategory(dispatch);
      await apis.getDiscount(dispatch);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setProduct(productDetail);
  }, [productDetail]);

  const handleSubmitEdit = (_product) => {
    apis.updateProduct(token, dispatch, _product);
  };

  const handleUpdateImage = (data) => {
    apis.updateImageProduct(token, dispatch, data);
  };

  return (
    <>
      <Box component="div" className="p-8 bg-[#f8f9f9] flex flex-col gap-4">
        <NavigateHeader routes={routes} entry="Edit" />
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
                className="py-1 px-8 border border-red-500 text-red-500 rounded-md flex items-center gap-1  "
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
            product={product}
            category={category?.data}
            discount={discountList?.data}
            onSubmit={handleSubmitEdit}
            handleUpdateImage={handleUpdateImage}
          />
        </Box>
      </Box>
      {isFetching && <Box>loadding</Box>}
    </>
  );
}

export default EditProduct;
