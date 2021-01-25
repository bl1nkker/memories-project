import { CREATE_POST, FETCH_POSTS, FETCH_POSTS_ERROR, CREATE_POST_ERROR, UPDATE_POST, UPDATE_POST_ERROR, GET_POST_TO_UPDATE, GET_POST_TO_UPDATE_ERROR, DELETE_POST, DELETE_POST_ERROR } from '../types'
import * as api from './../../api'

export const getPosts = () => async(dispatch) => {
    try{
        // Firstly we getting a response after calling to API (api.fetchPosts())
        // Then we destructuring it: response.data, to get data from response
        // Data represents the posts (in our project)
        const { data } = await api.fetchPosts();
        dispatch( { type: FETCH_POSTS, payload: { data:data }} )
    }
    catch (error) {
        dispatch( { type: FETCH_POSTS_ERROR, payload: { error:error }} )
    }
    
}

export const createPost = (newPost) => async (dispatch) =>{
    try{
        const { data } = await api.createPost(newPost)
        dispatch ({ type:CREATE_POST, payload: { data: data }})
    }
    catch (error) {
        dispatch ({ type: CREATE_POST_ERROR, payload: { error:error } })
    }
}

export const updatePost = (postId, updatedPost) => async (dispatch) =>{
    try{
        // Here data = res.json(updatedPost) (posts.js controller)
        const { data } = await api.updatePost(postId, updatedPost)
        dispatch ({ type:UPDATE_POST, payload: { updatedPost: data, postId: postId }})
    }
    catch (error) {
        dispatch ({ type: UPDATE_POST_ERROR, payload: { error:error } })
    }
}

export const getPostToUpdate = (post) => async (dispatch) =>{
    try{
        // Here we send SINGLE POST!!!
        dispatch ({ type:GET_POST_TO_UPDATE, payload: { postToUpdate: post }})
    }
    catch (error) {
        dispatch ({ type: GET_POST_TO_UPDATE_ERROR, payload: { error:error } })
    }
}

export const deletePost = (postId) => async (dispatch) =>{
    try{
        await api.deletePost(postId)
        dispatch ({ type: DELETE_POST, payload: { postId: postId }})
    }
    catch (error){
        dispatch ({ type: DELETE_POST_ERROR, payload: { error:error } })
    }
}

export const likePost = (postId) => async (dispatch) =>{
    try{
        // Here data = res.json(updatedPost) (posts.js controller)
        const { data } = await api.likePost(postId)
        dispatch ({ type:UPDATE_POST, payload: { updatedPost: data, postId: postId }})
    }
    catch (error) {
        dispatch ({ type: UPDATE_POST_ERROR, payload: { error:error } })
    }
}