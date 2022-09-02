import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router';
import Timer from '../helpers/Timer';
import Nav from './Nav';
function StudentQuiz({match}) {
  const [quizIsStarted, setQuizIsStarted] = useState(false);
  const [quiz, setQuiz] = useState({});
  let params = useParams();
  console.log(params);
  const [questions, setQuestions] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => { 
    if (timerExpired == true) {
      submitQuiz();
      setTimerExpired(false);
    }
  }, [timerExpired]);

  useEffect(() => { 
    Axios.get("http://localhost:8081/quiz/student/" + params.quizId + "?studentId=" + params.studentId).then( (response) => { 
      console.log(response);
      setQuiz(response.data);
      if (response.data.status == "completed") {
        setIsCompleted(true);
      }
    });

    Axios.get("http://localhost:8081/question/all/" + params.quizId).then( (response) => { 
        console.log(response);
        setQuestions(response.data);
        let x = response.data.map(element => {
          return {question: element.question, answers: element.answers.map(e => {
            return {...e, isChecked: false}
          })};
        })
        
        setAllAnswers(x);
        console.log(x)
    });
  }, [isCompleted]);

  const startQuiz = () => {
    setQuizIsStarted(true);
  }

  const submitQuiz = () => {
    let x = allAnswers.map(element => {
      return {question: element.question, answers: element.answers.filter(e => {
        console.log(e.isChecked)
        return e.isChecked;
      })};
    });
    setAllAnswers(x);
    console.log(x);

    Axios.post("http://localhost:8081/quiz/submit/" + params.quizId + "?studentId=" + params.studentId, x).then( (response) => {
        console.log("succes");
        console.log(response.data);
        setIsCompleted(true);
      });
  }

  const handleCheckboxChange = event => {
    console.log(event.target.id);
    let x = allAnswers.map(element => {
      return {question: element.question, answers: element.answers.map(e => {
        if (e.id == event.target.id) {
          let copyE = e;
          copyE.isChecked = event.target.checked;
          return copyE;
        } else return e;
      })};
    });
    setAllAnswers(x);
    console.log(allAnswers);
  }

  const renderQuestion = (element, index) => {
    //console.log(element)
    return <div className="title">
        <h2>{index+1}) {element.question.question}</h2>
        {
          element.answers.map( (e, i) => {
            return <div>

<div class="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 ">
  

    <div class="mt-2 answerPaddingBottom">
    <div className='answerPaddingBottom'>
        
        <div class="flex flex-row ...">
        <input  
                  name="text" 
                  value={e.answer}      type="text" class="form-control block
           w-full
           px-3
           py-1.5
           text-base
           font-normal
           text-gray-700
           bg-white bg-clip-padding
           border border-solid border-gray-300
           rounded
           transition
           ease-in-out
           m-0
           focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"  placeholder='Answer'
        />   <div className="checkboxStyle">          <div class="form-check">
       
        <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" type="checkbox" 
                  name="text"
                  value={e.answer} onChange={handleCheckboxChange} id={e.id} />
      </div>
        </div>
     <div className='labelStyle'>   <label >check</label>
    </div>
    </div>
    
         </div>
        </div>

   
</div>

         
            </div>


            
            
            
            
            
            
            
            
            
      
          })
        }
      </div>
  }

  const renderIfCompleted = () => {
    return <div>
      <div class="flex justify-center">
  <div class="block p-6 rounded-lg shadow-lg bg-white max-w-lg">
    <p class="text-gray-700 text-base mb-4">
    Quiz with id {quiz.id} completed with a score of {quiz.score} of {quiz.noQuestions}
    </p>
  </div>
</div>
    
    </div>
  }

  const renderIfNotCompleted = () => {
    return  <div>

<div class="flex justify-center">
  <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
    <p class="text-gray-700 text-base mb-4">
     Quiz with id {quiz.id} by teacher with id {quiz.teacherId}
    </p>
    
  </div>
  </div>
   
    {quizIsStarted ?
      (
        <div>
          <Timer hours={quiz.timerH} minutes={quiz.timerM} setTimerExpired={() => setTimerExpired(true)}/>
          {questions.map( (element, index) => {
            return (
              renderQuestion(element, index)
            );
          })}
          <div class="flex justify-center answerPadding">
  <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
 
    <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={submitQuiz}>Submit quiz!</button>
  </div>
</div>
        </div>
      ) : 
      (
        <div class="flex justify-center answerPadding">
        <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
       
        <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={startQuiz}>Start quiz!</button>
        </div>
</div>
      )
    }
  </div>

  }

    return (<>
    <div>
        <Nav/>
    </div>
      <div>
        {isCompleted ? renderIfCompleted() : renderIfNotCompleted()}
      </div>
      </>
    );
}
  
  export default StudentQuiz;
