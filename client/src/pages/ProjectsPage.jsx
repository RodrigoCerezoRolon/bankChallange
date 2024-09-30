import { useEffect } from "react";
import { useProjects } from "../context/ProjectsContext";

import { ImFileEmpty } from "react-icons/im";
import { ProjectCard } from "../components/tasks/ProjectCard";

export function ProjectsPage() {
  const { projects, getProjects } = useProjects();

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      {projects.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No projects yet, please add a new task
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {projects.map((project) => (
          <ProjectCard project={project} key={project._id} />
        ))}
      </div>
    </>
  );
}