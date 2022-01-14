import { Typography, AppBar, Toolbar, Avatar, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useStyle from './styles';
import decode from 'jwt-decode';

//https://i.ibb.co/NyJqJWK/memories-Logo.png -------- logo
//https://i.ibb.co/cvkcJFm/memories-Text.png --------- img

export default function Navbar() {

    const classes = useStyle();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/')

        setUser(null)
    }

    useEffect(() => {
        const token = user?.token;

        // token expire handle
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        //JWT
        setUser(JSON.parse(localStorage.getItem('profile')));


    }, [location])

    return (
        <>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Link to="/" className={classes.brandContainer}>

                    <img className={classes.image} src="https://i.ibb.co/cvkcJFm/memories-Text.png" alt="icon" height="40px" />
                    <img className={classes.image} src="https://i.ibb.co/NyJqJWK/memories-Logo.png" alt="icon" height="45px" />
                </Link>
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
