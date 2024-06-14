import { Box, TextField } from "@mui/material";
import "./Create.css";
import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Features/UserDetailSlice";

const Edit = () => {
  const { id } = useParams();
  console.log("id", id);

  const [updateData, setUpdateData] = useState();

  const { users, loading } = useSelector((state) => state.app);

  //   console.log("users", users);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const singleUser = users.filter((user) => user.id === id);
      setUpdateData(singleUser[0]);
    }
  }, [id, users]);

  console.log("updateData", updateData);

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: [e.target.value] });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/read");
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
        onSubmit={handleUpdate}
        className="d-flex flex-column w-50 mx-auto my-5"
      >
        <TextField
          id="outlined-helperText"
          required
          label="Enter a Name"
          value={updateData && updateData.name}
          className="mb-3"
          name="name"
          onChange={newData}
          // error
        />
        <TextField
          id="outlined-helperText"
          label="Enter a Email"
          required
          value={updateData && updateData.email}
          className="mb-3"
          name="email"
          onChange={newData}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          value={updateData && updateData.password}
          autoComplete="current-password"
          className="mb-3"
          name="password"
          required
          onChange={newData}
        />
        <TextField
          id="outlined-number"
          label="Enter a Age"
          type="number"
          value={updateData && updateData.age}
          required
          InputLabelProps={{
            shrink: true,
          }}
          className="mb-3"
          name="age"
          onChange={newData}
        />
        <FormControl className="mt-1 ms-2">
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="gender"
            value={updateData ? updateData.gender : ""}
            onChange={newData}
            className="d-flex"
          >
            <div>
              <FormControlLabel
                value="female"
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
              Update
            </Button>
          </div>
        </FormControl>
      </Box>
    </>
  );
};

export default Edit;
