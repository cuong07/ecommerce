import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useDispatch, useSelector } from 'react-redux';
import route from '../../../../constants/route';
import { EditForm } from '../../../../components';
import * as apis from '../../../../api';

function CreateProduct() {
  const { token } = useSelector((state) => state.auth.login.currentUser.data);
  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.category);
  const { discountList } = useSelector((state) => state.discount);

  useEffect(() => {
    const fetchData = async () => {
      await apis.getCategory(dispatch);
      await apis.getDiscount(dispatch);
    };
    fetchData();
  }, []);

  const handleSubmit = (product) => {
    // console.log(product);
    apis.createProduct(token, dispatch, product);
  };

  return (
    <>
      <Box component="div" className="p-8 bg-[#f8f9f9] flex flex-col gap-4">
        <Box component="div" className="">
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
            to={route.PRODUCT}
          >
            {' '}
            Products
          </Box>
          <NavigateNextIcon
            sx={{
              width: 18,
              height: 18,
            }}
          />
          <Typography className="text-black m-0 p-0 text-sm" component="span">
            {' '}
            Create
          </Typography>
        </Box>
        <Box component="div" className="flex justify-between">
          <Typography
            sx={{
              fontSize: 32,
              lineHeight: '40px',
              fontWeight: 400,
            }}
          >
            Create product
          </Typography>
        </Box>
        <Box component="div">
          <EditForm
            category={category?.data}
            discount={discountList?.data}
            onSubmit={handleSubmit}
          />
        </Box>
      </Box>
      {/* {isFetching && <Box>loadding</Box>} */}
    </>
  );
}

export default CreateProduct;
