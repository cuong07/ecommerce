import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { EditFormV2, NavigateHeader } from "../../../../components";
import route from "../../../../constants/route";
import * as apis from "../../../../api";
import { useDispatch, useSelector } from "react-redux";

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
  const { token } = useSelector((state) => state.auth.login.currentUser.data);
  console.log(token);
  const { categoryDetail } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleEditCategory = (data) => {
    apis.updateCategory(token, dispatch, { ...data, id });
  };

  useEffect(() => {
    apis.getCategoryById(dispatch, id);
  }, []);

  return (
    <Box component="div" className="p-8 bg-[#f8f9f9] flex flex-col gap-4">
      <NavigateHeader routes={routes} entry="Edit" />
      <Box component="div" className="flex justify-between">
        <Typography
          sx={{
            fontSize: 32,
            lineHeight: "40px",
            fontWeight: 400,
          }}
        >
          Edit category
        </Typography>
      </Box>
      <Box component="div" className="w-full">
        <EditFormV2
          id={id}
          data={categoryDetail?.data}
          onSubmit={handleEditCategory}
        />
      </Box>
    </Box>
  );
};

export default EditCategory;
