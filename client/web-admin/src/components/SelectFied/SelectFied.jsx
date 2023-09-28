import React from 'react';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';

function CategorySelect({
  data,
  handleChange,
  value,
  label,
  defaultValue,
}) {
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
          <MenuItem
            key={item.id}
            value={item.id}
            disabled={defaultValue?.id === item.id}
          >
            {item?.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CategorySelect;
