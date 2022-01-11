import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useStyle from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {signin, signup} from '../../action/auth';


//JWT purpose
const initialState = {firstName: '', lastName: '', email: '', password:'', confirmPassword:''}

const Auth = () => {
    const classes = useStyle();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    // JWT purpose
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    // submit from data where are user can be new or already exist.
    const handleSubmit = (e) => {
        e.preventDefault();

        //signin/ signup comes from '/action/auth'
        // isSign up is controlled by button [signIn/ signup] switch
        if(isSignup){
            dispatch(signup(formData, history))
        }else{
            dispatch(signin(formData, history))

        }

    }
    const handleChange = (e) => {
        //set only thing which one change. 
        setFormData({...formData, [e.target.name] : e.target.value});

        

    }
    // for button and password icon control.
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    //try to sign in using google
    const googleSuccess = async (res) =>{
        const result = res?.profileObj; 
        const token = res?.tokenId;

        try{

            dispatch({ type : 'AUTH', data: {result, token}});
            history.push('/')

        }
        catch(error){
            console.log(error);
        }

    };

    // if google sign in failure
    const googleFailure = () =>{
        console.log("Google sign in fail.Try again.");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>

                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>

                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />

                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange}
                            type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {
                            isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId="645603913114-4jfc90e5sq084bbrif3riv6co465at07.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                variant="contained"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}>
                                    Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? Sign In" : "Dont't have an account? Sign Up"}
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>

        </Container>
    );
};

export default Auth;