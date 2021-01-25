// Yeah i think... here we connect our ReactApp with our Backend Server. Cool!!!
// Main point in my app
import axios from 'axios'

// Backend Route (we set it up at the server-side)
// We will fetch/update/delete data
const url = 'https://bl1nk-memories.herokuapp.com/posts'

// Functions below used to send request to the server

// Here we fetch data using api (GET request)
export const fetchPosts = () => axios.get(url)
// Here we create data using api (POST request)
export const createPost = (newPost) => axios.post(url, newPost)
// Here we update data using api (PATCH request)
export const updatePost = (postId, updatedPost) => axios.patch(`${url}/${postId}`, updatedPost)
// Here we delete data using api (DELETE request)
export const deletePost = (postId) => axios.delete(`${url}/${postId}`)
// Here we adding likes using api (PATCH request)
export const likePost = (postId) => axios.patch(`${url}/${postId}/likePost`)