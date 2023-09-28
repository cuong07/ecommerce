import React from 'react';
import { Drawer } from '@mui/material';

function DrawerRight({ handleClose, isOpen }) {
  return (
    <Drawer anchor="right" open={isOpen} onClose={handleClose}>
      heel
    </Drawer>
  );
}

export default DrawerRight;
