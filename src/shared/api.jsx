import axios from "axios"

export const getUserPosts = async id => {
  return await axios.get(`posts/${id}`)
}

export const postMsg = async message => {
  return await axios.post("posts", message)
}

export const postComment = async message => {
  return await axios.post("comments", message)
}

export const getUser = async id => {
  return await axios.get(`users/${id}`)
}
