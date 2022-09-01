import React from 'react'
import { useParams } from "react-router-dom";
import TeacherQuiz from './TeacherQuiz';
const TeacherQuizId = () => {
    const {quizId}=useParams();
  return (<>
    <TeacherQuiz quizId={quizId}/>
    </>
  )
}

export default TeacherQuizId