import firebase from 'firebase'
import auth from '../../firebase'
import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from '../actionTypes';

export const login = () => async dispatch => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })
    
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
      const res = await auth.signInWithPopup(provider);

        //# res: {crediential: {accessToken:"", idToken:""}, user: {displayName:"", email:""}, additionalUserInfo:{profile:{email:"", name:"", granded_scopes:"https://"}}}
    
      const accessToken = res.credential.accessToken;

      const profile = {
          name: res.additionalUserInfo.profile.name,
          photoURL: res.additionalUserInfo.profile.picture
 
      }
    //   console.log("res: ",res);
    //   console.log("profile: ", profile);

     sessionStorage.setItem("yt-access-token", JSON.stringify(accessToken));
     sessionStorage.setItem("yt-user-profile", JSON.stringify(profile));

      dispatch({
          type: LOGIN_SUCCESS,
          payload: accessToken
      })

      dispatch({
          type: LOAD_PROFILE,
          payload: profile
      })


    } catch (error) {
        console.log(error.message);
        dispatch({
            type:LOGIN_FAIL,
            payload: error.message
        })
    }
}

export const logOut = () => async dispatch => {
    await auth.signOut();
    dispatch({
        type:LOG_OUT
    })
    sessionStorage.removeItem("yt-access-token")
    sessionStorage.removeItem("yt-user-profile")
}