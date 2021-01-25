import React, {useEffect} from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from './redux/actions/postsActions'

import memories from './imports/images/homeImage.png'
import makeStyles from './styles'

import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'

const App = () =>
{
    const classes = makeStyles();
    const dispatch = useDispatch()
    let postToUpdate = useSelector( (state) => state.posts.postToUpdate )
    // let posts = useSelector( (state) => state.posts)

    // Here we fetch data
    useEffect( () => {
        dispatch(getPosts())
    }, [postToUpdate, dispatch])
    return(
        <Container maxsidth='lg'>
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt='memories' height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify='space-between' alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App