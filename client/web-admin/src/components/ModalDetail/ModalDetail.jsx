import React from "react";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SlideProduct from "../SlideProduct/SlideProduct";

const ModalDetail = ({ isShow, handleClose, row}) => {
  console.log(row);
  return (
    <>
      {isShow && (
        <div className="right-0 top-0 absolute w-[30vw] h-[100vh] border flex flex-col gap-6 bg-white border-blue-300 animate-slide-left pl-8 pr-8 pt-12 pb-12 ">
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
            <motion.button
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.4 },
              }}
              whileTap={{ scale: 0.9 }}
              className="pl-8 pr-8 pt-1 pb-1 border border-blue-400 rounded-md text-blue-400 flex items-center gap-1"
            >
              <EditNoteRoundedIcon />
              <span>edit</span>
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.4 },
              }}
              whileTap={{ scale: 0.9 }}
              className="pl-8 pr-8 pt-1 pb-1 border border-red-500 text-red-500 rounded-md flex items-center gap-1"
            >
              <DeleteForeverIcon />
              <span>delete</span>
            </motion.button>
          </div>
          
        </div>
      )}
    </>
  );
};

ModalDetail.propTypes = {};

export default ModalDetail;
