import React, { Component, useState } from "react";
import Axios from 'axios';

class EditQuizTeacher extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      editQuestion: {},
      answerList: [],
      originalQuestion: {},
      originalAnswerList: [],
      showModal:false,
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSave = this.handleSave.bind(this);

    console.log(props)
    Axios.get("http://localhost:8081/question/" + this.props.questionId).then( (response) => { 
        console.log(response);
        this.setState({editQuestion: response.data, originalQuestion: response.data});
    });

    Axios.get("http://localhost:8081/answer/all/" + this.props.questionId).then( (response) => { 
        console.log(response);
        this.setState({answerList: response.data, originalAnswerList: response.data});
    });
  }

  updateQuestionAndAnswers() {
    Axios.get("http://localhost:8081/question/" + this.props.questionId).then( (response) => { 
        console.log(response);
        this.setState({editQuestion: response.data, originalQuestion: response.data});
    });

    Axios.get("http://localhost:8081/answer/all/" + this.props.questionId).then( (response) => { 
        console.log(response);
        this.setState({answerList: response.data, originalAnswerList: response.data});
    });
  }

  handleShow() {
    this.setState({
      show: true
    })
  }

  handleClose() {
    this.setState({
      show: false
    })
    this.setState({editQuestion: this.state.originalQuestion, answerList: this.state.originalAnswerList});
    console.log(this.state.editQuestion);
    console.log(this.state.answerList);
  }

  handleSave() {
    this.setState({
        show: false
      })
      console.log(this.state.editQuestion);
    console.log(this.state.answerList);
      let newForm = {
        question: this.state.editQuestion,
        answers: this.state.answerList
      }    
      console.log(newForm);
  
      Axios.put("http://localhost:8081/question/" + this.props.questionId, newForm).then( (response) => {
          console.log("succes");
          console.log(response.data);
          this.updateQuestionAndAnswers();
          this.props.refreshPage();
        });
  }

  deleteAnswer(e) {
    var allAnswers = this.state.answerList;
    var all= allAnswers.map(element => {
      if(element.id == e.id) {
        return null;
      } else {
        return element;
      }
    }).filter(e => e != null)
    this.setState({
      answerList: all
    })
  }

  handleQuestionChange = event => {
    let questionCopy = this.state.editQuestion;
    questionCopy.question = event.target.value;
    this.setState({
      editQuestion: questionCopy
    })
  }

  handleAnswerChange = event => {
    console.log(event.target.id);
    var allAnswers = this.state.answerList;
    var all= allAnswers.map(element => {
      if(element.id == event.target.id) {
        return {id:element.id, answer:event.target.value, isCorrect:element.isCorrect}
      } else {
        return element;
      }
    })
    this.setState({
      answer: event.target.value,
      answerList: all
    })
  }

  handleCorrectChange = event => {
    console.log(event.target.id);
    var allAnswers = this.state.answerList;
    var all= allAnswers.map(element => {
      if(("c" + element.id) == event.target.id) {
        return {id:element.id, answer:element.answer, isCorrect:event.target.checked ? 1 : 0}
      } else {
        return element;
      }
    })
    this.setState({
      isCorrect: event.target.value,
      answerList: all
    })
  }

  render() {
    const { numberOfQuestions, isActive, dueDate, timerH, timerM ,showModal} = this.state
    return (
      <>
  

<button onClick={() => this.setState({
          showModal:true
        })} type="button" class="inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Edit</button>


    
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                  Edit question
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => this.setState({
                      showModal:false
                    })}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}


                <div className="relative p-6 flex-auto">
                  <div class="block p-6 rounded-lg shadow-lg bg-white max-w-md">
                  <div class="form-group mb-6">
                  
<div class="form-group mb-6">
  <label>Question : </label>
<input  type="text" value={this.state.editQuestion.question} onChange={this.handleQuestionChange} placeholder='Question' class="form-control
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
    </div>


    {this.state.answerList.map((e, index) => {
      return  (
      <div class="form-group row">

    <div class="grid grid-cols-1 gap-4">
    <div class="flex flex-row ...">
      
<label className="answerPadding">Answer </label>
<input  id={e.id}
              type="text" value={e.answer} onChange={this.handleAnswerChange} class="form-control block
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



{e.isCorrect ? 
<input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" type="checkbox"  
    name="text"    id={"c" + e.id}
    onChange={this.handleCorrectChange} checked />
              :
             
<input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" type="checkbox"  
    name="text"    id={"c" + e.id}
    onChange={this.handleCorrectChange}  />
          }



</div>
</div>
<div className='labelStyle'>   <label >check</label>
</div>
</div>
    </div>
 
   
         
    <button onClick={() => this.deleteAnswer(e)} type="button" class="w-full inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-normal uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
    Delete
</button>
      </div>
      )
    })}
</div>
   
  
 
</div>





















 
















                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => this.setState({
                      showModal:false
                    })}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      this.setState({
                      showModal:false
                    });
                  this.handleSave();
                  }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}






     
      
      </>
    );    //return

  }   //render
}

export default EditQuizTeacher;