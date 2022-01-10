import { Typography, AppBar, Toolbar, Avatar, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useStyle from './styles'


export default function Navbar() {

    const classes = useStyle();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () =>{
        dispatch({ type : 'LOGOUT'});

        history.push('/')

        setUser(null)
    }

    useEffect(() => {
        const token = user?.token;

        //JWT
        setUser(JSON.parse(localStorage.getItem('profile')));

        
    },[location])

    return (
        <>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>

                    <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                        Memories
                    </Typography>
                    <img className={classes.image} src="https://raw.githubusercontent.com/adrianhajdin/project_mern_memories/master/client/src/images/memories.png?token=AF56X74XONEUGZ4FD2FUIA27UURPI" alt="memories" height="60" />
                    </div>
                    <Toolbar className={classes.toolbar}>
                        {user ? (
                            <div className={classes.profile}>
                                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                                    {user.result.name.charAt(0)}
                                </Avatar>
                                <Typography className={classes.userName} variant="h6">
                                    {user.result.name}
                                </Typography>
                                <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>Logout</Button>
                            </div>

                        ) : (
                           

                            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                            
                        )
                        }
                    </Toolbar>
                
            </AppBar>
        </>
    )
}
