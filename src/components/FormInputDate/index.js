import * as React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";

export default function FormInputDate({ IdText = "Id Text", DescriptionText = "Descriçao do campo" }) {
  return (
    <Box
      sx={{
        width: 500,
      }}
    >
      <label>{DescriptionText}</label>
      <TextField type="date" fullWidth id={IdText} />
    </Box>
  );
}
