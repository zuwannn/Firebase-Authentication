import React, { Component } from "react";
import auth from "../firebase";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      message: "",
      currentUser: null,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user,
        });
      }
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.setState({
          currentUser: response.user,
        });
      })
      .catch((error) => {
        this.setState({
          message: error.message,
        });
      });
  };

  logout = (e) => {
    e.preventDefault();
    auth.signOut().then((response) => {
      this.setState({
        currentUser: null,
      });
    });
  };

 

  render() {
    const { message, currentUser } = this.state;

    if (currentUser) {
      return (
        <div>
          <div className="text-info">Hello {currentUser.email}</div>
          <button className="button is-large is-info" onClick={this.logout}>
            Logout
          </button>
        </div>
      );
    }

    return (
      <section className="section container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div class="notification">
              <button class="delete"></button>
              <strong>Email : </strong>test@example.com <br/>
              <strong>Password : </strong>123456
            </div>
            <div className="text-header">Login Form</div>
            <form onSubmit={this.onSubmit}>
                {/* email form */}
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="e.g. test@example.com "
                    onChange={this.onChange}
                  />
                </div>
              </div>
                {/* password form */}
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="******"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              {/* {message ? <p className="help is-danger">{message}</p> : null} */}
              {message ? (
                <p className="help is-danger">Email or Password is Wrong</p>
              ) : null}

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link">Submit</button>
                </div>
                <div className="control">
                  <button className="button is-link is-light">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginForm;
