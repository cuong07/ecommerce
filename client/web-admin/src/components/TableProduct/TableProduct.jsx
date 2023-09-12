import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import StyledTableCell from "../StyledTableCell/StyledTableCell";
import { useSelector } from "react-redux";
import moment from "moment";
import ModalDetail from "../ModalDetail/ModalDetail";

const TableProduct = ({ dataField, list }) => {
  const [data, setData] = useState(list?.data);
  const [sortBy, setSortBy] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [isShowModalDetail, setIsShowModelDetail] = useState(false);

  const { imageUrl } = useSelector((state) => state.context);

  const handleSort = (field) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      // Chuyển đổi trường "price" thành số trước khi sắp xếp
      const fieldValueA = field === "price" ? parseFloat(a[field]) : a[field];
      const fieldValueB = field === "price" ? parseFloat(b[field]) : b[field];

      // Kiểm tra nếu fieldValueA hoặc fieldValueB là null hoặc undefined
      if (fieldValueA == null || fieldValueB == null) {
        return 0;
      }

      // Sử dụng toUpperCase() để sắp xếp không phân biệt chữ hoa chữ thường
      const fieldValueAUppercase = fieldValueA.toString().toUpperCase();
      const fieldValueBUppercase = fieldValueB.toString().toUpperCase();

      if (fieldValueAUppercase < fieldValueBUppercase) return -1;
      if (fieldValueAUppercase > fieldValueBUppercase) return 1;
      return 0;
    });

    if (sortBy === field) {
      sortedData.reverse();
      setSortBy(null);
    } else {
      setSortBy(field);
    }

    setData(sortedData);
  };

  const openModal = (row) => {
    setIsShowModelDetail(true)
    setRowData(row)
  }

  const closeModal = () => {
    setIsShowModelDetail(false)
  }

  useEffect(() => {
    setData(list?.data);
  }, [list]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {dataField.map((item) => (
              <StyledTableCell
                key={item.name}
                onClick={
                  item.sort ? () => handleSort(`${item.field}`) : () => {}
                }
              >
                {item.name}{" "}
                {item.sort && (
                  <ArrowUpwardIcon
                    sx={{
                      transform: `${
                        sortBy === item.field ? "none" : "rotate(180deg)"
                      } `,
                      msTransition: "ease-in-out",
                      msTransitionDelay: "500ms",
                      width: 16,
                      height: 16,
                    }}
                  />
                )}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => {
            let listImage;
            let imageSrc;
            if (row.image) {
              listImage = JSON.parse(row.image);
              imageSrc = imageUrl + listImage[1];
            }
            return (
              <>
              <TableRow key={row.id} hover className="cursor-pointer" onClick={() => openModal(row)}>
                <TableCell>{row.id}</TableCell>
                {imageSrc && (
                  <TableCell>
                    <Avatar
                      alt={row.name}
                      src={imageSrc}
                      sx={{
                        borderWidth: "1px",
                        borderColor: "#333333",
                      }}
                    />
                  </TableCell>
                )}
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{parseInt(row.price)}</TableCell>
                <TableCell>
                  {Math.abs(moment(row.createdAt).diff(moment(), "days"))} days
                  ago
                </TableCell>
                <TableCell>
                  {Math.abs(moment(row.updatedAt).diff(moment(), "days"))} days
                  ago
                </TableCell>
                <TableCell>
                  {row.ProductCategory ? row.ProductCategory.name : ""}
                </TableCell>
                <TableCell>
                  {row.ProductInventory ? row.ProductInventory.quantity : 0}
                </TableCell>
                <TableCell>{row.Discount ? row.Discount.name : ""}</TableCell>
              </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
      <ModalDetail isShow={isShowModalDetail} handleClose={closeModal} row={rowData}/>
    </TableContainer>
  );
};

TableProduct.propTypes = {
  dataField: PropTypes.array.isRequired,
  list: PropTypes.object.isRequired,
};

export default TableProduct;
