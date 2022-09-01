import React from 'react'
import { useParams } from 'react-router';
import Nav from './Nav';
const Student = () => {
    let params = useParams();

  return (<>
    <Nav></Nav>
    <div>Student {params.studentId}</div>
    </>
  )
}

export default Student;