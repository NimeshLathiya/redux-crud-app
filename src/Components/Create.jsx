import { Box, TextField } from "@mui/material";
import "./Create.css";
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { createUser } from "../Features/UserDetailSlice";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  };

  const [users, setUsers] = useState(initialState);

  const getUserData = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted User Data:", users);
    dispatch(createUser(users));
    setUsers(initialState);
    navigate("/read");
    // You can send `users` to your backend or any other logic here.
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className="d-flex flex-column w-50 mx-auto my-5"
      >
        <TextField
          id="outlined-helperText"
          required
          label="Enter a Name"
          value={users.name}
          className="mb-3"
          name="name"
          onChange={getUserData}
          // error
        />
        <TextField
          id="outlined-helperText"
          label="Enter a Email"
          required
          value={users.email}
          className="mb-3"
          name="email"
          onChange={getUserData}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          value={users.password}
          autoComplete="current-password"
          className="mb-3"
          name="password"
          required
          onChange={getUserData}
        />
        <TextField
          id="outlined-number"
          label="Enter a Age"
          type="number"
          value={users.age}
          required
          InputLabelProps={{
            shrink: true,
          }}
          className="mb-3"
          name="age"
          onChange={getUserData}
        />
        <FormControl className="mt-1 ms-2">
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="gender"
            value={users.gender}
            onChange={getUserData}
            className="d-flex"
          >
            <div>
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </div>
          </RadioGroup>
          <div className="mt-3">
            <Button variant="contained" endIcon={<SendIcon />} type="submit">
              Send
            </Button>
          </div>
        </FormControl>
      </Box>
    </>
  );
};

export default Create;
