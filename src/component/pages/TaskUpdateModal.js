import React from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 4,
  borderRadius: 3,
};

const TaskUpdateModal = ({
  open,
  handleClose,
  itemObjToUpdate,
  setItemObjToUpdate,
  onUpdate,
}) => {
  const handleChange = (e) => {
    setItemObjToUpdate((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(); // Call parent update function
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper elevation={10} sx={style}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Update Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              name="title"
              value={itemObjToUpdate.title}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              value={itemObjToUpdate.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              required
            />
            <Button type="submit" variant="contained" fullWidth>
              Update
            </Button>
          </Stack>
        </form>
      </Paper>
    </Modal>
  );
};

export default TaskUpdateModal;
