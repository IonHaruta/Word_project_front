import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new: false,

        }
    }
    componentDidMount(){
       if(window.location.pathname==="/new"){
           this.setState({
               new:true
           })
       }
    }
  render() {
    return (
      <>
        <div class="topnav">
          <Link className={this.state.new ? "active" : ""} to={"/new"}>New Word</Link>
          <Link className={this.state.new ? "" : "active"} to={"/"} >Get Definition</Link>
          <button className="logout_btn" onClick={
          ()=>{localStorage.removeItem("token");
          window.location.reload(false);
          }}>Log out</button>
        </div>
        {this.props.children}
      </>
    );
  }
}
