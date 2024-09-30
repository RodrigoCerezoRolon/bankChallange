import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js';
import { createProject, deleteProject, getProject, getProjects, getProjectTasks, updateProject } from '../controllers/project.controller.js';
const router = Router()

router.get('/projects',authRequired,getProjects)
router.get('/projects/:id',authRequired,getProject)
router.post('/projects',authRequired,createProject)
router.delete('/projects/:id',authRequired,deleteProject)
router.put('/projects/:id',authRequired,updateProject)
router.get('/projects/:id/tasks',authRequired,getProjectTasks);
export default router;