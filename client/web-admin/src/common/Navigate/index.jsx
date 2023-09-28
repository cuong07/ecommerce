import React from 'react';
import {
  List,
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RedeemIcon from '@mui/icons-material/Redeem';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import ListItemLink from './ListItemLink';

const nav = [
  { text: 'Home', link: '/', icon: <HomeIcon /> },
  { text: 'Product', link: '/product', icon: <RedeemIcon /> },
  { text: 'Category', link: '/category', icon: <CategoryIcon /> },
  { text: 'Cart', link: '/cart', icon: <ShoppingCartIcon /> },
  { text: 'Order', link: '/order', icon: <LocalShippingIcon /> },
];

function Navigate(props) {
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      sx={{
        bgcolor: 'background.paper',
      }}
    >
      {nav.map((item) => (
        <ListItemLink
          to={item.link}
          primary={item.text}
          icon={item.icon}
          key={item.link}
        />
      ))}
    </List>
  );
}

export default Navigate;
