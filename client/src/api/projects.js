import axios from "./axios";

export const getProjectsRequest = async () => axios.get("/projects");

export const createProjectRequest = async (project) => axios.post("/projects", project);

export const updateProjectRequest = async (id,project) =>
  axios.put(`/projects/${id}`, project);

export const deleteProjectRequest = async (id) => axios.delete(`/projects/${id}`);

export const getProjectRequest = async (id) => axios.get(`/projects/${id}`);