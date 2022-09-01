import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Teacher from './components/Teacher';
import Student from './components/Student';
import Upload from './components/Upload';
import TeacherQuiz from './components/TeacherQuiz';
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
                   path="/home"
                   element={<Home/>} />

        <Route element={<Teacher/>} path="/teacher/:teacherId"/>
         
        <Route element={<Student/>}  path="/student/:studentId"/>
        <Route element={<Upload/>} path= "/upload"/>
        <Route element={<TeacherQuiz/>}  path="/teacher/:teacherId/quiz/:quizId"/>
              
      </Routes>
    </BrowserRouter>
  );
}

export default App;
