import { Box, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React from "react";
import * as apis from "../../../../api";

import route from "../../../../constants/route";
import { Link } from "react-router-dom";
import { EditFormV2 } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.login.currentUser.data);

  const handleCreateCategory = (data) => {
    apis.createCategory(token, dispatch, data);
  };

  return (
    <div className="p-8 bg-[#f8f9f9] flex flex-col w-full gap-4">
      <Box component="div" className=" w-full">
        <Box
          component={Link}
          className="text-[#898A9A] m-0 p-0 text-sm"
          to={route.PUBLIC}
        >
          Dashboard
        </Box>
        <NavigateNextIcon
          sx={{
            width: 18,
            height: 18,
          }}
        />
        <Box
          component={Link}
          className="text-[#898A9A] m-0 p-0 text-sm"
          to={route.CATEGORY}
        >
          {" "}
          Categories
        </Box>
        <NavigateNextIcon
          sx={{
            width: 18,
            height: 18,
          }}
        />
        <Typography className="text-black m-0 p-0 text-sm" component="span">
          {" "}
          Create
        </Typography>
      </Box>
      <Box component="div" className="flex justify-between">
        <Typography
          sx={{
            fontSize: 32,
            lineHeight: "40px",
            fontWeight: 400,
          }}
        >
          Create category
        </Typography>
      </Box>
      <Box component="div" className="w-full">
        <EditFormV2 onSubmit={handleCreateCategory} />
      </Box>
    </div>
  );
};

export default CreateCategory;
