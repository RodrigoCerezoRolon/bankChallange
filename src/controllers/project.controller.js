import Project from "../models/project.model.js"
import Task from "../models/task.model.js"
export const getProjects = async(req,res) =>{
    console.log(req.user.payload);
    let projects=[];
    if(req.user.payload.isAdmin){
        projects= await Project.find();
    }else{
        projects= await Project.find({user:req.user.payload.id});
    }
  
     // Para cada proyecto, buscar sus tareas y agregarlas al objeto
     for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const tasks = await Task.find({ project: project._id });
        project._doc.tasks = tasks;
      }
    res.json(projects);
} 
export const createProject = async(req,res) =>{
    const {title,description}= req.body;
    const newProject=new Project({
        title,
        description,
        user:req.user.payload.id
    })
    const savedProject=await newProject.save();
    res.json(savedProject);
} 
export const getProject = async(req,res) =>{
    const projectFound= await Project.findById(req.params.id);
    if(!projectFound) res.status(404).json({message:"Project not found"});
    const tasks = await Task.find({ project: req.params.id });

    // 3. Agregar las tareas al objeto del proyecto
    projectFound._doc.tasks = tasks; 
    return res.json(projectFound);
} 
export const deleteProject = async(req,res) =>{
    const projectFound= await Project.findByIdAndDelete(req.params.id);
    if(!projectFound) res.status(404).json({message:"Project not found"});
    res.status(204);
} 
export const updateProject = async(req,res) =>{
    console.log(req.params.id);
    const projectFound= await Project.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!projectFound) res.status(404).json({message:"Project not found"});
    res.json(projectFound);
} 
export const getProjectTasks = async(req,res)=>{
    const projectId = req.params.id;

    try {
        const tasks = await Task.find({ project: projectId }).populate('project', 'title');

        res.json(tasks);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching tasks' });
      }
}