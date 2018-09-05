import React, { Component } from "react"
import { Row, Col, Form, Icon, Input, Button, message } from "antd"
import styled from "styled-components"
import { getUser } from "../shared/api"
import { pick } from "../shared/helpers"
import {
  OrangeHeading,
  FormContainer,
  LoginBtn,
  FlexContainer,
} from "../shared/StyledElements"

const FormItem = Form.Item

const LoginForm = Form.create()(props => {
  const { handleSubmit, form } = props
  const { getFieldDecorator } = form
  return (
    <div
      style={{
        padding: 16,
      }}>
      <OrangeHeading>Login</OrangeHeading>
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
          const resp = await getUser(value.userId)
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
      <FlexContainer>
        <FormContainer>
          <LoginForm handleSubmit={this.handleLogin} />
        </FormContainer>
      </FlexContainer>
    )
  }
}
