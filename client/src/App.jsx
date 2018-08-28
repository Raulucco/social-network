import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";
import jwt_decode from "jwt-decode";
import { setAuthToken, setCurrentUser, logoutUser } from "./actions/auth";
import { clearProfile } from "./actions/profile";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

if (localStorage.jwt) {
  setAuthToken(localStorage.jwt);
  const user = jwt_decode(localStorage.jwt);
  store.dispatch(setCurrentUser(user));

  const currentTime = Date.now() / 1000;
  if (user.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearProfile());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
