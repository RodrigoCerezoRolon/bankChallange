import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask,getProjects,projects } = useTasks();
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
    try {
      if (params.id) {
        updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

       navigate("/tasks");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("state", task.state);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        if (projects.length > 0) { 
            const projectExists = projects.find(project => project._id === task.project);
            if (projectExists) {
            setValue("project", task.project);
            }
          } 
        setValue("completed", task.completed);
      }
    };
    const loadProjects = async()=>{
        await getProjects();
        setLoading(false);
    }
    loadProjects().then(loadTask());
    //loadTask();
   
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
        <Input
          type="text"
          name="state"
          placeholder="State"
          {...register("state")}
          autoFocus
        />
        {errors.state && (
          <p className="text-red-500 text-xs italic">Please enter a state.</p>
        )}
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />
        <Label htmlFor="date">Project</Label>
        <select name="" id="project" {...register('project')}  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md">
            {projects.map((project)=>{
                return <option key={project.id}  value={project._id} > {project.title}</option>
            })}
        </select>
        <Button>Save</Button>
      </form>
      )}
    </Card>
  );
}