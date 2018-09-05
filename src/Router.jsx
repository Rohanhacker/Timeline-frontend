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
  renderTimeline = ({ match }) => {
    const { user, onLogout } = this.props
    if (!this.props.user) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      )
    }
    return (
      <Timeline onLogout={onLogout} friendId={match.params.id} user={user} />
    )
  }
  render() {
    const { onLogout, onLogin, user } = this.props
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={this.renderRoot} />
            <Route exact path="/:id" render={this.renderTimeline} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
