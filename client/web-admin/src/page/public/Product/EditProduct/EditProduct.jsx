import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import TvIcon from "@mui/icons-material/Tv";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";
import EditForm from "../../../../components/EditForm/EditForm";

const EditProduct = (props) => {
  let { id } = useParams();

  const { productDetail } = useSelector((state) => state.product);

  console.log(id);
  return (
    <Box component="div" className="p-8 bg-[#f8f9f9]">
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
      <Box component="div" className="flex justify-between mt-5">
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
      <Box>
        <EditForm product={productDetail?.data} />
      </Box>
    </Box>
  );
};

EditProduct.propTypes = {};

export default EditProduct;
