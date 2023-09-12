import React from "react";
import PropTypes from "prop-types";
import { Link, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const ListItemLink = ({ icon, primary, to }) => {
  return (
    <li>
      <ListItem button component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

ListItemLink.propTypes = {};

export default ListItemLink;
