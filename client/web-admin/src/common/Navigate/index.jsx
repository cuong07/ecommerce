import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  List,
} from "@mui/material";
import {
  AccountCircle,
  Home,
  LocalShipping,
  Redeem,
  ShoppingCart,
  Category,
  Discount,
} from "@mui/icons-material";
import ListItemLink from "./ListItemLink";

const nav = [
  {
    text: "Home",
    link: "/dashboard",
    icon: <Home className="text-[#b1b6be]" />,
  },
  {
    text: "Product",
    link: "/product",
    icon: <Redeem className="text-[#b1b6be]" />,
  },
  {
    text: "Category",
    link: "/category",
    icon: <Category className="text-[#b1b6be]" />,
  },
  {
    text: "Cart",
    link: "/cart",
    icon: <ShoppingCart className="text-[#b1b6be]" />,
  },
  {
    text: "Order",
    link: "/order",
    icon: <LocalShipping className="text-[#b1b6be]" />,
  },
  {
    text: "Account",
    link: "/account",
    icon: <AccountCircle className="text-[#b1b6be]" />,
  },
  {
    text: "Discount",
    link: "/discount",
    icon: <Discount className="text-[#b1b6be]" />,
  },
];

function Navigate(props) {
  const [value, setValue] = useState("recents");
  const handleChange = (event) => {
    setValue(newValue);
  };
  return (
    <>
      <List component="ul" className="hidden md:block w-full !px-2 ">
        {nav.map((item) => (
          <ListItemLink
            to={item.link}
            primary={item.text}
            icon={item.icon}
            key={item.link}
          />
        ))}
      </List>
      <Box component="div" className="md:hidden block">
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          {nav.map((item) => (
            <BottomNavigationAction
              label={item.text}
              value={item.link}
              icon={item.icon}
              key={item.link}
            />
          ))}
        </BottomNavigation>
      </Box>
    </>
  );
}

export default Navigate;
