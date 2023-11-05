import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Controller, set, useForm } from "react-hook-form";
import {
  Box,
  Button,
  CssBaseline,
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
import { FileUploader } from "react-drag-drop-files";
import SelectFied from "../SelectFied/SelectFied";

const schema = yup.object().shape({
  name: yup.string().required("Please enter a name."),
  description: yup.string().required("Please enter a description"),
  price: yup.number().required("Please enter a number"),
  image: yup.mixed().nullable(),
  inventory: yup.number().nullable().required("Please enter a quantity"),
});

function EditForm({
  product,
  category,
  discount,
  productId,
  onSubmit,
  handleUpdateImage,
}) {
  const [files, setFiles] = useState(null);
  const [productData, setProductData] = useState(null);
  const [imageList, setImageList] = useState(null);
  const [listImageUpload, setListImageUpload] = useState([]);
  const [categorySelect, setCategorySelect] = useState("");
  const [discountSelect, setDiscountSelect] = useState("");

  const fileTypes = ["JPG", "PNG", "GIF"];
  const { imageUrl } = useSelector((state) => state.context);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      productId,
      categoryId: "",
      discountId: "",
      image: null,
      inventory: "",
    },
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "all",
  });

  useEffect(() => {
    reset({
      ...getValues(),
      categoryId: categorySelect,
      discountId: discountSelect,
    });
  }, [categorySelect, discountSelect]);

  const handleImageUpload = (files) => {
    setFiles(files);
    setValue("image", files);
  };

  const deleteImage = async (imageId) => {
    handleUpdateImage({
      productId,
      imageId,
    });
  };

  useEffect(() => {
    const promises = [];
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
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

  const handleChangeCategory = (e) => {
    setCategorySelect(e.target.value);
  };

  const handleChangeDiscount = (e) => {
    setDiscountSelect(e.target.value);
  };

  const resetFiles = () => {
    setListImageUpload([]);
  };

  useEffect(() => {
    setProductData(product?.data);
  }, [product]);

  useEffect(() => {
    if (productData) {
      setValue("name", productData?.name);
      setValue("description", productData?.description);
      setValue("price", productData?.price);
      setValue("productId", productId);
      setValue("categoryId", productData?.ProductCategory?.id || "");
      setValue("discountId", productData?.Discount?.id || "");
      setValue("image", null);
      setValue("inventory", productData?.ProductInventory?.quantity);
      try {
        const images = JSON.parse(productData.image);
        setImageList(images);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
      setCategorySelect(productData.ProductCategory?.id || "");
      setDiscountSelect(productData.Discount?.id || "");
    }
  }, [productData]);

  const onInvalid = (errors) => console.error(errors);

  return (
    <Box
      component="div"
      className="w-full flex  gap-5 bg-white p-8 shadow-lg rounded-lg"
    >
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="flex flex-col w-1/2 gap-4"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Box className="w-full flex flex-col">
              <TextField {...field} label="Name" />
              {errors.name && (
                <span className="text-sm text-red-400 ">
                  {errors.name.message}
                </span>
              )}
            </Box>
          )}
        />
        <Box component="div" className="flex w-full gap-6">
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
              defaultValue={productData?.ProductCategory}
              value={categorySelect}
              label="Category"
            />
          </Box>
        </Box>
        <Box component="div" className="flex w-full gap-6">
          <Box className="w-2/3">
            <SelectFied
              data={discount}
              handleChange={handleChangeDiscount}
              defaultValue={productData?.Discount}
              value={discountSelect}
              label="Discount"
            />
          </Box>
          <Controller
            name="inventory"
            control={control}
            render={({ field }) => (
              <Box className=" flex-1 flex flex-col">
                <TextField {...field} label="Quantity" />
                {errors.price && (
                  <span className="text-sm text-red-400">
                    {errors.price.message}
                  </span>
                )}
              </Box>
            )}
          />
        </Box>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Box className="w-full flex flex-col">
              <InputLabel id="input-des">Description</InputLabel>
              <TextareaAutosize
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
          <ImageList
            sx={{ width: "100%" }}
            gap={16}
            cols={3}
            id="input-file"
            rowHeight={200}
          >
            {imageList?.map((item) => (
              <Box component="div" key={item} className="relative group">
                <ImageListItem
                  key={item.img}
                  className=" border-[#ccc] border rounded-md h-[200px] hover:cursor-pointer overflow-hidden p-2"
                >
                  <img
                    src={imageUrl + item}
                    alt={item}
                    loading="lazy"
                    className="duration-200 w-full h-full"
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
              <FileUploader
                handleChange={handleImageUpload}
                name="image"
                multiple
                types={fileTypes}
                className="h-20"
                label="Upload Files"
                {...field}
              />
            </Box>
          )}
        />

        <ImageList cols={3} rowHeight={164} gap={16}>
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
          onClick={resetFiles}
        >
          SAVE
        </Button>
      </form>
      <div />
      <Box component="div" className="flex-1" />
    </Box>
  );
}

EditForm.propTypes = {};

export default EditForm;
