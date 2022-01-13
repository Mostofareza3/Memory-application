import { Container, Grid, Grow, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getPosts } from '../../action/posts';
import Form from '../Form/Form';
import Paginate from '../Pagination';
import Posts from '../Posts/Posts';

export default function Home() {
    const [currentId, setCurrentId] = useState(null);
    // const classes = useStyle();
    //className={classes.mailContainer}
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        dispatch(getPosts());

    }, [currentId, dispatch])
    return (
        <>
            <Grow in>
                <Container>
                    <Grid  container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            <Paper elevation={6}>
                                <Paginate/>
                            </Paper>
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
        </>
    )
}
