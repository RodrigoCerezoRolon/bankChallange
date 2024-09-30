import { createContext, useContext, useState } from "react";
import {
  createProjectRequest,
  deleteProjectRequest,
  getProjectsRequest,
  getProjectRequest,
  updateProjectRequest,
} from "../api/projects";
// import { getProjectsRequest } from "../api/projects";

const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjects must be used within a ProjectProvider");
  return context;
};

export function ProjectProvider({ children }) {
  
  const [projects, setProjects] = useState([]);
  const getProjects = async ()=>{
    const res = await getProjectsRequest();
    setProjects(res.data);
  }
  

  const deleteProject = async (id) => {
    try {
      const res = await deleteProjectRequest(id);
      if (res.status === 204) setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async (task) => {
    try {
      const res = await createProjectRequest(task);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (id) => {
    try {
      const res = await getProjectRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProject = async (id, project) => {
    console.log(id,project);
    try {
      await updateProjectRequest(id, project);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        getProjects,
        deleteProject,
        createProject,
        getProject,
        updateProject,
        getProjects
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}