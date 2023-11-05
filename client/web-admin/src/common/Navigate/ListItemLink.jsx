import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";

function ListItemLink({ icon, primary, to }) {
  const location = useLocation();

  const isActive = location?.pathname === to;
  const activeClass = clsx(
    "text-[#b1b6be] rounded-md",
    isActive && "bg-[#ebecec] text-[#565b60]"
  );

  return (
    <li>
      <ListItem component={Link} to={to} className={activeClass}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.node,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default ListItemLink;
