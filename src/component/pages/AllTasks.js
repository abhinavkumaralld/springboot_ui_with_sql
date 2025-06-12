import React, { useState, useEffect } from "react";
import Task from "./Task";
import { Grid } from "@mui/material";
import NewTaskForm from "./NewTaskForm";

import axios from "axios";
import TaskUpdateModal from "./TaskUpdateModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import instance from "../../axios/instance";

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

  console.log("authobj", authObject);

  const fetchData = async () => {
    try {
      // const response = await axios.get("http://localhost:8080/notes/", {
      //   headers: {
      //     Authorization: `Bearer ${authObject.accessToken}`,
      //   },
      // });
      const response = await instance({ url: "notes/", method: "GET" });
      setItems(response?.data);
    } catch (error) {
      console.error("Fetching failed:", error.response?.data || error.message);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(
      //   "http://localhost:8080/notes/",
      //   {
      //     title: newItemObj?.title,
      //     description: newItemObj?.description,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${authObject.accessToken}`,
      //     },
      //   }
      // );
      const response = await instance({
        url: "notes/",
        method: "POST",
        data: {
          title: newItemObj?.title,
          description: newItemObj?.description,
        },
      });
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
      // const response = await axios.put(
      //   "http://localhost:8080/notes/" + itemObjToUpdate?.id,
      //   itemObjToUpdate,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${authObject.accessToken}`,
      //     },
      //   }
      // );
      const response = await instance({
        url: "notes/" + itemObjToUpdate?.id,
        method: "PUT",
        data: itemObjToUpdate,
      });
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("update failed:", error.response?.data || error.message);
    }
  };

  const deleteTask = async (id, objToDelete) => {
    try {
      // const response = await axios.delete("http://localhost:8080/notes/" + id, {
      //   headers: {
      //     Authorization: `Bearer ${authObject.accessToken}`,
      //   },
      // });
      const response = await instance({
        url: "notes/" + id,
        method: "DELETE",
      });
      fetchData();
    } catch (error) {
      console.error("delete failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (authObject.accessToken && authObject.username) fetchData();
  }, [authObject.accessToken]);

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
