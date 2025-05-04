import React from "react";
import { Card, CardContent, TextField, Button, Box } from "@mui/material";

export default function NewTaskForm(props) {
  return (
    <Card
      sx={{ maxWidth: 500, mx: "auto", mt: 5, boxShadow: 3, borderRadius: 3 }}
    >
      <CardContent>
        <Box
          component="form"
          onSubmit={props?.handleSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={props?.newItemObj?.title}
            onChange={(e) =>
              props?.setNewItemObj({
                ...props?.newItemObj,
                title: e.target.value,
              })
            }
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={props?.newItemObj?.description}
            onChange={(e) =>
              props?.setNewItemObj({
                ...props?.newItemObj,
                description: e.target.value,
              })
            }
          />
          <Button type="submit" variant="contained" fullWidth>
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
