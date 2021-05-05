import React, { Component} from "react";
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/css/psw.css";
import datepicker from './datepicker.component'
class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      phone: "",
      dob: "",
    };
  }
  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };
  handlePasswordChange = (e) => {
    let p = e.target.value;
    let lower = document.getElementById("lower");
    let upper = document.getElementById("upper");
    let number = document.getElementById("number");
    let length = document.getElementById("length");
    let pwd = document.getElementById("password");
    if (/[a-z]/g.test(p)) {
      lower.classList.remove("invalid");
      lower.classList.add("valid");
    } else {
      lower.classList.add("invalid");
      lower.classList.remove("valid");
    }
    if (/[A-Z]/g.test(p)) {
        upper.classList.remove("invalid");
        upper.classList.add("valid");
      } else {
        upper.classList.add("invalid");
        upper.classList.remove("valid");
      }
      if (/\d/g.test(p)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
      } else {
        number.classList.add("invalid");
        number.classList.remove("valid");
      }
      if(pwd.value.length >= 8){
        length.classList.remove("invalid");
        length.classList.add("valid");
      } else {
        length.classList.add("invalid");
        length.classList.remove("valid");
      }

    this.setState({ password: e.target.value });
  };
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  handlePhoneChange = (e) => {
    this.setState({ phone: e.target.value });
  };
  handleDOB = e =>{

      this.setState({dob: e.target.value});
  };

  render() {
    return (
      <div className="container-fluid">
        <form className="form-group">
          <label className="col-md-3" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username "
            className="col-md-9 form-control"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />

          <label className="col-md-3" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="col-md-9 form-control"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <div id="message">
          <p id="lower">Co ky tu thuong</p>
          <p id="upper">Co ky tu hoa</p>
          <p id="number">Co chua so</p>
          <p id="length">Do dai lon hon 8</p>
        </div>
          
          <label className="col-md-3" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            className="col-md-9 form-control"
            value={this.state.phone}
            onChange={this.handlePhoneChange}
          />
          <label className="col-md-3" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            className="col-md-9 form-control"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        <datepicker/>
        </form>
      </div>
    );
  }
}

export default Form;
