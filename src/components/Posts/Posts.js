import React from 'react'
import PostSummary from './PostSummary'
import makeStyles from './../../styling/postsStyling'
import { Grid, CircularProgress } from '@material-ui/core'

// This is actually mapStateToProps (React Hooks)
import { useSelector } from 'react-redux'

export default function Posts() {

    // Fetching some data from redux store
    const posts = useSelector( (state) => state.posts.data )
    const classes = makeStyles()

    return (
        posts ?
        <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
            {posts.map( (post) => 
                <Grid key={post._id} item xs={12} sm={6}>
                    <PostSummary post={post}/>
                </Grid>)}
        </Grid>
        :
        // Just loading spinner
        <CircularProgress />
        
    )
}