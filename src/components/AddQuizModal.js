import React, { Component, useState } from "react";
import Axios from 'axios';
import authService from "../services/auth.service";
import authHeader from "../services/auth-header";
import axios from "axios";
class AddQuizModal extends Component {


    constructor(props) {
        super(props)
      
        this.state = {
          teacherId: '',
          numberOfQuestions: '',
          isActive: '',       
          dueDate: '',
          showModal:false,
    
          //TIMER
          timerH: '',
          timerM: '',
          show: false,
        }
    
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
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
      }
    
      handlenumberOfQuestionsChange = event => {
        this.setState({
          numberOfQuestions: event.target.value
        })
      }
    
      handleStateChange = event => {
        this.setState({
          isActive: event.target.value
        })
      }
    
      handleDueDateChange = event => {
        this.setState({
          dueDate: event.target.value
        })
      }
    
      handleTimerHChange = event => {
        this.setState({
          timerH: event.target.value
        })
      }
    
      handleTimerMChange = event => {
        this.setState({
          timerM: event.target.value
        })
      }
    
      handleSubmit = event => {
        alert(`${this.state.numberOfQuestions} ${this.state.questions} ${this.state.answers}
                   ${this.state.teacherId} ${this.state.isActive}`)
        event.preventDefault()
      }
    
      addQuiz = () => {
        let newQuiz = {
          teacherId:authService.getCurrentUserId(),
          noQuestions: 0,
          isActive: 0,
          dueDate: this.state.dueDate,
          timerH: this.state.timerH,
          timerM: this.state.timerM
        }
        console.log(newQuiz);
        const user = JSON.parse(localStorage.getItem('user'));
        Axios.post("http://localhost:8081/quiz",newQuiz,{
          headers:{
            'Authorization': 'Bearer ' + user,
            
          }

          
        }).then((response) => {
          console.log("succes");
         
          console.log(response.data);
          this.props.setQuizAdded();
        });
        this.handleClose();
      }
      render() {
      
        const { numberOfQuestions, isActive, dueDate, timerH, timerM ,showModal} = this.state

        return <>
        <button
          className=" bg-green-600 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() =>  this.setState({
            showModal:true
          })}
        >
           Add new Quiz
        </button>
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
                    Add new quiz
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
                  <label>Due Date</label>   
      <input class="form-control block
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
        type="datetime-local"
                value={dueDate}
                onChange={this.handleDueDateChange}/>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="form-group mb-6">
    
        <input type="text" placeholder="Hours" class="form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
          aria-describedby="emailHelp123"  id="timer"
          value={timerH}
          onChange={this.handleTimerHChange}  />
      </div>
      <div class="form-group mb-6">
        <input type="text" class="form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
          aria-describedby="emailHelp124"   placeholder="Minutes"  id="timer"
          value={timerM}
          onChange={this.handleTimerMChange}/>
      </div>
    </div>
 
   
   
  
 
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
                      onClick={() => {this.setState({
                        showModal:false
                      });
                      this.addQuiz();}
                    }
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
    }  
  }
  
export default AddQuizModal