import { Component } from "react";
import "./Login.css";
import {Link, Redirect} from 'react-router-dom';
import Swal from 'sweetalert2'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      token: ""
    }
  }

  handleFieldChange = (field, newValue) => {
    this.setState({
      [field]: newValue
    })
  }

  async login(email, password) {
    if (email === "" || password === "") {
      Swal.fire({
        title: 'Something is wrong!',
        text: "Fill the inputs!",
        icon: 'warning',
        confirmButtonColor: 'green',
        confirmButtonText: 'Try again'
      })
      return;
    }

    if(!email.includes('@')){
      Swal.fire({
        title: 'Something is wrong!',
        text: "You need to insert an existent email!",
        icon: 'warning',
        confirmButtonColor: 'green',
        confirmButtonText: 'Try again'
      })
      return;
    }

    const req = await fetch("http://localhost:8080/auth/login", {
      method: 'POST',
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (req.status === 403) {
      Swal.fire({
        title: 'Something is wrong!',
        text: "Wrong password or username!",
        icon: 'warning',
        confirmButtonColor: 'green',
        confirmButtonText: 'Try again'
      })
    } else {
      const data = await req.json();
      localStorage.setItem("token", data.token);
      await this.setState({token: data.token})
    }
  }

  render() {
    const token = this.state.token || localStorage.getItem("token");

    if (token != null || token === undefined) {
      return <Redirect to='/'></Redirect>
    }

    return (
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h2 className="active"><Link to='/login'>Sign In</Link></h2>
            <h2 className="inactive underlineHover"><Link to='/signUp'>Sign Up</Link></h2>

            <form>
              <input
                type="email"
                id="login"
                className="fadeIn second"
                name="login"
                placeholder="Email"
                value={this.state.email}
                onChange={(event) => {
                  this.handleFieldChange("email", event.target.value)
                }}
              />
              <input
                type="password"
                id="password"
                className="fadeIn third"
                name="login"
                placeholder="Password"
                value={this.state.password}
                onChange={(event) => {
                  this.handleFieldChange("password", event.target.value)
                }}
              />
              
            </form>
            <button onClick={() => this.login(this.state.email, this.state.password)} className="fadeIn fourth">Log In</button>
          </div>
        </div>
    );
  }
}

export default Login;
