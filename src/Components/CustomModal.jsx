import React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

const CustomModal = ({
  open,
  onClose,
  title,
  userId,
  userEmail,
  userPassword,
  userGender,
  userAge,
}) => {
  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={onClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h3"
            fontWeight="lg"
            mb={1}
            sx={{ color: "blue" }} // Title text color
          >
            {title}
          </Typography>
          <Typography
            component="h2"
            level="h4"
            fontWeight="lg"
            mb={1}
            sx={{ color: "red" }} // User ID text color
          >
            {userId}
          </Typography>
          <Typography
            component="h2"
            level="h4"
            fontWeight="lg"
            mb={1}
            sx={{ color: "green" }} // User Email text color
          >
            {userEmail}
          </Typography>
          <Typography
            component="h2"
            level="h4"
            fontWeight="lg"
            mb={1}
            sx={{ color: "purple" }} // User Password text color
          >
            {userPassword}
          </Typography>
          <Typography
            component="h2"
            level="h4"
            fontWeight="lg"
            mb={1}
            sx={{ color: "ThreeDHighlight" }} // User Password text color
          >
            {userAge}
          </Typography>

          <Typography
            component="h2"
            level="h4"
            fontWeight="lg"
            mb={1}
            sx={{ color: "orange" }} // User Gender text color
          >
            {userGender}
          </Typography>
        </Sheet>
      </Modal>
    </div>
  );
};

export default CustomModal;
