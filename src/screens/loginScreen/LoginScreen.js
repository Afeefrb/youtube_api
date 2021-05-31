import React, {useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import ytLogo from '../../assets/yt-logo2.png';
import './_loginScreen.scss'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../../redux/actions/auth.action';


const LoginScreen = () => { 
    
 
    const dispatch = useDispatch();
    
    const handleLogin = () => {
        dispatch(login())
    }
    //# {crediential: {accessToken:"", idToken:""}, user: {displayName:"", email:""}, additionalUserInfo:{profile:{email:"", name:"", granded_scopes:"https://"}}}

    const accessToken = useSelector(state => state.auth.accessToken);
    const history = useHistory();

    useEffect(() => {
        if(accessToken)
            history.push("/")
    }, [accessToken, history])




    return (
        <div className="login">
            <div className="login__container">
                <img src={ytLogo} alt=""/>
                <button onClick={handleLogin}>Login with Google</button>
                <p>Powered by Youtube Data V3 API</p>
                <Link to="/">
                    <button> Home Page </button>
                </Link>
                
            </div>
        </div>
    )
}

export default LoginScreen
