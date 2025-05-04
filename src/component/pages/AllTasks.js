import React, { useState, useEffect } from "react";
import Task from "./Task";
import { Grid } from "@mui/material";
import NewTaskForm from "./NewTaskForm";

import axios from "axios";
import TaskUpdateModal from "./TaskUpdateModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AllTasks = () => {
  const [items, setItems] = useState([]);
  const [newItemObj, setNewItemObj] = useState({
    title: "",
    description: "",
  });
  const [itemObjToUpdate, setItemObjToUpdate] = useState({
    id: "",
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  const authObject = useSelector((state) => state.auth);
  const [base64Credentials, setBase64Credentials] = useState(
    btoa(`${authObject.username}:${authObject.password}`)
  );

  const fetchData = async () => {
    try {
      const token = base64Credentials; // base64 encode
      const response = await axios.get("http://localhost:8080/notes/", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      setItems(response?.data);
    } catch (error) {
      console.error("Fetching failed:", error.response?.data || error.message);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const token = base64Credentials; // base64 encode
      const response = await axios.post(
        "http://localhost:8080/notes/",
        {
          title: newItemObj?.title,
          description: newItemObj?.description,
        },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      setNewItemObj({
        title: "",
        description: "",
      });
      fetchData();
    } catch (error) {
      console.error("add failed:", error.response?.data || error.message);
    }
  };

  const updateTask = async () => {
    try {
      const token = base64Credentials; // base64 encode
      const response = await axios.put(
        "http://localhost:8080/notes/" + itemObjToUpdate?.id,
        itemObjToUpdate,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("add failed:", error.response?.data || error.message);
    }
  };

  const deleteTask = async (id, objToDelete) => {
    try {
      const token = base64Credentials; // base64 encode
      const response = await axios.delete("http://localhost:8080/notes/" + id, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error("add failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (base64Credentials && authObject.username) fetchData();
  }, [base64Credentials]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <NewTaskForm
        newItemObj={newItemObj}
        setNewItemObj={setNewItemObj}
        handleSubmit={addTask}
      />
      <TaskUpdateModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        onUpdate={updateTask}
        setItemObjToUpdate={setItemObjToUpdate}
        itemObjToUpdate={itemObjToUpdate}
      />
      <Grid container>
        {items.map((val, ind) => (
          <Task
            key={ind}
            title={val.title}
            description={val.description}
            onEdit={updateTask}
            onDelete={deleteTask}
            id={val.id}
            gridCss={{ item: true, xs: 4 }}
            setIsModalOpen={setIsModalOpen}
            setItemObjToUpdate={setItemObjToUpdate}
          />
        ))}
      </Grid>
    </>
  );
};

export default AllTasks;
