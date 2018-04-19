import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import SigninForm from './SigninForm'
import './SigninPage.css'
/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

const SignInPage = ({history}) => {
    return (
        <div className="signin_page">
            <img className="logo" src="images/logo.png" width="80%" alt=""/>
            <SigninForm/>
            <RaisedButton 
            	className="signup_btn"
            	label="Sign Up" 
            	primary={true} 
            	fullWidth={true} 
            	onClick={() => history.push("/signup")}
            />
        </div>
    );
};

export default SignInPage;