import axios from 'axios';

const KEY = "AIzaSyD-xcQtc-S8NiFkujliLhAxUGpBR1M4lS8"

// console.log(process.env);
const request = axios.create({

    baseURL:"https://youtube.googleapis.com/youtube/v3",
    params: {
        key : KEY
    }
})

//
//AIzaSyBXmAtgYaJgTwdWTtm2Na0NACf2fH9kAEA
//firbaase above
export default request;