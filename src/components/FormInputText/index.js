import * as React from "react";
import TextField from "@mui/material/TextField";

export default function FormInputText({
  labelText = "Texto do label",
  IdText = "Id Text",
  DescriptioText = "Texto Informativo do campo",
}) {
  return (
    <>
      <label>{DescriptioText}</label>
      <TextField fullWidth label={labelText} id={IdText} />
    </>
  );
}
