import React, { Component } from 'react'
import Navbar from '../navbar/Navbar'
import DefinitionItem from '../definition/DefinitionItem';
import "./NewWord.css";
import Swal from 'sweetalert2'
import { Redirect } from 'react-router-dom';


export default class NewWord extends Component {
    constructor(props){
        super(props);
        this.state = {
            token: "",
            newWord : "",
            newDefinition : ""
        }
    }

    componentDidMount = () => {
        this.setState({
          token: localStorage.getItem("token") || ""
        })
      }

    handleFieldChange = (field, newValue) => {
        this.setState({
          [field]: newValue
        })
      }

      async addWord(newWord,newDefinition, token){
          newWord = newWord.toLowerCase();
        if (newDefinition === "" || newWord === "") {
            Swal.fire({
              title: 'Something is wrong!',
              text: "Fill the inputs!",
              icon: 'warning',
              confirmButtonColor: 'green',
              confirmButtonText: 'Try again'
            })
            return;
          }
        if(!/^[a-zA-Z]*$/g.test(newWord)){
            Swal.fire({
                title: 'Something is wrong!',
                text: "Letters only!",
                icon: 'warning',
                confirmButtonColor: 'green',
                confirmButtonText: 'Try again'
              })
              return;
        }

        const req = await fetch("http://localhost:8080/word", {
            method: "POST",
            body: JSON.stringify({
                "word": newWord,
                "definition": newDefinition
            }),
            headers: {
              'Content-Type': 'application/json',
              "Authorization":`Bearer ${token}`
            }
        })
        if(req.status===200){
            Swal.fire({
                title: 'Success!',
                text: "New word added!",
                icon: 'success',
                confirmButtonColor: 'green',
                confirmButtonText: 'OK'
              })
        }
      }

  render() {
    const token =this.state.token || localStorage.getItem("token");
    if (token == null || token === "") {
      return <Redirect to='/login'></Redirect>
    }
    return (
      <Navbar>
          <div className="wrapper fadeInDown">
        <div id="formContent">
            <input type="text" id="newWord" placeholder="New word" onChange={(event)=>{
              this.handleFieldChange("newWord",event.target.value);
            }}
            />
            </div>
            <div id="formContent" className='newDef'>
            <input type="text" placeholder="New definition" onChange={(event)=>{
              this.handleFieldChange("newDefinition",event.target.value);
            }}
            /> 
        </div>
        
        <button  id="word-button" onClick={()=>{this.addWord(this.state.newWord,this.state.newDefinition, this.state.token)}}>Add definition</button>
        

    </div>
      </Navbar>
    )
  }
}
