import { Component } from "react";
import {Redirect} from "react-router-dom";
import DefinitionItem from "../definition/DefinitionItem";

import Swal from 'sweetalert2'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      word: "",
      definitions: []
    }
  }

  componentDidMount = () => {
    this.setState({
      token: localStorage.getItem("token") || ""
    })
  }

  handleFieldChange(newValue){
    this.setState({
      word:newValue
    })
  }


  async getWord(word,token){
    if(!word){
      
      return;
    }
    await this.setState({
      definitions:[]
    })
    word = word.toLowerCase();
    const req = await fetch(`http://localhost:8080/word?word=${word}`, {
      method: 'GET',
      headers: {
        "Authorization":`Bearer ${token}`
      }
      
    });
    if(req.status===406){
      Swal.fire({
        title: 'Something is wrong!',
        text: "There is no such word in this dictionary!",
        icon: 'warning',
        confirmButtonColor: 'green',
        confirmButtonText: 'Try again'
      })
      await this.setState({
        definitions:[]
      })

      return;
    }
    const data = await req.json();
    const definitions = [];
    for(let [key, value] of Object.entries(data)) {
      // console.log(value.definition);
      definitions.push(value.definition);
    }
    this.setState({
      definitions:definitions
    })
    
  }

  render() {
    const token = this.state.token || localStorage.getItem("token");
    if (token == null || token === "") {
      return <Redirect to='/login'></Redirect>
    }

    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
            <input type="text" id="myWord" placeholder="Your word" onChange={(event)=>{
              this.handleFieldChange(event.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                  this.getWord(this.state.word, this.state.token);
              }
          }}/>  
        </div>
        <button  id="word-button" onClick={()=>{
          this.getWord(this.state.word,this.state.token)
        }}>Get definition</button>
        <div>
          {
          this.state.definitions.map((item,index)=>{
              return <DefinitionItem definition={item} key={index}/>
          })
          }
        </div>
    </div>
    );
  }
}
