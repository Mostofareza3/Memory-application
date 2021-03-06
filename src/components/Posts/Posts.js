import React from 'react';
import Post from './Post/Post';
import useStyle from './styles';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';


const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts)
    const classes = useStyle();

    // console.log(posts)
    return (


        !posts.length ? <CircularProgress /> : (

            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post)=>(
                        <Grid item key={post._id} xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))
                }

            </Grid>

        )


    );
};

export default Posts;