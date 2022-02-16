import { Button, Card, CardActions, CardContent, CardMedia, Typography,Modal,Box } from '@material-ui/core';
import React from 'react';
import useStyle from './style';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../action/posts';
import './Post2.css';
// import AccessTime from '@material-ui/icons/AccessTime';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const Post2 = ({ post, setCurrentId }) => {

    const classes = useStyle();
    const dispatch = useDispatch();

    //modal 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="card">
            <CardMedia className="card-img" image={post.selectedFile} title={post.title} />
            <div className="details">
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>

            </div>
            <div className="overlay">
                <Typography sx={{marginRight: "10px"}} variant="p">Writer: {post.creator}</Typography>
                &nbsp;
                &nbsp;
                &nbsp;
                <AccessTimeIcon  fontSize="small"/>
                <Typography variant="p"> {moment(post.createdAt).fromNow()}</Typography>
            </div>
            {/* <div className={classes.overlay2}>
               
            </div> */}
         
            <Typography className="book-name" variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography color="textSecondary" variant="body2" component="p">Summary: <br /> {post.message.slice(0, 120)}...
                </Typography>
                <button className="btn" onClick={handleOpen}>
                    <Typography className="btn-text">Read more...</Typography>
                </button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                summary of {post.title}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                               {post.message}
                            </Typography>
                        </Box>
                    </Modal>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => { dispatch(likePost(post._id)) }}>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
                <Button
                    style={{ color: 'white' }}
                    size="small"
                    
                    onClick={() => { setCurrentId(post._id) }}>
                    <EditIcon fontSize="small" color="primary"/>
                    <Typography fontSize="small" color="primary">Edit</Typography>
                </Button>

            </CardActions>
        </div>
    );
};

export default Post2;