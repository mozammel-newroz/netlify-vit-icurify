import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField } from "@mui/material";
import { useLocation } from "react-router-dom";

const MyDatePicker = ({ date, setDate, fieldTitle }: any) => {
  const path = useLocation().pathname;

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={fieldTitle}
          inputFormat="dd/MM/yyyy"
          views={["day", "month", "year"]}
          value={date}
          onChange={(e) => {
            setDate(e);
          }}
          renderInput={(params: any) => (
            <TextField
              color="primary"
              size="small"
              variant={path === "/signup" ? "standard" : "outlined"}
              {...params}
              sx={{ width: "100%" }}
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default MyDatePicker;
