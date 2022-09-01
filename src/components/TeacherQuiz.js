import React, { useState, useEffect, Component } from 'react';
import Axios from 'axios';

import {ExportToExcel} from './ExportToExcel';
import EditQuizTeacher from './EditQuizTeacher';
import Nav from './Nav'
class TeacherQuiz extends Component{
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      isCorrect: '',
      attributeForm:[],
      allAnswers: [],
      numberOfAnswers: 0,
      quizId: 1,
      quiz: {},
      questions: [],
      questionNo: 0,
      listOfStudentsGrades: [],
      show: false
    }; 
    this.initAttributeForm = this.initAttributeForm.bind(this);

    Axios.get("http://localhost:8081/quiz/" + this.state.quizId).then( (response) => { 
      console.log(response);
      this.setState({quiz: response.data});
    });

    Axios.get("http://localhost:8081/question/all/" + this.state.quizId).then( (response) => { 
        console.log(response);
        this.setState({questions: response.data});
    });

    Axios.get("http://localhost:8081/score/all/" + this.state.quizId).then( (response) => { 
        console.log(response);
        this.setState({listOfStudentsGrades: response.data});
    });
  } 

  componentDidMount() {
    this.initAttributeForm();
 }

  addOrDeleteQuestion = () => {
    Axios.get("http://localhost:8081/quiz/" + this.state.quizId).then( (response) => { 
      console.log(response);
      this.setState({quiz: response.data});
    });

    Axios.get("http://localhost:8081/question/all/" + this.state.quizId).then( (response) => { 
        console.log(response);
        this.setState({questions: response.data});
    });
  }

    handleQuestionsChange = event => {
      this.setState({
        question: event.target.value
      })
    }

    handleAnswerChange = event => {
      console.log(event.target.id);
      var allAnswers = this.state.allAnswers;
      var all= allAnswers.map(element => {
        if(element.id == event.target.id) {
          return {id:element.id, answer:event.target.value, isCorrect:element.isCorrect}
        } else {
          return element;
        }
      })
      this.setState({
        answer: event.target.value,
        allAnswers: all
      })
    }

    handleCorrectChange = event => {
      console.log(event.target.id);
      var allAnswers = this.state.allAnswers;
      var all= allAnswers.map(element => {
        if(("c" + element.id) == event.target.id) {
          return {id:element.id, answer:element.answer, isCorrect:event.target.checked ? 1 : 0}
        } else {
          return element;
        }
      })
      this.setState({
        isCorrect: event.target.value,
        allAnswers: all
      })
    }

    handleSubmit = event => {
      alert(`${this.state.question}`)
      event.preventDefault()
    }

    initAttributeForm() {
      var array = [];
      var allAnswers = [];
      var numberOfAnswers = 0;

      array.push(
        <div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Answer</label>
          <div class="col-sm-3">
            <input  id={numberOfAnswers}
              name="text" class="form-control"
              onChange={this.handleAnswerChange} placeholder="Type here"/>
          </div>

        <div class="col-sm-2 col-form-label">
      <div class="form-check">
      <div class="col-sm-4">
        <input class="form-check-input" type="checkbox"
              id={"c" + numberOfAnswers}
              name="text"
              onChange={this.handleCorrectChange}/>
        <label class="form-check-label" for="exampleCheckbox">Check
        </label>
      </div>
      </div>
    </div>
        </div>
        </div>
      );

      allAnswers.push({id:numberOfAnswers, answer:"", isCorrect: 0});

      this.setState({
          attributeForm: array,
          numberOfAnswers : numberOfAnswers + 1,
          allAnswers: allAnswers
      });
    }

    addAttributeForm() {
      var array = this.state.attributeForm;
      var answer = this.state.answer;
      var isCorrect = this.state.isCorrect;

      var allAnswers = this.state.allAnswers;
      var numberOfAnswers = this.state.numberOfAnswers;
      array.push(
        <div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Answer</label>
          <div class="col-sm-3">
            <input  id={numberOfAnswers}
              name="text" class="form-control"
              onChange={this.handleAnswerChange} placeholder="Type here"/>
          </div>

        <div class="col-sm-2 col-form-label">
      <div class="form-check">
      <div class="col-sm-4">
        <input class="form-check-input" type="checkbox"
              id={"c" + numberOfAnswers}
              name="text"
              onChange={this.handleCorrectChange}/>
        <label class="form-check-label" for="exampleCheckbox">Check
        </label>
      </div>
      </div>
    </div>
        </div>
        </div>
      );

      allAnswers.push({id:numberOfAnswers, answer:"", isCorrect: 0});
  
      this.setState({
          attributeForm: array,
          correct: this.state.isCorrect,
          numberOfAnswers : numberOfAnswers + 1,
          allAnswers: allAnswers
      });
  }

  addQuestion = () => {
    let newQuiz = this.state.quiz;
    newQuiz.noQuestions = this.state.questions.length + 1
    this.setState({quiz : newQuiz})

		let newForm = {
      quiz: newQuiz,
      questionWithAnswers: {
        question: {
          quizId: this.state.quizId,
          question: this.state.question
        },
        answers: this.state.allAnswers
      }
    }    
		console.log(newForm);

    Axios.post("http://localhost:8081/question", newForm).then( (response) => {
        console.log("succes");
        console.log(response.data);
        this.addOrDeleteQuestion();
        this.setState({question: '', attributeForm: [], allAnswers: []});
        this.initAttributeForm();
      });

      //this.addOrDeleteQuestion();
  }

  deleteQuestion = (element) => {
    let newQuiz = this.state.quiz;
    newQuiz.noQuestions = this.state.questions.length - 1;
    this.setState({quiz : newQuiz})

		let newForm = newQuiz;

		console.log(newForm);

    Axios.delete("http://localhost:8081/question/" + element.question.id, {data: {quiz: newQuiz} }).then( (response) => {
        console.log("succes");
        console.log(response.data);
        this.addOrDeleteQuestion();
      });
      //this.addOrDeleteQuestion();
  }

  renderQuestion = (element, index) => {
    console.log(element)
   
    return <div className="title">

        <div className="titleQuestion"> 
        <div className="left-but"><h2>{index+1}) {element.question.question}</h2></div>
        <div className="btn-group right-but">
          {console.log(element.question.id)}
        <EditQuizTeacher questionId={element.question.id} refreshPage={() => this.addOrDeleteQuestion()}/>
           {/* <button type="button" className="btn btn-primary">Edit</button> */}
           {/* <a href="#" class="btn btn-primary a-btn-slide-text btn btn-outline-danger" onClick={() => this.deleteQuestion(element)}>
       <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
        <span><strong>Delete</strong></span>             */}
        <button variant="outline-danger" onClick={() => this.deleteQuestion(element)} >Delete</button>
   
            {/* <button type="button" className="btn btn-danger" onClick={() => this.deleteQuestion(element)}>Delete</button> */}
        </div>
        </div>
        
        <div>
        {
          element.answers.map( (e, i) => {

            return <div><ul className="list-group">
              {e.isCorrect ? <li  class="list-group-item ans">  {e.answer}  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg></li> : <li  class="list-group-item ans">  {e.answer}</li> }
            </ul>
                </div>

          })
        }
        </div>
      </div>
  }

  renderQuestionFinished = (element, index) => {
    console.log(element)
   
    return <div className="title">

        <div className="left-but"><h2>{index+1}) {element.question.question}</h2></div>
        <div className="btn-group right-but">
        
        </div>


        {
          element.answers.map( (e, i) => {

            return <div><ul className="list-group">
              {e.isCorrect ? <li  class="list-group-item ans">  {e.answer}  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg></li> : <li  class="list-group-item ans">  {e.answer}</li> }
            </ul>
                </div>

          })
        }
      </div>
  }

  displayByQuizStatus = (element) => {
    switch(element.status) {
      case 'active':
        return (   
        <div>
        <form onSubmit={this.handleSubmit}>
				<div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Question</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" value={this.state.question} 
						onChange={this.handleQuestionsChange} id="inputPassword" placeholder="Input of question"/>
          </div>
				</div>
        </div>
        <div>
              { 
                this.state.attributeForm.map(input => {
                    return input
                })
              }
              <div class="mt-2 col-md-12 ">
              <div class="mb-3 form-check" style={{ display: "flex" }}>
              
              {/* <button class="btn-sm" onClick={this.addAttributeForm.bind(this)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-middle" viewBox="0 0 16 16">
                  <path d="M6 13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v10zM1 8a.5.5 0 0 0 .5.5H6v-1H1.5A.5.5 0 0 0 1 8zm14 0a.5.5 0 0 1-.5.5H10v-1h4.5a.5.5 0 0 1 .5.5z"/>
                </svg>  ADD ANSWER</button> */}

{/* <button type="button" class="btn btn-warning btn-sm btn-lg"  onClick={this.addAttributeForm.bind(this)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-middle" viewBox="0 0 16 16">
                  <path d="M6 13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v10zM1 8a.5.5 0 0 0 .5.5H6v-1H1.5A.5.5 0 0 0 1 8zm14 0a.5.5 0 0 1-.5.5H10v-1h4.5a.5.5 0 0 1 .5.5z"/>
                </svg> Add <span class="glyphicon glyphicon-ok"></span></button> */}
                <button type="button" class="btn btn-dark"  style={{ marginRight: "auto" }} onClick={this.addAttributeForm.bind(this)}>Add</button>
              </div>
          </div>
          </div>
          <div class="mb-10 ml-100"  style={{ display: "flex" }}>
          {/* <button type="button" className="btn btn-warning btn-primary" onClick={this.addQuestion}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-middle" viewBox="0 0 16 16">
                  <path d="M6 13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v10zM1 8a.5.5 0 0 0 .5.5H6v-1H1.5A.5.5 0 0 0 1 8zm14 0a.5.5 0 0 1-.5.5H10v-1h4.5a.5.5 0 0 1 .5.5z"/>
                </svg> Add question!</button> */}
                <button type="button" class="btn btn-dark" style={{ marginRight: "auto" }} onClick={this.addQuestion}>Add question</button>
                
          </div>
      </form>

      {this.state.questions.map( (element, index) => {
        return (
          this.renderQuestion(element, index)
        );
      })}
      </div>
        );
        break;
      case 'expired':
        return (   
          <div>
           <ExportToExcel apiData={this.state.listOfStudentsGrades} fileName={"listOfStudentsGrades"} />
        {this.state.questions.map( (element, index) => {
          return (
            this.renderQuestionFinished(element, index)
          );
        })}
        </div>
          );
          break;
        break;
      default:
        return <p>DEFAULT</p>
    }
  }

  makeQuizVisible = () => {
    let newQuiz = this.state.quiz;
    newQuiz.isActive = 1;

    Axios.post("http://localhost:8081/quiz", {
      quiz: newQuiz
    }).then((response) => {
      
      console.log("succes");
      //alert("Quiz was posted!");
      console.log(response.data);
      Axios.get("http://localhost:8081/quiz/" + this.state.quizId).then( (response) => { 
      console.log(response);
      this.setState({quiz: response.data});
      });

      Axios.post("http://localhost:8081/mail/students/" + this.state.quizId).then((response) => {
      console.log("succes");
      //alert("Quiz was posted!");
      console.log(response.data);
      });
  
    });
  }

  renderQuizVisibilityButton = (element) => {
    if (element.isActive == 0) {
     return <div className='buttonVisible'>

  
           <button type="submit" class="
               w-full
               px-6
               py-2.5
               bg-green-700
               text-white
               font-medium
               text-xs
               leading-tight
               uppercase
               rounded
               shadow-md
               hover:bg-green-700 hover:shadow-lg
               focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
               active:bg-green-800 active:shadow-lg
               transition
               duration-150
               ease-in-out" onClick={this.makeQuizVisible}>make quiz visible</button>
              </div>

    }
  }
  render () {
    const { question, answer, isCorrect } = this.state;
  return (<>
    <Nav/>
    <div className='centerForm uploadTop'>

    <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
  <form>
   
    <div class="form-group mb-6">
      <input type="text" placeholder='Question' class="form-control
        block
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2"
      />
    </div>
    <div class="form-group mb-6">
     
      <div>
     
     <div class="flex flex-row ...">
     <input type="text" class="form-control block
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword2" placeholder='Answer'
     />   <div className="checkboxStyle">          <div class="form-check">
    
     <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" type="checkbox" value="" id="flexCheckDefault3"/>
   </div>
     </div>
  <div className='labelStyle'>   <label >check</label>
</div>
</div>

      </div>
 
   

    </div>
    <div class="flex justify-between items-center mb-6">
      
      <a href="#!"
        class="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Add answer</a>
    </div>
    <button type="submit" class="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Save</button>
   
  </form>
</div>
    </div>
    </>
  )
}}

export default TeacherQuiz