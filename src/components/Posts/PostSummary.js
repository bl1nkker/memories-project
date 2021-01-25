import makeStyles from './../../styling/postSummaryStyling'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp'; 
import EditIcon from '@material-ui/icons/Edit';

import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getPostToUpdate, deletePost, likePost } from './../../redux/actions/postsActions'

export default function PostSummary(props) {
    
    const classes = makeStyles()
    const post = props.post

    // post = {"tags":["#minecd"],
    //         "likeCount":0,
    //          "createdAt":"2021-01-22T08:34:10.950Z",
    //          "_id":"600a98dcb6628b55d48197f6",
    //          "creator":"Daniyar",
    //          "title":"New Post",
    //          "message":"Some message",
    //          "selectedFile":"",
    //          "__v":0}

    const dispatch = useDispatch()

    const editHandler = () =>{
        dispatch(getPostToUpdate(post))
    }

    const deleteHandler = () =>{
        dispatch(deletePost(post._id))
    }
    
    const likeHandler = () =>{
        dispatch(likePost(post._id))
    }
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>

            <div className={classes.overlay2}>
                <Button style={{color:'white'}} size='small' onClick={editHandler}>
                    <EditIcon fontSize='default' />
                </Button>
            </div>

            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map( (tag) => `#${tag} ` )}</Typography>
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography color='textSecondary' component='p' variant='body2'>{post.message}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={likeHandler}>
                    <ThumbUpIcon fontSize='small' />
                    Like {post.likeCount}
                </Button>
                <Button size='small' color='primary' onClick={deleteHandler}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
            </CardActions>
            
        </Card>
    )
}

