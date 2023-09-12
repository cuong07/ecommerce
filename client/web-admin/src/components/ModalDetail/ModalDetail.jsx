import React from "react";
import PropTypes from "prop-types";
import "animate.css";
import { motion } from "framer-motion";

const ModalDetail = ({ isShow, handleClose }) => {
  return (
    <>
      {isShow && (
        <motion.div
          animate={{
            x: ,
            y: 0,
            scale: 1,
            rotate: 0,
          }}
        >
          <div className="w-[25vw] h-[100vh] bg-slate-500 animate__fadeInRight"></div>
        </motion.div>
      )}
    </>
  );
};

ModalDetail.propTypes = {};

export default ModalDetail;
