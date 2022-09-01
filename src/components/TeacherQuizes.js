import React, { useState, useEffect } from 'react';
import TeacherQuiz from './TeacherQuiz'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Axios from 'axios';
import authHeader from '../services/auth-header';
import AddQuizModal from './AddQuizModal';
const TeacherQuizes = () => {
  const [quizList, setQuizList] = useState([]);
  const [quizStatus, setQuizStatus] = useState("all");
  const [quizAdded, setQuizAdded] = useState(0);
  const [quizVisibility, setQuizVisibility] = useState(-1);
  let params = useParams();

  useEffect(() => { 
    Axios.get("http://localhost:8081/quiz/all/" + params.teacherId,{
      headers:authHeader()
    }).then( (response) => { 
      console.log(response);
      let newQuizList = [];
      if (quizStatus == "all") {
        newQuizList = response.data;
      } else {
          newQuizList = response.data.filter((element, index) => {
            return quizStatus == element.status;  
          });
      }

      if (quizVisibility == -1) {
        setQuizList(newQuizList);
      } else {
        setQuizList(newQuizList.filter((element, index) => {
          return quizVisibility == element.isActive;  
        }));
      } 
    });
  }, [quizStatus, quizVisibility, quizAdded]);

  const getStatus = (element) => {
    switch(element.status) {
      case 'active':
        return<a href={"http://localhost:3000/teacher/" + params.teacherId + "/quiz/" + element.id}
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
      Quiz {element.id} {element.isActive ? 'is visible' : 'is not visible'} active until {element.dueDate};
      </a>
       
        break;
      case 'expired':
        return <a href={"http://localhost:3000/teacher/" + params.teacherId + "/quiz/" + element.id}
        class="
          block
          px-6
          py-2
          bg-orange-200
          border-b border-gray-200
          w-full
          
          transition
          duration-500
          cursor-pointer
        "
      >
          Quiz {element.id} {element.isActive ? 'is visible' : 'is not visible'} finished on {element.dueDate}
      </a>

      
        break;
      default:
        return <a href={"http://localhost:3000/teacher/" + params.teacherId + "/quiz/" + element.id}
        class="
          block
          px-6
          py-2
          border-b border-gray-200
          w-full
          hover:bg-gray-100 hover:text-gray-500
          focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
          transition
          duration-500
          cursor-pointer
        "
      >
Quiz {element.id} {element.isActive ? 'is visible' : 'is not visible'} without status      </a>
   
    }
  }

  const handleSelectedStatusChange = (e) => {
    console.log(e.target.value);
    setQuizStatus(e.target.value);
  }

  const handleSelectedVisibilityChange = (e) => {
    console.log(e.target.value);
    setQuizVisibility(e.target.value);
  }
  return (<>
 
 <div className="grid place-items-center -screen">
 <Link to="/upload" className='paddingBottomButton'><button className="px-10 py-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
       Go to upload page
    </button></Link>
    <div class="flex justify-center">
  <div class="mb-3 xl:w-96">
    <select onChange={e => handleSelectedStatusChange(e)}  class="form-select appearance-none
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
          <option value="expired">FINISHED</option>
    </select>
  </div>
</div>
<div class="flex justify-center">
  <div class="mb-3 xl:w-96">
    <select onChange={e => handleSelectedVisibilityChange(e)}  class="form-select appearance-none
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
  <option value={-1}>All visibility</option>
          <option value={1}>VISIBLE</option>
          <option value={0}>NOT VISIBLE</option>
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
    Your Quizes
    </a>
    {quizList.map( (element, index) => {
            return (
              getStatus(element)
            );
          })}
  
 
  </div>
</div>
<div className='uploadTop'>


<AddQuizModal setQuizAdded={() => setQuizAdded(quizAdded+1)}/>
    </div>
    </div>
    </>
  )
}

export default TeacherQuizes