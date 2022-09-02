import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const StudentQuizes = (props) => {
  const [quizList, setQuizList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherId, setTeacherId] = useState(0);
  const [quizStatus, setQuizStatus] = useState("all");
  let params = useParams();
  console.log(params);

  useEffect(() => { 
    let urlForAllQuizzes = "http://localhost:8081/quiz/all/active";
    console.log(teacherId);
    if (teacherId != 0) {
      urlForAllQuizzes += "/" + teacherId;
    }
    urlForAllQuizzes += "?studentId=" + params.studentId;
    Axios.get(urlForAllQuizzes).then( (response) => { 
      console.log(response);
      if (quizStatus == "all") {
        setQuizList(response.data);
      } else {
          setQuizList(response.data.filter((element, index) => {
            return quizStatus == element.status;  
          }));
      }
    });
  }, [teacherId, quizStatus]);

  // Doar o singura data e apelata
  useEffect(() => {
    Axios.get("http://localhost:8081/teacher/all").then( (response) => { 
      console.log(response);
      setTeacherList(response.data);
    });
  }, []);

  const handleSelectedTeacherChange = (e) => {
    console.log(e.target.value);
    setTeacherId(e.target.value);
  }

  const handleSelectedStatusChange = (e) => {
    console.log(e.target.value);
    setQuizStatus(e.target.value);
  }

  const getTeacherName = (id) => {
    for (let teacher of teacherList) {
      if (id == teacher.id)
        return teacher.name;
    }
    return null;
  }

  const getStatus = (element) => {
    switch(element.status) {
      case 'active':
        return  <a href={"http://localhost:3000/student/" + params.studentId + "/quiz/" + element.id}
        class="
        block
        px-6
        py-2
        bg-green-200
        border-b border-gray-200
        w-full
        
        transition
        duration-500
        cursor-pointer
        "
      >
 Quiz {element.id} created by teacher {getTeacherName(element.teacherId)} active until {element.dueDate};
      </a>
        
     
        break;
      case 'expired':
        return     <a href={"http://localhost:3000/student/" + params.studentId + "/quiz/" + element.id}
        class="
        block
        px-6
        py-2
        bg-red-200
        border-b border-gray-200
        w-full
        
        transition
        duration-500
        cursor-pointer
        "
      >
Quiz {element.id} created by teacher {getTeacherName(element.teacherId)} expired on {element.dueDate}      </a>
          

        break;
      case 'completed':
        return <a href={"http://localhost:3000/student/" + params.studentId + "/quiz/" + element.id}
        class="
        block
        px-6
        py-2
        bg-blue-200
        border-b border-gray-200
        w-full
        
        transition
        duration-500
        cursor-pointer
        "
      >
          Quiz {element.id} created by teacher {getTeacherName(element.teacherId)} completed with a score of {element.score} out of {element.noQuestions}
        </a>
        break;  
      default:
        return<a href={"http://localhost:3000/student/" + params.studentId + "/quiz/" + element.id}
        class="
        block
        px-6
        py-2
        bg-blue-200
        border-b border-gray-200
        w-full
        
        transition
        duration-500
        cursor-pointer
        "
      >
          Quiz {element.id} created by teacher {getTeacherName(element.teacherId)} without status
        </a> 
    }
  }
  return (
    <>
     <div className="grid place-items-center -screen">
 <Link to={{
          pathname: "/upload/",
          state: {
            ownerId: params.studentId,
            ownerRole: "student"
          }
        }} className='paddingBottomButton uploadTop'><button className="px-10 py-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
       Go to upload page
    </button></Link>
    <div class="flex justify-center">
  <div class="mb-3 xl:w-96">
    <select  onChange={e => handleSelectedTeacherChange(e)} class="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
       
        <option value="0">All status</option>
        {teacherList.map( (element, index) => {
            return (
              <option value={element.id}>{element.name}</option>
            );
          })}
    </select>
  </div>
</div>
<div class="flex justify-center">
  <div class="mb-3 xl:w-96">
    <select onChange={e => handleSelectedStatusChange(e)}   class="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
  <option value="all">All status</option>
          <option value="active">ACTIVE</option>
          <option value="expired">EXPIRED</option>
          <option value="completed">COMPLETED</option>
    </select>
  </div>
</div>
    <div class="flex justify-center">
      
  <div class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
    
    <a
      
      aria-current="true"
      class="
        block
        px-6
        py-2
        border-b border-gray-200
        w-full
        rounded-t-lg
        bg-blue-600
        text-white
        cursor-pointer
      "
     >
     Quizes
    </a>
    {quizList.map( (element, index) => {
            return (
              getStatus(element)
            );
          })}
  
 
  </div>
</div>
<div className='uploadTop'>



    </div>
    </div>
    
    
    </>
  )
}

export default StudentQuizes