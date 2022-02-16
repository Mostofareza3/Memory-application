import { Button, Paper,  TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyle from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost,updatePost } from '../../action/posts';


const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyle();
    const dispatch = useDispatch();

    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: '',
    });
    
    //fetching the specific from redux 

    const post = useSelector((state)=> currentId ? state.posts.find((p)=> p._id === currentId) : null);

    useEffect(()=>{
        if(post){
            setPostData(post)
        }
    },[post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId,postData))
        }else{

            // console.log(postData)
            dispatch(createPost(postData));
        }
        clear();

    }
    const clear = () => {
        setCurrentId(null);
        setPostData({
            creator: '', title: '', message: '', tags: '', selectedFile: '',
        })


    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate classes={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography text="center" variant='h6'>{!currentId ? 'Add a new' : 'Edit' } summary </Typography>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Writer Name"
                    fullWidth
                    className={classes.fileInput}
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                />

                <TextField
                    name="title"
                    variant="outlined"
                    label="Book Title"
                    fullWidth
                    className={classes.fileInput}
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Summary"
                    fullWidth
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