import React, { Component } from "react"
import { Button, message } from "antd"
import { ActionCable, ActionCableProvider } from "react-actioncable-provider"
import { getFormattedDate } from "../shared/helpers"
import {
  Container,
  Wall,
  StyledHeading,
  StyledTextArea,
  PostBtn,
  PostSection,
  UserContainer,
  UserName,
  TimeLeft,
  Link,
  ReplyContainer,
  Header,
} from "../shared/StyledElements"
import * as api from "../shared/api"

const env = process.env.APP_ENV
const socketUrl =
  env === "production"
    ? "wss:fbrohan.herokuapp.com/cable"
    : "ws:localhost:5000/cable"

export default class Timeline extends Component {
  state = {
    postText: "",
    commentText: {},
    posts: [],
  }
  handleInput = e => {
    this.setState({
      postText: e.target.value,
    })
  }
  handleCommentInput = (e, postId) => {
    const { commentText } = this.state
    this.setState({
      commentText: { ...commentText, [postId]: e.target.value },
    })
  }
  async componentDidMount() {
    const { user, friendId } = this.props
    this.timeout = setInterval(
      () =>
        this.setState({
          time: Date.now(),
        }),
      1000
    )
    if (!user) return
    const resp = await api.getUserPosts(friendId || user.id)
    const posts = resp.data
    this.setState({
      posts,
    })
  }
  componentWillUnmount() {
    clearInterval(this.timeout)
  }
  sendPost = async () => {
    const { user, friendId } = this.props
    const { postText, posts } = this.state
    if (!postText) return
    const resp = await api.postMsg({
      message: this.state.postText,
      user_id: user.id,
      recipient_id: friendId || user.id,
    })
    const newPost = resp.data
    this.setState({
      postText: "",
      posts: [newPost, ...posts],
    })
  }
  sendComment = async (e, postId) => {
    const { user } = this.props
    let { commentText, posts } = this.state
    if (!commentText[postId]) return
    const commentPostIndex = posts.findIndex(elem => elem.id === postId)
    const resp = await api.postComment({
      message: commentText[postId],
      user_id: user.id,
      post_id: postId,
    })
    const commentPost = posts[commentPostIndex]
    posts[commentPostIndex] = {
      ...commentPost,
      comments: [resp.data, ...commentPost.comments],
    }
    this.setState({
      commentText: {
        ...commentText,
        [postId]: "",
      },
      posts,
    })
  }
  getEnterHandler = (onEnter, ...args) => {
    return function(e, ...newArgs) {
      if (!e.shiftKey && e.key === "Enter") {
        e.preventDefault()
        e.stopPropagation()
        onEnter(e, ...args, ...newArgs)
      }
    }
  }
  createPost = post => {
    const { posts } = this.state
    this.setState({
      posts: [post, ...posts],
    })
  }

  createComment = comment => {
    const { posts } = this.state
    const commentPostIndex = posts.findIndex(
      elem => elem.id === comment.post_id
    )
    const newPost = posts[commentPostIndex]
    posts[commentPostIndex] = {
      ...newPost,
      comments: [comment, ...newPost.comments],
    }
    this.setState({
      posts,
    })
  }

  onReceived = data => {
    const { user } = this.props
    if (data.payload.user.id === user.id) return
    if (data.type === "ADD_POST") {
      this.createPost(data.payload)
    } else if (data.type === "ADD_COMMENT") {
      this.createComment(data.payload)
    }
  }
  render() {
    const { commentText, postText, posts } = this.state
    const { friendId, user, onLogout } = this.props
    const friendTimeline = friendId && friendId !== user.id
    const repliesDOM = replies =>
      replies.map(reply => (
        <ReplyContainer key={reply.id}>
          <UserContainer>
            <img
              style={{
                height: 32,
              }}
              src="https://image.ibb.co/mbvWaK/avatar.png"
            />
            <div
              style={{
                marginLeft: 8,
              }}>
              <UserName>{reply.user.name}</UserName>
              <TimeLeft>{getFormattedDate(reply.created_at)}</TimeLeft>
            </div>
          </UserContainer>
          {reply.message}
        </ReplyContainer>
      ))
    const postDOM = posts.map(post => {
      return (
        <PostSection key={post.id}>
          <UserContainer>
            <img
              style={{
                height: 32,
              }}
              src="https://cdn.iconscout.com/icon/free/png-128/avatar-375-456327.png"
            />
            <div
              style={{
                marginLeft: 8,
              }}>
              <UserName>{post.user.name}</UserName>
              <TimeLeft>{getFormattedDate(post.created_at)}</TimeLeft>
            </div>
          </UserContainer>
          {post.message}
          <div>
            <Link>Comment </Link>
          </div>
          <StyledTextArea
            rows={1}
            placeholder="comment here.."
            value={commentText[post.id]}
            onKeyDown={this.getEnterHandler(this.sendComment, post.id)}
            onChange={e => this.handleCommentInput(e, post.id)}
          />
          {repliesDOM(post.comments)}
        </PostSection>
      )
    })
    return (
      <ActionCableProvider url={socketUrl}>
        <ActionCable
          ref="roomChannel"
          onReceived={this.onReceived}
          channel={{
            channel: "RoomChannel",
            id: friendId || user.id,
          }}>
          <Container>
            <Header>
              <StyledHeading>
                {friendTimeline ? "Friend's Timeline" : "My timeline"}
              </StyledHeading>
              <Button onClick={onLogout}>Logout</Button>
            </Header>
            <Wall>
              <PostSection>
                <StyledTextArea
                  rows={4}
                  value={postText}
                  placeholder="Write something here.."
                  onKeyDown={this.getEnterHandler(this.sendPost)}
                  onChange={this.handleInput}
                />
              </PostSection>
              <div>{postDOM}</div>
            </Wall>
          </Container>
        </ActionCable>
      </ActionCableProvider>
    )
  }
}
