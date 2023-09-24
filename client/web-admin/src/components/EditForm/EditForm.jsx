import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Controller, set, useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  ImageList,
  ImageListItem,
  Input,
  InputBase,
  InputLabel,
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
import { InputFile } from "../../components";
import { FileUploader } from "react-drag-drop-files";
import SelectFied from "../SelectFied/SelectFied";

const schema = yup.object().shape({
  name: yup.string().required("Please enter a name."),
  description: yup.string().required("Please enter a description"),
  price: yup.number().required("Please enter a number"),
  image: yup.mixed(),
});

const EditForm = ({
  product,
  category,
  discount,
  productId,
  handleSubmitEdit,
  handleUpdateImage,
}) => {
  const [files, setFiles] = useState(null);
  const [listImageUpload, setListImageUpload] = useState([]);
  const [categorySelect, setCategorySelect] = useState("");
  const [discountSelect, setDiscountSelect] = useState("");
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      productId: productId,
      categoryId: product?.ProductCategory?.id || "",
      discountId: product?.Discount?.id || "",
      image: null,
    },
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "all",
  });

  const fileTypes = ["JPG", "PNG", "GIF"];
  const { imageUrl } = useSelector((state) => state.context);
  let imageList;

  useEffect(() => {
    if (product?.image) {
      try {
        imageList = JSON.parse(product.image);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [product]);
  

  const handleImageUpload = (files) => {
    setFiles(files);
    setValue("image", files);
  };

  const deleteImage = (imageId) => {
    handleUpdateImage({
      productId,
      imageId,
    });
  };

  useEffect(() => {
    const promises = [];
    for (let i = 0; i < files?.length; i++) {
      let file = files[i];
      const reader = new FileReader();
      const promise = new Promise((resolve) => {
        reader.onload = function (event) {
          const base64Image = event.target.result;
          resolve(base64Image);
        };
        reader.readAsDataURL(file);
      });
      promises.push(promise);
    }
    Promise.all(promises).then((base64Images) => {
      setListImageUpload(base64Images);
    });
  }, [files]);

  useEffect(() => {
    reset({
      ...getValues(),
      categoryId: categorySelect,
      discountId: discountSelect,
    });
  }, [categorySelect, discountSelect]);

  const handleChangeCategory = (e) => {
    setCategorySelect(e.target.value);
  };

  const handleChangeDiscount = (e) => {
    setDiscountSelect(e.target.value);
  };

  return (
    <Box component="div" className="bg-white p-4 shadow-lg rounded-lg">
      <form
        onSubmit={handleSubmit(handleSubmitEdit)}
        className="flex flex-col gap-4"
      >
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
        <Box component="div" className="flex w-1/2 gap-6">
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Box className="w-1/3 flex flex-col">
                <TextField {...field} label="Price" />
                {errors.price && (
                  <span className="text-sm text-red-400">
                    {errors.price.message}
                  </span>
                )}
              </Box>
            )}
          />

          <Box className="flex-1">
            <SelectFied
              data={category}
              handleChange={handleChangeCategory}
              defaultValue={product?.ProductCategory?.id}
              value={categorySelect}
              label="Category"
            />
          </Box>
        </Box>
        <Box className="w-1/2">
          <SelectFied
            data={discount}
            handleChange={handleChangeDiscount}
            defaultValue={product?.Discount?.id}
            value={discountSelect}
            label="Discount"
          />
        </Box>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Box className="w-1/2 flex flex-col">
              <InputLabel id="input-des">Description</InputLabel>
              <TextareaAutosize
                labelId="input-des"
                minRows={8}
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

        <Box component="div">
          <InputLabel id="input-file">Image</InputLabel>
          <ImageList
            sx={{ width: "100%" }}
            gap={16}
            cols={7}
            id="input-file"
            rowHeight={200}
          >
            {imageList &&
              imageList?.map((item) => (
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
                    onClick={() => deleteImage(item)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <CloseIcon fontSize="medium" className="p-0 m-0" />
                    </motion.div>
                  </Box>
                </Box>
              ))}
          </ImageList>
        </Box>

        <Controller
          className="flex flex-col gap-4"
          name="name"
          control={control}
          render={({ field }) => (
            <Box>
              <InputLabel id="input-uploader">Upload image</InputLabel>
              <FileUploader
                labelId="input-uploader"
                handleChange={handleImageUpload}
                name="image"
                multiple={true}
                types={fileTypes}
                className="h-20"
                label="Upload Files"
                {...field}
              />
            </Box>
          )}
        />

        <ImageList cols={8} rowHeight={164} gap={16}>
          {listImageUpload.map((item, index) => (
            <ImageListItem key={index}>
              <img src={item} alt={`Image ${index}`} />
            </ImageListItem>
          ))}
        </ImageList>

        <Button
          variant="outlined"
          className="w-20"
          type="submit"
          title="submit"
        >
          SAVE
        </Button>
      </form>
    </Box>
  );
};

EditForm.propTypes = {};

export default EditForm;
