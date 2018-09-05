import React from "react"
import styled from "styled-components"
import { Button } from "antd"
import TextareaAutosize from "react-autosize-textarea"

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, #f2709c, #ff9472);
  font-family: Helvetica;
  overflow: auto;
`

export const Wall = styled.div`
  width: 50%;
  margin: auto;
  background: white;
  margin-top: 20px;
  min-height: calc(100% - 62px);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  color: black;
`

export const StyledHeading = styled.h1`
  color: white;
  text-align: center;
`

export const PostBtn = styled(Button)`
  margin-top: 10px;
`

export const PostSection = styled.div`
  padding: 24px;
  border-bottom: 1px solid #f7ebec;
`

export const UserContainer = styled.div`
  display: flex;
  margin-bottom: 8;
`

export const UserName = styled.div`
  color: #365899;
  font-size: 1.2em;
  cursor: pointer;
  font-weight: bold;
`

export const ReplyContainer = styled.div`
  padding-top: 12px;
  padding-left: 8px;
`

export const TimeLeft = styled.div`
  font-size: 0.6em;
  color: gray;
`

export const Link = styled.a`
  font-size: 0.8em;
`

export const StyledTextArea = styled(TextareaAutosize)`
  border-radius: 4px;
  width: 100%;
  margin: auto;
  border-color: lightgrey;
  margin-top: 8px;
  padding: 4px;
  display: block;
`

export const FlexContainer = styled(Container)`
  display: flex;
`

export const FormContainer = styled.div`
  width: 224px;
  margin: auto;
  background: white;
  border-radius: 4px;
`

export const OrangeHeading = styled.h1`
  color: rgb(252, 139, 125);
`

export const LoginBtn = styled(Button)`
  width: 100%;
`
export const Header = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-evenly;
`
