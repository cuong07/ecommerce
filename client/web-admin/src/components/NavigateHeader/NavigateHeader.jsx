import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const NavigateHeader = ({ entry, routes }) => {
  return (
    <div role="presentation">
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        {routes.map((item) => (
          <Link key={item.to} underline="hover" color="inherit" href={item.to}>
            {item.name}
          </Link>
        ))}
        <Typography color="text.primary">{entry}</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default NavigateHeader;
