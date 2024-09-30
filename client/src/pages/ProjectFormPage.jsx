import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useProjects } from "../context/ProjectsContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function ProjectFormPage() {
  const { createProject, getProject, updateProject,getProjects,projects } = useProjects();
  const [loading, setLoading] = useState(true); // Para controlar la carga
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (params.id) {
        updateProject(params.id, {
          ...data,
        });
      } else {
        createProject({
          ...data,
        });
      }

       navigate("/projects");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadProject = async () => {
      if (params.id) {
        const project = await getProject(params.id);
        console.log(project);
        setValue("title", project.title);
        setValue("description", project.description);
       
      }
      setLoading(false);
    };
    loadProject();
  
   
  }, []);

  return (
    <Card>
        {loading ? ( // Muestra un mensaje mientras carga
        <p>Cargando...</p>
      ): (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>
        <Button>Save</Button>
      </form>
      )}
    </Card>
  );
}