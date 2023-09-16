import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "@mui/material";

const DrawerRight = ({ handleClose, isOpen }) => {
  return (
    <>
      <Drawer anchor="right" open={isOpen} onClose={handleClose}>
        heel
      </Drawer>
    </>
  );
};

DrawerRight.propTypes = {};

export default DrawerRight;
