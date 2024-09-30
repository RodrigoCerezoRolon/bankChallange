import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
  getTasksByProjectRequest
} from "../api/tasks";
import { getProjectsRequest } from "../api/projects";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const getProjects = async ()=>{
    const res = await getProjectsRequest();
    setProjects(res.data);
  }
  const getTasks = async () => {
    const res = await getTasksRequest();
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.error(error);
    }
  };
  const getProjectTasks = async (id)=>{
    try {
      const res =await getTasksByProjectRequest(id);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <TaskContext.Provider
      value={{
        tasks,
        projects,
        getTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
        getProjects,
        getProjectTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}