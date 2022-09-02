import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Teacher from './components/Teacher';
import Student from './components/Student';
import Upload from './components/Upload';
import StudentQuiz from './components/StudentQuiz';
import TeacherQuizId from './components/TeacherQuizId';
import axios from 'axios';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + user ;

  }
  

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
        <Route exact element={<TeacherQuizId/>}  path="/teacher/:teacherId/quiz/:quizId"/>
        <Route exact path="/student/:studentId/quiz/:quizId" element={<StudentQuiz/>}/>
   
      </Routes>
    </BrowserRouter>
  );
}

export default App;
