import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required("Please enter a name."),
  description: yup.string().required("Please enter a description"),
});

const EditFormV2 = ({ onSubmit }) => {
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
    },
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "all",
  });
  const onInvalid = (errors) => console.error(errors);

  // const resetField = () => {
  //   reset();
  // };

  return (
    <Box
      component="div"
      className="w-full flex gap-5 bg-white p-8 shadow-lg rounded-lg"
    >
      <form
        className="w-1/2 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
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
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Box className="w-full flex flex-col">
              <TextField {...field} label="Description" />
              {errors.description && (
                <span className="text-sm text-red-400 ">
                  {errors.description.message}
                </span>
              )}
            </Box>
          )}
        />
        <Button
          variant="outlined"
          className="w-1/5"
          type="submit"
          // onClick={resetField}
        >
          SAVE
        </Button>
      </form>
    </Box>
  );
};

export default EditFormV2;
