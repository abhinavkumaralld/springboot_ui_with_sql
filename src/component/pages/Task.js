import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Grid,
} from "@mui/material";

const Task = ({
  id,
  title,
  description,
  onEdit,
  onDelete,
  gridCss,
  setIsModalOpen,
  setItemObjToUpdate,
}) => {
  return (
    <Grid
      sx={{
        maxWidth: 400,
        borderRadius: 3,
        boxShadow: 4,
        backgroundColor: "#fafafa",
        margin: "2%",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ width: "90%" }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ ml: 1 }}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => {
                setItemObjToUpdate({
                  id: id,
                  title: title,
                  description: description,
                });
                setIsModalOpen(true);
              }}
            >
              Edit
            </Button>
          </Box>
          <Box sx={{ ml: 1 }}>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => onDelete(id)}
            >
              Delete
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Task;
