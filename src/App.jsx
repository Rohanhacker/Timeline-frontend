import React, { PureComponent } from "react"
import { hot } from "react-hot-loader"
import axios from "axios"
import Router from "./Router"

const env = process.env.APP_ENV
axios.defaults.baseURL =
  env === "production"
    ? "https://fbrohan.herokuapp.com"
    : "http://localhost:5000"
axios.defaults.withCredentials = true
axios.defaults.headers.common["Accept"] = "application/json"

class App extends PureComponent {
  getUser = () => {
    const user = localStorage.getItem("user")
    if (user) return JSON.parse(user)
    return null
  }
  state = {
    user: this.getUser(),
  }
  setUser = user => {
    localStorage.setItem("user", JSON.stringify(user))
  }
  onLogin = async user => {
    this.setState(
      {
        user,
      },
      () => {
        localStorage.setItem("user", JSON.stringify(user))
      }
    )
  }
  onLogout = () => {
    this.setState(
      {
        user: null,
      },
      () => {
        localStorage.removeItem("user")
      }
    )
  }
  render() {
    return (
      <Router
        user={this.state.user}
        onLogin={this.onLogin}
        onLogout={this.onLogout}
      />
    )
  }
}

export default hot(module)(App)
