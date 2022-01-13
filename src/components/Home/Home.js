import { AppBar, Button, Container, Grid, Grow, Paper, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import { getPosts } from '../../action/posts';
import Form from '../Form/Form';
import Paginate from '../Pagination';
import Posts from '../Posts/Posts';
import useStyle from './styles'

// useQuery used to know which url i am in currently.
function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function Home() {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyle();

    useEffect(() => {
        dispatch(getPosts());

    }, [currentId, dispatch]);

    const handleKeyPress = (e) => {
        //keyCode 13 means enter key
        if (e.keyCode === 13) {
            //search post
            searchPost();
        }
    }
    const searchPost = ()=>{
        if(search.trim()){
            //dispatch --> fetch search post
            console.dir(search.trim());

        }else{
            history.push('/');
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

    return (
        <>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} >
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField
                                    name="search"
                                    variant="outlined"
                                    label="Search Memory"
                                    fullWidth
                                    onKeyPress={handleKeyPress}
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value) }}
                                />
                                <ChipInput
                                    style={{ margin: '10px 0px' }}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label="Search Tags"
                                    variant="outlined"
                                />
                                <Button
                                    className={classes.searchButton}
                                    color="primary"
                                    variant="contained"
                                    onClick={searchPost}
                                >
                                    Search Post
                                </Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            <Paper elevation={6}>
                                <Paginate />
                            </Paper>
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
        </>
    )
}
