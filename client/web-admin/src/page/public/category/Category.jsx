import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Table, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import { dataCategoryField } from '../../../constants/dataField';
import * as apis from '../../../api';
import { ModalDetail, TableProduct } from '../../../components';

function Category(props) {
  const { category } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [isShowModalDetail, setIsShowModelDetail] = useState(false);
  const [rowData, setRowData] = useState(null);
  const navigate = useNavigate();

  const openModal = (row) => {
    setIsShowModelDetail(true);
    setRowData(row);
  };

  const closeModal = () => {
    setIsShowModelDetail(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await apis.getCategory(dispatch);
    };
    fetchData();
  }, []);

  const handleGetCategoryDetail = (id) => {
    navigate(`/category/${id}`);
  };

  return (
    <Box component="div" className="p-8 flex-1 bg-[#f8f9f9] overflow-hidden">
      <Box component="div">
        <Box
          component={Link}
          sx={{
            fontSize: 12,
            color: 'black',
            padding: 0,
            margin: 0,
          }}
          to="/"
        >
          Dashboard
        </Box>
        <NavigateNextIcon
          sx={{
            width: 18,
            height: 18,
          }}
        />
        <Typography
          component="a"
          sx={{
            fontSize: 12,
          }}
        >
          {' '}
          Categorys
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: 32,
            lineHeight: '40px',
            fontWeight: 400,
          }}
        >
          Category
        </Typography>
      </Box>
      <TableProduct
        list={category?.data}
        dataField={dataCategoryField}
        closeModal={closeModal}
        openModal={openModal}
        isCategory
      />
      <ModalDetail
        isShow={isShowModalDetail}
        handleClose={closeModal}
        row={rowData}
        handleGetDetail={handleGetCategoryDetail}
        isCategory
      />
    </Box>
  );
}

Category.propTypes = {};

export default Category;