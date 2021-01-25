import React, { useState, useEffect } from 'react'

// Styling
import makeStyles from './../../styling/formStyling'
import { TextField, Button, Typography, Paper } from '@material-ui/core'

// It's need just for converting our images to string (Cool stuff!!!)
import FileBase from 'react-file-base64'

// Working with the redux actions
// This is actually mapDispatchToProps (React Hooks)
import { useDispatch, useSelector } from 'react-redux'
// We will use it to dispatch later
import { createPost, updatePost, getPostToUpdate } from './../../redux/actions/postsActions'


export default function Form() {
    const classes = makeStyles()
    const dispatch = useDispatch()

    // React Hook. It's component's states
    const [ postData, setPostData] = useState({creator: '', title:'', message:'', tags:'', selectedFile:''})

    // Get our target post to update (Not yet updated)
    let postToUpdate = useSelector( (state) => state.posts.postToUpdate )

    // useEffect takes 2 parameteres: what to do?, when to do?. In our case we dispatch some action (if statement)
    // when postToUpdate variable is updated
    useEffect( () =>{ if (postToUpdate) setPostData(postToUpdate) }, [postToUpdate])
    
    

    // Post Creator
    const createHandler = (event) =>{
        event.preventDefault();
        // if postToUpdate exist ==> it's edit mode
        if (postToUpdate) { dispatch(updatePost(postToUpdate._id, postData)) }
        // else it's not
        else{ dispatch(createPost(postData)) }

        clearForm()
    }

    const clearForm = () =>{

        // Without just putting postToUpdate=null, it won't refresh the current state in my ReduxStore, so without 
        // refreshing the page it won't work
        dispatch(getPostToUpdate(null))
        setPostData( {creator: '', title:'', message:'', tags:'', selectedFile:''} )
    }
    
    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={createHandler}>

                <Typography variant='h6'>{postToUpdate  ? 'Editing ' : 'Creating '} a Memory</Typography>
                    <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={ (event) => setPostData({...postData, creator: event.target.value})}></TextField>
                    <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={ (event) => setPostData({...postData, title: event.target.value})}></TextField>
                    <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={ (event) => setPostData({...postData, message: event.target.value})}></TextField>
                    <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={ (event) => setPostData({...postData, tags: event.target.value.split(',')})}></TextField>
                    <div className={classes.fileInput}><FileBase type='file' multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                    <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>{postToUpdate  ? 'Edit' : 'Submit'} </Button> 
                    <Button variant='contained' color='secondary' size='small' onClick={clearForm} fullWidth>Clear</Button> 

            </form>
        </Paper>
    )
}
