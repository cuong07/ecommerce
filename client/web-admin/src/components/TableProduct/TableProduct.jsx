import React, { useEffect, useState } from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useSelector } from "react-redux";
import moment from "moment";
import StyledTableCell from "../StyledTableCell/StyledTableCell";

function TableProduct({ dataField, list, openModal, isCategory }) {
  const [data, setData] = useState(list?.data);
  const [sortBy, setSortBy] = useState(null);

  const { imageUrl } = useSelector((state) => state.context);

  const handleSort = (field) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const fieldValueA = field === "price" ? parseFloat(a[field]) : a[field];
      const fieldValueB = field === "price" ? parseFloat(b[field]) : b[field];

      if (fieldValueA == null || fieldValueB == null) {
        return 0;
      }

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

  useEffect(() => {
    setData(list);
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
              imageSrc = imageUrl + listImage[0];
            }
            return (
              <TableRow
                key={row.id}
                hover
                className="cursor-pointer"
                onClick={() => openModal(row)}
              >
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
                <TableCell>
                  {" "}
                  {row.name && row.name.length > 25
                    ? `${row.name.substring(0, 25)}...`
                    : row.name}
                </TableCell>
                <TableCell>
                  {row.description && row.description.length > 50
                    ? `${row.description.substring(0, 50)}...`
                    : row.description}
                </TableCell>
                {isCategory && (
                  <TableCell>
                    {row.productCount ? parseInt(row.productCount) : 0}
                  </TableCell>
                )}
                {row.price && <TableCell>{parseInt(row.price)}</TableCell>}
                <TableCell>
                  {Math.abs(moment(row.createdAt).diff(moment(), "days"))} days
                  ago
                </TableCell>
                <TableCell>
                  {Math.abs(moment(row.updatedAt).diff(moment(), "days"))} days
                  ago
                </TableCell>
                {row.ProductCategory && (
                  <TableCell>
                    {row.ProductCategory ? row.ProductCategory.name : ""}
                  </TableCell>
                )}
                {!isCategory && (
                  <TableCell>
                    {row.ProductInventory ? row.ProductInventory.quantity : 0}
                  </TableCell>
                )}
                {!isCategory && (
                  <TableCell>
                    {row.Discount ? row.Discount.name : "A"}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableProduct;
