import React from "react";
import { Button, TextField } from "@mui/material";

const Search = () => {
  return (
    <form>
      <TextField
        id="filled-basic"
        label="Search"
        variant="filled"
        sx={{ m: 1 }}
      />
      <Button
        variant="contained"
        color="success"
        sx={{ m: 1.2, padding: "13px" }}
      >
        Search
      </Button>
      <Button variant="outlined" color="error" sx={{ padding: "13px" }}>
        Reset
      </Button>
    </form>
  );
};
export default Search;
