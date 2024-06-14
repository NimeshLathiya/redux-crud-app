import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomModal from "./CustomModal";
import Link from "@mui/material/Link";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../Features/UserDetailSlice";
import "./Read.css";
import { Link as RouterLink } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const Read = () => {
  const [modalData, setModalData] = useState({
    open: false,
    title: "",
    description: "",
  });
  const { users, loading, searchData } = useSelector((state) => state.app);

  const [radioData, setRadioData] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return <h1 className="text-white text-center mt-5 py-5">Loading.....</h1>;
  }

  const handleOpenModal = (user) => {
    setModalData({
      open: true,
      title: `User Name : ${
        Array.isArray(user.name) ? user.name.join(", ") : user.name
      }`,
      userId: `User Id : ${user.id}`,
      userEmail: `User Email : ${
        Array.isArray(user.email) ? user.email.join(", ") : user.email
      }`,
      userPassword: `User Password : ${
        Array.isArray(user.password) ? user.password.join(", ") : user.password
      }`,
      userAge: `Age : ${
        Array.isArray(user.age) ? user.age.join(", ") : user.age
      }`,
      userGender: `Gender : ${
        Array.isArray(user.gender) ? user.gender.join(", ") : user.gender
      }`,
    });
  };

  const handleCloseModal = () => {
    setModalData({ ...modalData, open: false });
  };

  const filteredUsers = users.filter((user) => {
    const name = Array.isArray(user.name) ? user.name.join(", ") : user.name;
    const gender = Array.isArray(user.gender)
      ? user.gender.join(", ")
      : user.gender;
    if (!searchData && (!radioData || radioData === "")) {
      return true;
    }
    if (typeof name === "string") {
      if (!searchData && radioData) {
        return gender.toLowerCase() === radioData.toLowerCase();
      }
      return name.toLowerCase().includes(searchData.toLowerCase());
    }
    return false;
  });

  return (
    <>
      <CustomModal
        open={modalData.open}
        onClose={handleCloseModal}
        title={modalData.title}
        userId={modalData.userId}
        userEmail={modalData.userEmail}
        userPassword={modalData.userPassword}
        userGender={modalData.userGender}
        userAge={modalData.userAge}
      />

      <div className="d-flex justify-content-center mt-3">
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={radioData}
            onChange={(e) => setRadioData(e.target.value)}
          >
            <FormControlLabel
              control={<Radio sx={{ color: "success.main" }} />}
              label="All"
              value=""
            />
            <FormControlLabel
              value="Male"
              control={<Radio sx={{ color: "success.main" }} />}
              label="Male"
            />
            <FormControlLabel
              value="Female"
              control={<Radio sx={{ color: "success.main" }} />}
              label="Female"
            />
            <FormControlLabel
              value="Other"
              control={<Radio sx={{ color: "success.main" }} />}
              label="Other"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="text-white mx-auto card-grid">
        {filteredUsers.length <= 0 ? (
          <h1 className="mt-3">
            {" "}
            No User Found{" "}
            <Link component={RouterLink} to="/" underline="hover">
              Create User
            </Link>
          </h1>
        ) : (
          filteredUsers.map((user) => (
            <Card
              key={user.id} // Ensure each card has a unique key
              style={{
                maxWidth: 345,
                boxShadow: "15px 20px 22px -5px black",
                marginBottom: "30px",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Name :{" "}
                  {Array.isArray(user.name) ? user.name.join(", ") : user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Id : {user.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email :{" "}
                  {Array.isArray(user.email)
                    ? user.email.join(", ")
                    : user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Password :{" "}
                  {Array.isArray(user.password)
                    ? user.password.join(", ")
                    : user.password}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Age :{" "}
                  {Array.isArray(user.age) ? user.age.join(", ") : user.age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gender :{" "}
                  {Array.isArray(user.gender)
                    ? user.gender.join(", ")
                    : user.gender}
                </Typography>
              </CardContent>
              <CardActions className="pb-3 d-flex justify-content-center gap-2">
                <Button
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  size="small"
                  color="success"
                  onClick={() => handleOpenModal(user)}
                >
                  View
                </Button>
                <Link component={RouterLink} to={`/edit/${user.id}`}>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    size="small"
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => dispatch(deleteUser(user.id))}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </div>
    </>
  );
};

export default Read;
