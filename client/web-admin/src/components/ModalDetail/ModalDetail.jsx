import React from "react";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SlideProduct from "../SlideProduct/SlideProduct";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Grid } from "ag-grid-community";
import moment from "moment";

const ModalDetail = ({ isShow, handleClose, row, handleGetProductDetail }) => {
  return (
    <>
      {isShow && (
        <div className="right-0 top-0 fixed w-[30vw] h-[100vh] border z-50 flex flex-col gap-6 bg-white shadow-lg animate-slide-left px-8 py-12 ">
          <div className="flex gap-4 items-center">
            <motion.button
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.4 },
              }}
              whileTap={{ scale: 0.9 }}
              className="p-2 border border-black rounded-full hover:bg-slate-50 flex items-center justify-center"
              onClick={handleClose}
            >
              <ArrowForwardIosIcon />
            </motion.button>
            <span className="text-2xl font-normal">Show</span>
          </div>
          <div className="flex gap-4">
            <Button
              component={Link}
              to={`/product/${row.id}`}
              onClick={() => handleGetProductDetail(row?.id)}
            >
              <motion.button
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.4 },
                }}
                whileTap={{ scale: 0.9 }}
                className="py-1 px-8 border border-blue-400 rounded-md text-blue-400 flex items-center gap-1"
              >
                <EditNoteRoundedIcon />
                <span>edit</span>
              </motion.button>
            </Button>
            <Button component={Link} to={`/product/${row.id}`}>
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
            </Button>
          </div>
          {row?.image && (
            <SlideProduct
              listImage={row?.image}
              id={row?.id}
              name={row?.name}
              category={row?.ProductCategory?.name}
            />
          )}
          <Box className="flex flex-col gap-5">
            <span>
              <span className="text-[#898A9A] text-xs font-light leading-4">
                Description
              </span>
              <Typography className="text-sm font-normal text-[#212539]">
                {row?.description}
              </Typography>
            </span>
            <span>
              <span className="text-[#898A9A] text-xs font-light leading-4">
                Price
              </span>
              <Typography className="text-sm font-normal text-[#212539]">
                {row?.price}
              </Typography>
            </span>
            <span>
              <span className="text-[#898A9A] text-xs font-light leading-4">
                Inventory
              </span>
              <Typography className="text-sm font-normal text-[#212539]">
                {row?.ProductInventory?.quantity
                  ? row?.ProductInventory?.quantity
                  : "Not update"}
              </Typography>
            </span>
            <span>
              <span className="text-[#898A9A] text-xs font-light leading-4">
                Create
              </span>
              <Typography className="text-sm font-normal text-[#212539]">
                {moment(row?.createdAt).format("LLL")}
              </Typography>
            </span>
            <span>
              <span className="text-[#898A9A] text-xs font-light leading-4">
                Update
              </span>
              <Typography className="text-sm font-normal text-[#212539]">
                {moment(row?.updatedAt).format("LLL")}
              </Typography>
            </span>
            <span>
              <span className="text-[#898A9A] text-xs font-light leading-4">
                Discount
              </span>
              <Typography className="text-sm font-normal text-[#212539]">
                {row?.Discount?.name ? row?.Discount?.name : "Not update"}
              </Typography>
            </span>
          </Box>
        </div>
      )}
    </>
  );
};

ModalDetail.propTypes = {};

export default ModalDetail;
