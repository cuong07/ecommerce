import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { NavigateHeader } from "../../../../components";
import route from "../../../../constants/route";

const routes = [
  {
    name: "Dashboard",
    to: route.PUBLIC,
  },
  {
    name: "Category",
    to: route.CATEGORY,
  },
];

const EditCategory = ({ row }) => {
  const { id } = useParams();
  return (
    <Box component="div" className="p-8 bg-[#f8f9f9] flex flex-col gap-4">
      <NavigateHeader routes={routes} entry="Edit" />
    </Box>
  );
};

export default EditCategory;
