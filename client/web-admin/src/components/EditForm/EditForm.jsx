import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  ImageList,
  ImageListItem,
  Input,
  InputBase,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

const schema = yup.object().shape({
  name: yup.string().required("Please enter a name."),
  description: yup.string().required("Please enter a description"),
  price: yup.number().required("Please enter a number"),
});

const EditForm = ({ product }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
    },
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "all",
  });

  const { imageUrl } = useSelector((state) => state.context);

  const imageList = JSON.parse(product?.image);
  const onSubmit = (data) => {
    console.log(data);
  };

  const handleDeleteImage = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Box className="w-1/2 flex flex-col">
              <TextField {...field} label="Name" />
              {errors.name && (
                <span className="text-sm text-red-400 ">
                  {errors.name.message}
                </span>
              )}
            </Box>
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Box className="w-1/2 flex flex-col">
              <TextField {...field} label="Price" />
              {errors.price && (
                <span className="text-sm text-red-400">
                  {errors.price.message}
                </span>
              )}
            </Box>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Box className="w-1/2 flex flex-col">
              <Typography>Description</Typography>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={8}
                label="Description"
                placeholder="Description"
                className="p-2 focus:outline-[#1976d2] border border-[#ccc] rounded-md"
                {...field}
              />
              {errors.description && (
                <span className="text-sm text-red-400 ">
                  {errors.description.message}
                </span>
              )}
            </Box>
          )}
        />

        {/* <Controller name="" /> */}

        <Box>
          <Typography>Image</Typography>
          <ImageList sx={{ width: "100%" }} gap={16} cols={7} rowHeight={200}>
            {imageList.map((item) => (
              <Box component="div" key={item} className="relative group">
                <ImageListItem
                  key={item.img}
                  className=" border-[#ccc] border rounded-md  hover:cursor-pointer"
                >
                  <img
                    src={imageUrl + item}
                    alt={item}
                    loading="lazy"
                    className="p-2 duration-200"
                  />
                </ImageListItem>
                <Box
                  component="span"
                  className="hover:bg-[#fafafa] flex items-center justify-center absolute top-0 right-0 opacity-0 transition-opacity group-hover:opacity-100 bg-white border border-black rounded-full m-2 cursor-pointer"
                  onClick={() => handleDeleteImage(item)}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <CloseIcon fontSize="medium" className="p-0 m-0" />
                  </motion.div>
                </Box>
              </Box>
            ))}
          </ImageList>
        </Box>

        <button type="submit" title="submit">
          sm
        </button>
      </form>
    </>
  );
};

EditForm.propTypes = {};

export default EditForm;
