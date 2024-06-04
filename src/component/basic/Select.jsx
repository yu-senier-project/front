import React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function SelectComponent({ id, placeholder, onChange, data }) {
  const [value, setValue] = React.useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value}
        onChange={handleChange}
        label={placeholder}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {data.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
