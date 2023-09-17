import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CategorySelect = ({ data, handleChange, value, label }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={value}
        label={label}
        onChange={handleChange}
      >
        {data?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item?.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

CategorySelect.propTypes = {};

export default CategorySelect;
