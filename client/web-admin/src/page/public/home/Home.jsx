import React, { useEffect } from "react";
import * as apis from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, PieChart } from "../../../components";
import { Box, Container } from "@mui/material";

function Home() {
  const { token } = useSelector((state) => state.auth.login.currentUser.data);
  const { totalRevenueLineChart, countProductForCategory } = useSelector(
    (state) => state.chart
  );
  console.log(countProductForCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    apis.getLineChart(token, dispatch);
    apis.getPieChartCategory(token, dispatch);
  }, []);

  return (
    <Box component="div" className="p-4 md:flex flex-col justify-between">
      <Box component="div" className="md:w-1/2 w-full">
        <LineChart
          labels={totalRevenueLineChart?.data?.labels}
          data={totalRevenueLineChart?.data?.data}
          label={totalRevenueLineChart?.data.label}
        />
      </Box>
      <Box component="div" className="md:w-1/4">
        <PieChart
          labels={countProductForCategory?.data?.labels}
          data={countProductForCategory?.data?.data}
          label={countProductForCategory?.data?.label}
        />
      </Box>
    </Box>
  );
}

export default Home;
