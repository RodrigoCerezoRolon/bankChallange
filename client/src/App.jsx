import { BrowserRouter,Routes,Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { TasksPage } from "./pages/TasksPage";
import { TasksByProject } from "./pages/TasksByProject";
import { TaskFormPage } from "./pages/TaskFormPage";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { Navbar } from "./components/Navbar";
import { TaskProvider } from "./context/tasksContext";
import { ProjectProvider } from "./context/ProjectsContext";
import { ProjectFormPage } from "./pages/ProjectFormPage";

function App(){
  return (
    <AuthProvider>
      <ProjectProvider>
       <TaskProvider>
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      
        <Route element={<ProtectedRoute/>}>
       
          <Route path="/tasks" element={<TasksPage></TasksPage>}></Route>
          <Route path="/add-task" element={<TaskFormPage></TaskFormPage>}></Route>
          <Route path="/tasks/:id" element={<TaskFormPage></TaskFormPage>}></Route>
          <Route path="/profile" element={<h1>profle</h1>}></Route>
          <Route path="/projects" element={<ProjectsPage></ProjectsPage>}></Route>
          <Route path="/add-project" element={<ProjectFormPage></ProjectFormPage>}></Route>
          <Route path="/projects/:id" element={<ProjectFormPage></ProjectFormPage>}></Route>
          <Route path="/projects/:id/tasks" element={<TasksByProject></TasksByProject>}></Route>
        </Route>
      
      
       
      </Routes>
    </BrowserRouter>
    </TaskProvider>
    </ProjectProvider>
    </AuthProvider>
  )
}
export default App;