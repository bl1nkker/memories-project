import { CREATE_POST_ERROR, FETCH_POSTS, FETCH_POSTS_ERROR, CREATE_POST,UPDATE_POST, UPDATE_POST_ERROR, GET_POST_TO_UPDATE, GET_POST_TO_UPDATE_ERROR, DELETE_POST, DELETE_POST_ERROR } from "../types"

export const postReducer = (state={}, action) =>
{
    // state={ data: [ {post_1}, {post_2}, {post_3} ] } !!!
    switch(action.type)
    {
        case (FETCH_POSTS):
            const updatedState = {...state, data: action.payload.data} 
            return updatedState
        case (FETCH_POSTS_ERROR):
            console.log(action.payload.error)
            return state
        
        case CREATE_POST:
            const newState = {...state, data: [...state.data, action.payload.data]} 
            return newState
        case CREATE_POST_ERROR:
            console.log(action.payload.error)
            return state
        
            // This cases also takes care about likes
        case UPDATE_POST:
            return {...state, data: state.data.map( (post) => post._id === action.payload.postId ? action.payload.updatedPost : post)} 
        case UPDATE_POST_ERROR:
            console.log(action.payload.error)
            return state

        case GET_POST_TO_UPDATE:
            return {...state, postToUpdate: action.payload.postToUpdate}
        case GET_POST_TO_UPDATE_ERROR:
            console.log(action.payload.error)
            return state

        case DELETE_POST:
            return {...state, data: state.data.filter( (post) => post._id !== action.payload.postId )}
        case DELETE_POST_ERROR:
            return state
            
        default:
            return state
    }
}