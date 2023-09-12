import React from "react";
import PropTypes from "prop-types";
import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RedeemIcon from '@mui/icons-material/Redeem';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ListItemLink from "./ListItemLink";

const dummyData = [
  { text: "Product", link: "/product", icon: <RedeemIcon /> },
  { text: "Category", link: "/category", icon: <CategoryIcon /> },
  { text: "Cart", link: "/cart", icon: <ShoppingCartIcon/> },
  { text: "Order", link: "/order", icon: <LocalShippingIcon/> },
];

const Navigate = (props) => {
  return (
    <List>
      {dummyData.map((item) => {
        return (
          <ListItemLink
            to={item.link}
            primary={item.text}
            icon={item.icon}
            key={item.link}
          />
        );
      })}
    </List>
  );
};

Navigate.propTypes = {};

export default Navigate;
