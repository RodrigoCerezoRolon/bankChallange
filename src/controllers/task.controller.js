import Task from "../models/task.model.js"
export const getTasks = async(req,res) =>{
    let tasks=[];
    if(req.params.projectId!=null){
        tasks= await Task.find({project:req.params.id}).populate('project','title');
    }
    if(req.user.payload.isAdmin){
        tasks= await Task.find().populate('project','title');
    }
    if(!req.user.payload.isAdmin){
    const tasksGeneral = await Task.find()
    .populate({
      path: 'project',
      match: { user: req.user.payload._id }, // Filtra proyectos donde el usuario es el dueño
    },'title')
    .exec();

  // Filtra las tareas que tengan un proyecto válido
   tasks = tasksGeneral.filter(task => task.project !== null);
    }
    res.json(tasks);
} 
export const createTask = async(req,res) =>{
    const {title,description,project,date,state}= req.body;
    const newTask=new Task({
        title,
        description,
        project,
        date,
        state,
        project
    })
    const savedTask=await newTask.save();
    res.json(savedTask);
} 
export const getTask = async(req,res) =>{
    const taskFound= await Task.findById(req.params.id);
    if(!taskFound) res.status(404).json({message:"Task not found"});
    return res.json(taskFound);
} 
export const deleteTask = async(req,res) =>{
    const taskFound= await Task.findByIdAndDelete(req.params.id);
    if(!taskFound) res.status(404).json({message:"Task not found"});
    res.json(taskFound);
} 
export const updateTask = async(req,res) =>{
    const taskFound= await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!taskFound) res.status(404).json({message:"Task not found"});
    res.status(204);
} 