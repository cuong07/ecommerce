import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import {
  BiggestBuyer,
  LineChart,
  MostProduct,
  PieChart,
} from "../../../components";
import * as apis from "../../../api";
import { useNavigate, useRoutes } from "react-router";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth.login.currentUser.data);
  const { error } = useSelector((state) => state.chart);
  const { page, size } = useSelector(
    (state) => state.chart.filter.soldMostProduct
  );
  const pagination = useSelector((state) => state.chart.filter.biggestBuyer);

  if (error?.response?.statusText === "Unauthorized") {
    return navigate("/login");
  }
  const {
    totalRevenueLineChart,
    countProductForCategory,
    listSoldMostProduct,
    listBiggestBuyer,
  } = useSelector((state) => state.chart);
  useEffect(() => {
    apis.getLineChart(token, dispatch);
    apis.getPieChartCategory(token, dispatch);
    apis.getSoldMostProduct(token, dispatch, page, size);
    apis.getBiggestBuyer(token, dispatch, pagination.page, pagination.size);
  }, []);

  const handleChangePage = (e, page) => {
    apis.loadMoreProduct(token, dispatch, page, size);
  };

  return (
    <Box component="div" className="p-4 md:flex flex-col justify-between gap-5">
      <Box component="div" className="flex flex-col md:flex-row gap-5">
        <Box
          component="div"
          className="flex-1 shadow-chart rounded-md p-4 bg-white"
        >
          <LineChart
            labels={totalRevenueLineChart?.data?.labels}
            data={totalRevenueLineChart?.data?.data}
            label={totalRevenueLineChart?.data.label}
          />
        </Box>
        <Box
          component="div"
          className="flex-1 max-h-[50vh]  overflow-auto  shadow-chart bg-white rounded-md "
        >
          <Typography className="text-center py-2">
            List Sold Most Product
          </Typography>
          <MostProduct rows={listSoldMostProduct?.data} />
        </Box>
      </Box>
      <Box component="div" className="flex gap-4">
        <Box
          component="div"
          className="md:w-1/4 shadow-chart  p-4 rounded-md bg-white"
        >
          <PieChart
            labels={countProductForCategory?.data?.labels}
            data={countProductForCategory?.data?.data}
            label={countProductForCategory?.data?.label}
          />
        </Box>
        <Box
          component="div"
          className="flex-1 max-h-[50vh] flex flex-col gap-4 bg-white  shadow-chart"
        >
          <Typography className="text-center py-2">
            List Biggest Buyer
          </Typography>
          <BiggestBuyer rows={listBiggestBuyer?.data} />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
