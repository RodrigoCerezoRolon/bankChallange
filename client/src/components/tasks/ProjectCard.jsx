import { useProjects } from "../../context/ProjectsContext";
import { Button, ButtonLink, Card } from "../ui";

export function ProjectCard({ project }) {
  const { deleteProject } = useProjects();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteProject(project._id)}>Delete</Button>
          <ButtonLink to={`/projects/${project._id}`}>Edit</ButtonLink>
          <ButtonLink to={`/projects/${project._id}/tasks`}> Tasks</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{project.description}</p>
      {/* format date */}
      <p>
       {project.user.username}
      </p>
    </Card>
  );
}
