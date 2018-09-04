import React, { Component } from "react"
import { Row, Col, Form, Icon, Input, Button, message } from "antd"
import styled from "styled-components"
import axios from "axios"

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to right, #f2709c, #ff9472);
  display: flex;
  font-family: Helvetica;
`

const FormContainer = styled.div`
  width: 224px;
  margin: auto;
  background: white;
  border-radius: 4px;
`

const StyledHeading = styled.h1`
  color: rgb(252, 139, 125);
`

const LoginBtn = styled(Button)`
  width: 100%;
`

const FormItem = Form.Item

const LoginForm = Form.create()(props => {
  const { handleSubmit, form } = props
  const { getFieldDecorator } = form
  return (
    <div
      style={{
        padding: 16,
      }}>
      <StyledHeading>Login</StyledHeading>
      <Form onSubmit={e => handleSubmit(e, form)} className="login-form">
        <FormItem>
          {getFieldDecorator("userId", {
            rules: [{ required: true, message: "Please input your user id!" }],
          })(<Input placeholder="User id" />)}
        </FormItem>
        <FormItem>
          <LoginBtn
            type="primary"
            htmlType="submit"
            className="login-form-button">
            Submit
          </LoginBtn>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    </div>
  )
})

export default class Login extends Component {
  handleLogin = (e, form) => {
    e.preventDefault()
    form.validateFields(async (err, value) => {
      if (!err) {
        try {
          const resp = await axios.get(`users/${value.userId}`)
          const user = pick(resp.data, ["id", "name"])
          this.props.onLogin(user)
        } catch (e) {
          message.error("enter correct user Id")
          console.log(e)
          // send to sentry
        }
      }
    })
  }
  render() {
    return (
      <Container>
        <FormContainer>
          <LoginForm handleSubmit={this.handleLogin} />
        </FormContainer>
      </Container>
    )
  }
}

function pick(obj, keys) {
  return keys
    .map(k => (k in obj ? { [k]: obj[k] } : {}))
    .reduce((res, o) => Object.assign(res, o), {})
}
