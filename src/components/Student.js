import React from 'react'
import { useParams } from 'react-router';
import Nav from './Nav';
import StudentQuizes from './StudentQuizes';
const Student = () => {
    let params = useParams();

  return (<>
    <Nav></Nav>
    <StudentQuizes/>
    </>
  )
}

export default Student;