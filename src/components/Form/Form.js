import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyle from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../action/posts';
import { useHistory } from 'react-router-dom';


const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    //fetching the specific from redux 
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    // getting current user from the local localStorage;
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    useEffect(() => {
        if (post) {
            setPostData(post)
        }
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentId) {
            // here name referred the current user and it comes from local storage.
            dispatch(createPost({ ...postData, name: user?.result?.name },history));
            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }
      

    };
    // if user not logIN, he can't do like, post, or create anything,
    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h5" text="center">
                    You can't do this. Please login first. Thank you.
                </Typography>
            </Paper>
        )
    }
    const clear = () => {
        setCurrentId(0);
        setPostData({
            title: '', message: '', tags: '', selectedFile: '',
        })


    }
    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate classes={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography text="center" variant='h6'>{!currentId ? 'Create a new' : 'Edit'} Memory</Typography>

                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    className={classes.fileInput}
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    multiline 
                    rows={4}
                    className={classes.fileInput}
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    className={classes.fileInput}
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        className={classes.fileInput}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />

                </div>

                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth >
                    SUBMIT
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth
                    onClick={clear}
                >
                    CLEAR
                </Button>
            </form>
        </Paper>
    );
};

export default Form;