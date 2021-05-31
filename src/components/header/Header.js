import React, {useState} from 'react'
import './_header.scss';
import { FaBars } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdNotifications, MdApps, MdSignin } from 'react-icons/md';
import { IoLogIn } from "react-icons/io5";
import ytLogo from '../../assets/yt-logo.png';
import {Link, useHistory} from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = ({handleToggleSidebar}) => {



    const [input, setInput] = useState("");
    const history = useHistory();



    // const {user:{name,photoURL}, accessToken} = useSelector(state => state.auth);

    const name = useSelector(state => state.auth?.user?.name);
    const photoURL = useSelector(state => state.auth?.user?.photoURL);
    const accessToken = useSelector(state => state.auth?.accessToken);


    const defaultPhotoURL = "https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png";

    

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${input}`);
    }

    return (
        <div className="header">

           <FaBars className="header__menu" size={26} onClick={handleToggleSidebar} />
           <img src={ytLogo} alt="" className="header__logo"/>

           <form onSubmit={handleSubmit}> 
               <input
                 type="text"
                 placeholder="Search"
                 value={input}
                 onChange={e => setInput(e.target.value)} />
               <button type='submit'>
               <AiOutlineSearch size={22} /> 
            </button>
            </form>

            {!accessToken?
             (
                 <Link to="/auth" className="header__loginLink">
                    <div className="header__login"> 
                        <p className="header__login-text">Login</p>
                        <IoLogIn size={23} className="header__login-icon" /> 
                    </div>
                 
                 </Link>
               
            ) : (
                <div className="header__icons">
                <MdNotifications size={28}/>
                <MdApps size={28} />
                <img src={photoURL? photoURL : defaultPhotoURL } alt="userPhoto"/>
                <p className="header__icons-name"> {name?name:null} </p>
            </div>
            )} 
       
        </div>
    )
}

export default Header
