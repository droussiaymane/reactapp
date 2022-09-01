import React from 'react'
import { useParams } from 'react-router';
import Nav from './Nav';
import TeacherQuizes from './TeacherQuizes';
const Teacher = () => {
    let params = useParams();

  return (
    <>
    <Nav/>
  <br></br><br></br>
    <TeacherQuizes/>

    </>
  )
}

export default Teacher