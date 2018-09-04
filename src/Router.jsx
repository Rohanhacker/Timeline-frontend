import React, { Component } from "react"
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"
import { Login, Timeline } from "./Pages"

export default class Router extends Component {
  renderRoot = () => {
    const { user, onLogin, onLogout } = this.props
    if (user) {
      return <Timeline onLogout={onLogout} user={user} />
    }
    return <Login onLogin={onLogin} />
  }
  render() {
    const { onLogin, user } = this.props
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => this.renderRoot()} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
